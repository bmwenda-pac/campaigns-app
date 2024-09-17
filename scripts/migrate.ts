import "dotenv/config";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { db, sql as connection } from "@/db/drizzle";

await migrate(db, { migrationsFolder: "./drizzle" });

await connection.end();
