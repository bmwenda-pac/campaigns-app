import { lucia } from "@/lib/lucia";
import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { csrf } from "hono/csrf";
import { Session, User } from "lucia";

const app = new Hono<{
  Variables: {
    user: User | null;
    session: Session | null;
  };
}>()
  .use(csrf())
  .use("*", async (c, next) => {
    const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;
    console.log({ sessionId });
    if (!sessionId) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (!session) {
      c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
        append: true,
      });
    }
    c.set("user", user);
    c.set("session", session);
    return next();
  })
  .get("/", async (c) => {
    const user = c.get("user");

    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    console.log({ user });
    return c.json({ message: "Hello world!" });
  });

export default app;
