import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { Session } from "lucia";
import { ApiResponseAttributes } from "types";

export default async function Page() {
  return (
    <div>
      <h1>Sign in</h1>
      <a href="/login/github">Sign in with GitHub</a>
      <br />u<a href="/login/google">Sign in with Google</a>
      <br />
      <h1>Sign in with username and password</h1>
      <form action={login}>
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
        <button>Continue</button>
      </form>
    </div>
  );
}
async function login(formData: FormData) {
  "use server";
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const variable = await fetch("http://localhost:3001/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  const response: ApiResponseAttributes = await variable.json();

  const { data, message, error } = response;

  if (!data || !data.admin) {
    return;
  }
  const admin = data.admin;
  const adminId = admin.id as string;
  const session = await lucia.createSession(adminId, {});
  startSession(session);

  if (error) {
    ("use server");
    console.error(error);
  }
  if (message) {
    //
  }

  // return redirect("/");
  // return data;
}

const startSession = (session: Session) => {
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};

interface ActionResult {
  error: string;
}
