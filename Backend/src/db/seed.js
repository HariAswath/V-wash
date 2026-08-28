import { db } from "./db.js";
import { users } from "./schema.js";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding started...");

  try {
    const adminPasswordHash = await bcrypt.hash("admin123", 10);
    const staffPasswordHash = await bcrypt.hash("staff123", 10);
    const studentPasswordHash = await bcrypt.hash("student123", 10);

    // Insert Admin
    await db.insert(users).values({
      name: "Admin User",
      email: "admin@vwash.com",
      passwordHash: adminPasswordHash,
      role: "admin",
    }).onConflictDoNothing();

    // Insert Staff
    await db.insert(users).values({
      name: "Staff User",
      email: "staff@vwash.com",
      passwordHash: staffPasswordHash,
      role: "staff",
      barcode: "STAFF001",
    }).onConflictDoNothing();

    // Insert Student
    await db.insert(users).values({
      name: "Student User",
      email: "student@vwash.com",
      passwordHash: studentPasswordHash,
      role: "student",
      studentId: "STU001",
      hostelBlock: "A",
      roomNo: "101",
      barcode: "STU001",
    }).onConflictDoNothing();

    console.log("Seeding successfully completed!");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}

seed();
