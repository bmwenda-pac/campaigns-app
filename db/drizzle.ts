import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@/db/schema";

export const sql = await mysql.createConnection(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema: { ...schema }, mode: "default" });
