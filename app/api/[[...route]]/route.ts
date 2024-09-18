import { Hono } from "hono";
import { handle } from "hono/vercel";
import { Session, User } from "lucia";

import hello from "./hello";
import pushMessage from "./push-message";

const app = new Hono<{
  Variables: {
    user: User | null;
    session: Session | null;
  };
}>().basePath("/api");

const routes = app.route("/hello", hello).route("/push_message", pushMessage);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
