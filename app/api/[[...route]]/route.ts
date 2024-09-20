import { Hono } from "hono";
import { handle } from "hono/vercel";
import { Session, User } from "lucia";

import hello from "./hello";
import message from "./message";

const app = new Hono<{
  Variables: {
    user: User | null;
    session: Session | null;
  };
}>().basePath("/api");

const routes = app.route("/hello", hello).route("/message", message);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
