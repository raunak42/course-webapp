// middleware.ts   
//the below code first checks if the user is logged in or not
//then it tries to configure csrf prevention//
//to send requests from postman, set a header called "origin" to the value of "http://localhost:3000"
import { verifyRequestOrigin } from "lucia";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { validateRequest } from "./auth";

const unprotectedRoutes = ["/api/getCourses"] //for ssr //could have gone with the matcher approach for ssr routes but mathcer blocks the entire middleware for the path that is not included, that means session verification would have stopped but on top of that csrf prevention would also have stopped.

export async function middleware(request: NextRequest): Promise<NextResponse> {
	const { session, user } = await validateRequest();
	const unprotectedRoute = unprotectedRoutes.find((t) => t === request.nextUrl.pathname)
	if (!unprotectedRoute && !session) {
		return NextResponse.json({ message: "Sign in first." }, {
			status: 403
		})
	}
	const response = NextResponse.next();
	response.headers.set("session-data", JSON.stringify({ session, user }));
	if (request.method === "GET") {
		return response;
	}
	const originHeader = request.headers.get("Origin");
	const hostHeader = request.headers.get("Host"); // NOTE: You may need to use `X-Forwarded-Host` instead when using reverse proxy setups or load balancers
	if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
		return new NextResponse("failed", {
			status: 403
		});
	}
	return response;

}

export const config = {
	matcher: [
		"/api/:path*",
	]
}
//middleware here, works for every path including frontend paths if not configuerd with a matcher