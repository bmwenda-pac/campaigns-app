import { cache } from "react";
import { Lucia, TimeSpan } from "lucia";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/db/drizzle";
import { departments, session, users } from "@/db/schema";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

const adapter = new DrizzleMySQLAdapter(db, session, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "campaigns-auth-cookie",
    expires: true,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  sessionExpiresIn: new TimeSpan(5, "m"),
});

export const getUser = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;

  if (!sessionId) return null;

  const { session, user } = await lucia.validateSession(sessionId);

  try {
    if (session && session.fresh) {
      // refreshing user session cookie
      const sessionCookie = await lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      console.log("FETCHING USER");
    }
    if (!session) {
      const sessionCookie = await lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch (error) {
    console.error({ LUCIA_ERROR: error });
  }

  if (!user) return null;

  const dbUser = await db
    .select({
      userId: users.id,
      displayName: users.displayName,
      email: users.email,
      surname: users.surname,
      jobTitle: users.jobTitle,
      officeLocation: users.officeLocation,
      departmentId: departments.departmentId,
      departmentName: departments.departmentName,
    })
    .from(users)
    .leftJoin(departments, eq(users.departmentId, departments.departmentId))
    .where(eq(users.id, user.id));

  return dbUser[0];
});
