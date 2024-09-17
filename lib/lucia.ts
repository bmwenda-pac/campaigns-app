import { Lucia } from "lucia";
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/db/drizzle";
import { session, users } from "@/db/schema";

const adapter = new DrizzleMySQLAdapter(db, session, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "campaigns-auth-cookie",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

// declare module "lucia" {
//   interface Register {
//     Lucia: typeof lucia;
//   }
// }
