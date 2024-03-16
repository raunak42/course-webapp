import { CourseAttributes } from "types";
import { courseInput } from "zod-validation";

export async function validateBody(req: Request): Promise<CourseAttributes> {
    const body = await req.json();
    const course: CourseAttributes = body;
    const validatedCourse = courseInput.parse(course);//This variable shpuld have a type or else the prisma call below won't recognize the data while using a spread operator.

    return validatedCourse;
}