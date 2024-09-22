import fs from "fs";
import path from "path";
import { lucia } from "@/lib/lucia";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { getCookie } from "hono/cookie";
import { csrf } from "hono/csrf";
import { Session, User } from "lucia";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { messages, users } from "@/db/schema";
import { eq } from "drizzle-orm";

const filePath = path.join(process.cwd(), "public", "test", "TEST3.csv");
const fileContent = fs.readFileSync(filePath, "utf-8");

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

    const data = await db
      .select()
      .from(users)
      .rightJoin(messages, eq(users.departmentId, messages.departmentId))
      .where(eq(users.id, user.id));

    return c.json({ message: "Hello world!", user: user, data: data });
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        title: z.string(),
        body: z.string(),
        csv: z.any(),
      })
    ),
    async (c) => {
      const user = c.get("user");

      const json = c.req.valid("json");

      console.log("USER>>>>>>", user);
      console.log({ json });

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db.insert(messages).values({
        title: json.title,
        body: json.body,
        userId: "55a5c4e4-c128-4b99-a3fb-d02efd05c4fe",
        departmentId: "rgvsra49nd4n81gbsuk3wifa",
      });

      return c.json(
        {
          ok: true,
          message: "Sent!",
        },
        201
      );
    }
  );

export default app;

// .post(
//     "/:name",
//     zValidator("json", insertMessageSchema.pick({ title: true, body: true })),
//     async (c) => {
//       const user = c.get("user");
//       const payload = c.req.param("name");

//       if (!user?.id) {
//         return c.json({ error: "Unauthorized" }, 401);
//       }

//       const formData = new FormData();
//       // Point to a Blob located in ../../public/test/test.cv
//       formData.append("uploaded_file", fileContent);

//       //   await fetch(
//       //     "https://prod.api.pacisinsurance.com/3rdparty/sms/personalized?message=Have a great weekend. %23PacisTunakumind",
//       //     {
//       //       method: "POST",
//       //       body: formData,
//       //       redirect: "follow",
//       //     }
//       //   )
//       //     .then((response) => response.text())
//       //     .then((result) => console.log(result));

//       console.log({ user });
//       return c.json({ message: `Hello ${payload}` });
//     }
//   );
