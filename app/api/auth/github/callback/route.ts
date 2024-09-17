import { db } from "@/db/drizzle";
import { departments, users } from "@/db/schema";
import { githubOAuthClient } from "@/lib/githubOAuth";
import { lucia } from "@/lib/lucia";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, res: Response) {
  const url = req.nextUrl;
  console.log(url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    console.error("No code or state");
    return new Response("Invalid Request", { status: 400 });
  }

  const codeVerifier = cookies().get("codeVerifier")?.value;
  const savedState = cookies().get("state")?.value;

  if (!codeVerifier || !savedState) {
    console.error("State mismatch");
    return new Response("Invalid Request", { status: 400 });
  }

  const { accessToken } = await githubOAuthClient.validateAuthorizationCode(
    code
  );

  const githubResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const githubData = (await githubResponse.json()) as {
    id: string;
    html_url: string;
    login: string;
    avatar_url: string;
  };

  let userId: string = githubData.id;

  let departmentName = "Marketing";

  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, githubData.id),
  });

  console.log("existingUser >>>>", existingUser);

  const department = await db.query.departments.findFirst({
    where: eq(departments.departmentName, departmentName),
  });

  if (existingUser) {
    userId = githubData.id;
    console.log("There is an existingUser >>>>>>>>>>>>");
  } else {
    const user = await db.insert(users).values({
      id: githubData.id,
      displayName: githubData.login,
      email: githubData.html_url,
      surname: "TestUser",
      jobTitle: "TestPosition",
      officeLocation: "HQ",
      profilePicture: githubData.avatar_url,
      departmentId: department?.departmentId,
    });

    console.log(user);
  }

  const session = await lucia.createSession(userId, {});
  const sesssionCookie = await lucia.createSessionCookie(session.id);
  cookies().set(
    sesssionCookie.name,
    sesssionCookie.value,
    sesssionCookie.attributes
  );

  redirect("/");
}

// http://localhost:3000/api/auth/github/callback?code=122cd77da112b4f943ec&state=QQHuUX4B5x74sOPoOuJ_GrdNmT3iw0B-6GINYWbRC10
