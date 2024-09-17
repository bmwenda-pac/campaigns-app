import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export default {
  schema: "./db/schema.ts",
  dialect: "mysql",
  dbCredentials: { url: process.env.DATABASE_URL as string },
} satisfies Config;
