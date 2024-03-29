import { lucia, validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { SIGNUP_SUCCESS_MESSAGE } from "@/lib/constants";
import { cookies } from "next/headers";
import { generateId, Session } from "lucia";

export default async function Page() {
  const sessionDetails = await validateRequest();
  const existingSession = sessionDetails.session;
  if (existingSession) {
    return redirect("/");
  }

  return (
    <>
      <h1>Create an account</h1>
      <form action={signupAndStartSession}>
        <label htmlFor="username">Username</label>
        <input name="username" id="username" style={{ color: "black" }} />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          style={{ color: "black" }}
        />
        <br />
        <button type="submit">Continue</button>
      </form>
    </>
  );
}

async function signupAndStartSession(
  formData: FormData
): Promise<string | string[] > {
  "use server";
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const adminId = generateId(15);

  const response = await fetch("http://localhost:3001/api/signup", {
    method: "POST",
    body: JSON.stringify({ username, password, adminId }),
  });

  const data: string | string[]  = await response.json();

  if (data === SIGNUP_SUCCESS_MESSAGE) {
    const session = await lucia.createSession(adminId, {}); //createSession will succeed only if there is an admin already created in the db, this function creates sesssion and references userId field of the existing admin.
    startSession(session);
    return redirect("/");
  }
  return data;
}

const startSession = (session: Session) => {
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};
