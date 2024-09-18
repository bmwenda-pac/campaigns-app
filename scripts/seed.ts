import { createId } from "@paralleldrive/cuid2";
import { db } from "../db/drizzle";
import { departments } from "../db/schema";

const Departments = [
  "Claims",
  "Executive",
  "Finance",
  "HR & Administration",
  "ICT",
  "Internal Audit",
  "Marketing",
  "Medical",
  "Operations",
  "Risk & Compliance",
  "Underwriting",
];

async function seedDbWithDepartments() {
  for (const departmentName of Departments) {
    await db.insert(departments).values({
      departmentId: createId(),
      departmentName,
    });
  }
}

seedDbWithDepartments().finally(() => {
  console.log("Successfully seeded the campaignsDB with Departments");
  process.exit();
});

// async function insertNewUser() {
//   await db.insert(users).values({
//     id: "55a5c4e4-c128-4b99-a3fb-d02efd05c4fd",
//     departmentId: "n5agzgcwoms3yeral39f91hu",
//     displayName: "Test User",
//     surname: "User",
//     jobTitle: "ICT Intern",
//     email: "testuser@paciskenya.com",
//     officeLocation: "Head Office",
//   });

//   await connection.end();
// }

// insertNewUser().finally(() => {
//   console.log("Successfully seeded the campaignsDB with test user");
//   // process.exit();
// });
