// import { relations } from "drizzle-orm";
// import {
//   mysqlEnum,
//   mysqlTable,
//   text,
//   timestamp,
//   varchar,
// } from "drizzle-orm/mysql-core";
// import { createInsertSchema } from "drizzle-zod";

// export const Role = mysqlEnum("Role", ["admin", "manager", "member"]);

// export const Status = mysqlEnum("Status", ["pending", "sent", "archived"]);

// export const departments = mysqlTable("departments", {
//   departmentId: varchar("department_id", { length: 255 }).primaryKey(),
//   departmentName: varchar("department_name", { length: 255 }).notNull(),
// });

// export const departmentsRelations = relations(departments, ({ many }) => ({
//   users: many(users),
//   drafts: many(drafts),
//   messages: many(messages),
// }));

// export const users = mysqlTable("users", {
//   id: varchar("id", { length: 255 }).primaryKey(),
//   departmentId: varchar("department_id", { length: 255 }).references(
//     () => departments.departmentId,
//     { onDelete: "cascade" }
//   ),
//   displayName: varchar("display_name", { length: 50 }).notNull(),
//   email: varchar("email", { length: 100 }).notNull().unique(),
//   surname: varchar("surname", { length: 50 }).notNull(),
//   jobTitle: varchar("job_title", { length: 50 }).notNull(),
//   officeLocation: varchar("office_location", { length: 50 }),
//   profilePicture: varchar("profile_picture", { length: 255 }).default(""),
//   role: Role,
// });

// export const insertUserSchema = createInsertSchema(users);

// export const userRelations = relations(users, ({ one, many }) => ({
//   department: one(departments, {
//     fields: [users.departmentId],
//     references: [departments.departmentId],
//   }),
//   drafts: many(drafts),
//   messages: many(messages),
// }));

// export const session = mysqlTable("session", {
//   id: varchar("id", { length: 255 }).primaryKey(),
//   userId: varchar("user_id", { length: 255 })
//     .notNull()
//     .references(() => users.id),
//   expiresAt: timestamp("expires_at").notNull(),
// });

// export const insertSessionSchema = createInsertSchema(session);

// export const sessionRelations = relations(session, ({ one }) => ({
//   user: one(users, { fields: [session.userId], references: [users.id] }),
// }));

// export const drafts = mysqlTable("drafts", {
//   id: varchar("id", { length: 255 }).primaryKey(),
//   title: varchar("title", { length: 255 }).notNull(),
//   body: text("body").notNull(),
//   userId: varchar("user_id", { length: 100 })
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   departmentId: varchar("department_id", { length: 255 }).references(
//     () => departments.departmentId,
//     { onDelete: "cascade" }
//   ),
//   status: Status,
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
// });

// export const insertDraftSchema = createInsertSchema(drafts);

// export const draftsRelations = relations(drafts, ({ one }) => ({
//   user: one(users, { fields: [drafts.userId], references: [users.id] }),
//   department: one(departments, {
//     fields: [drafts.departmentId],
//     references: [departments.departmentId],
//   }),
// }));

// export const messages = mysqlTable("messages", {
//   id: varchar("id", { length: 255 }).primaryKey(),
//   title: varchar("title", { length: 255 }).notNull(),
//   body: text("body").notNull(),
//   userId: varchar("user_id", { length: 100 })
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   departmentId: varchar("department_id", { length: 255 }).references(
//     () => departments.departmentId,
//     { onDelete: "cascade" }
//   ),
//   status: Status,
//   sentAt: timestamp("sent_at").defaultNow().notNull(),
// });

// export const insertMessageSchema = createInsertSchema(messages);

// export const messageRelations = relations(messages, ({ one }) => ({
//   user: one(users, { fields: [messages.userId], references: [users.id] }),
//   department: one(departments, {
//     fields: [messages.departmentId],
//     references: [departments.departmentId],
//   }),
// }));

import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";

export const Role = mysqlEnum("Role", ["admin", "manager", "member"]);

export const Status = mysqlEnum("Status", ["pending", "sent", "archived"]);

export const departments = mysqlTable("departments", {
  departmentId: varchar("department_id", { length: 255 }).primaryKey(),
  departmentName: varchar("department_name", { length: 255 }).notNull(),
});

export const departmentsRelations = relations(departments, ({ many }) => ({
  users: many(users),
  drafts: many(drafts),
  messages: many(messages),
}));

export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  departmentId: varchar("department_id", { length: 255 }).references(
    () => departments.departmentId,
    { onDelete: "cascade" }
  ),
  displayName: varchar("display_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  surname: varchar("surname", { length: 50 }).notNull(),
  jobTitle: varchar("job_title", { length: 50 }).notNull(),
  officeLocation: varchar("office_location", { length: 50 }),
  profilePicture: varchar("profile_picture", { length: 255 }).default(""),
  role: Role,
});

export const insertUserSchema = createInsertSchema(users);

export const userRelations = relations(users, ({ one, many }) => ({
  department: one(departments, {
    fields: [users.departmentId],
    references: [departments.departmentId],
  }),
  drafts: many(drafts),
  messages: many(messages),
}));

export const session = mysqlTable("session", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at").notNull(),
});

export const insertSessionSchema = createInsertSchema(session);

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(users, { fields: [session.userId], references: [users.id] }),
}));

export const drafts = mysqlTable("drafts", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(createId),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  userId: varchar("user_id", { length: 100 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  departmentId: varchar("department_id", { length: 255 }).references(
    () => departments.departmentId,
    { onDelete: "cascade" }
  ),
  status: Status,
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const insertDraftSchema = createInsertSchema(drafts);

export const draftsRelations = relations(drafts, ({ one }) => ({
  user: one(users, { fields: [drafts.userId], references: [users.id] }),
  department: one(departments, {
    fields: [drafts.departmentId],
    references: [departments.departmentId],
  }),
}));

export const messages = mysqlTable("messages", {
  id: varchar("id", { length: 255 }).primaryKey().$defaultFn(createId),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  userId: varchar("user_id", { length: 100 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  departmentId: varchar("department_id", { length: 255 }).references(
    () => departments.departmentId,
    { onDelete: "cascade" }
  ),
  status: Status,
  sentAt: timestamp("sent_at").defaultNow().notNull(),
});

export const insertMessageSchema = createInsertSchema(messages);

export const messageRelations = relations(messages, ({ one }) => ({
  user: one(users, { fields: [messages.userId], references: [users.id] }),
  department: one(departments, {
    fields: [messages.departmentId],
    references: [departments.departmentId],
  }),
}));
