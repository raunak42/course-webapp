import { COURSE_CREATE_SUCCESS_MESSAGE, SESSION_HEADER_MISSING_MESSAGE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { apiResponse, getSessionDataFromMiddleware, handleApiError, validateCourseBody } from "helpers";
import { PrismaCourseInput } from "types";


export async function POST(req: Request): Promise<Response> {
    try {
        const body: PrismaCourseInput = await req.json()
        const sessionData = getSessionDataFromMiddleware(req);
        if (!sessionData) {
            return apiResponse({ message: SESSION_HEADER_MISSING_MESSAGE }, 500);//500 internal server error because middleware not working
        }
        const adminId = sessionData.session.userId
        const validatedCourse = await validateCourseBody(body);
        await createCourseInDb({ validatedCourse, adminId })

        return apiResponse({ message: COURSE_CREATE_SUCCESS_MESSAGE }, 200)
    } catch (error) {
        return handleApiError(error)
    }
}

const createCourseInDb = async (
    { validatedCourse, adminId }: { validatedCourse: PrismaCourseInput, adminId: string }
):
    Promise<PrismaCourseInput> => {
    const newCourse = await prisma.course.create({
        data: {
            ...validatedCourse,
            admin: {
                connect: {
                    id: adminId
                }
            },
        },
    });
    return newCourse;
};