import { pgTable, serial, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull(), // 'student', 'staff', 'admin'
  studentId: text("student_id"), // Student details
  hostelBlock: text("hostel_block"),
  roomNo: text("room_no"),
  barcode: text("barcode").unique(), // Unique identifier for student barcode/QR
  status: text("status").default("active").notNull(), // 'active', 'inactive'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Schedules Table
export const schedules = pgTable("schedules", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(), // Format: YYYY-MM-DD
  timeSlot: text("time_slot").notNull(), // e.g. "09:00 - 11:00"
  capacity: integer("capacity").notNull(),
  currentBookings: integer("current_bookings").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Schedule Bookings Table
export const scheduleBookings = pgTable("schedule_bookings", {
  id: serial("id").primaryKey(),
  scheduleId: integer("schedule_id").references(() => schedules.id, { onDelete: "cascade" }).notNull(),
  studentId: integer("student_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  status: text("status").default("booked").notNull(), // 'booked', 'cancelled'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Laundry Records Table
export const laundryRecords = pgTable("laundry_records", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  barcode: text("barcode").notNull(),
  clothDetails: jsonb("cloth_details").notNull(), // JSON structure: { type, quantity, weight, notes }
  status: text("status").default("received").notNull(), // 'received', 'ready_for_pickup', 'delivered'
  otpCode: text("otp_code"),
  otpExpiresAt: timestamp("otp_expires_at"),
  submissionTime: timestamp("submission_time").defaultNow().notNull(),
  deliveryTime: timestamp("delivery_time"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Complaints Table
export const complaints = pgTable("complaints", {
  id: serial("id").primaryKey(),
  laundryRecordId: integer("laundry_record_id").references(() => laundryRecords.id, { onDelete: "set null" }),
  studentId: integer("student_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  category: text("category").notNull(), // 'missing_clothes', 'damaged_clothes', 'wrong_delivery', 'delay', 'other'
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  status: text("status").default("open").notNull(), // 'open', 'under_review', 'resolved', 'rejected', 'closed'
  adminRemarks: text("admin_remarks"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Lost & Found Table
export const lostFound = pgTable("lost_found", {
  id: serial("id").primaryKey(),
  itemName: text("item_name").notNull(),
  category: text("category").notNull(),
  color: text("color").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  foundBy: integer("found_by").references(() => users.id, { onDelete: "cascade" }).notNull(), // Staff or Admin ID
  status: text("status").default("available").notNull(), // 'available', 'claimed', 'returned'
  claimedBy: integer("claimed_by").references(() => users.id, { onDelete: "set null" }), // Student ID
  claimRemarks: text("claim_remarks"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Feedback Table
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  laundryRecordId: integer("laundry_record_id").references(() => laundryRecords.id, { onDelete: "cascade" }).notNull(),
  studentId: integer("student_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  rating: integer("rating").notNull(), // Overall rating (1-5)
  comments: text("comments"),
  cleanlinessRating: integer("cleanliness_rating"),
  timelinessRating: integer("timeliness_rating"),
  staffServiceRating: integer("staff_service_rating"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Notifications Table
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  type: text("type").notNull(), // 'laundry', 'otp', 'complaint', 'lost_found'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
