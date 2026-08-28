CREATE TABLE "complaints" (
	"id" serial PRIMARY KEY NOT NULL,
	"laundry_record_id" integer,
	"student_id" integer NOT NULL,
	"category" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text,
	"status" text DEFAULT 'open' NOT NULL,
	"admin_remarks" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"laundry_record_id" integer NOT NULL,
	"student_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"comments" text,
	"cleanliness_rating" integer,
	"timeliness_rating" integer,
	"staff_service_rating" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "laundry_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"barcode" text NOT NULL,
	"cloth_details" jsonb NOT NULL,
	"status" text DEFAULT 'received' NOT NULL,
	"otp_code" text,
	"otp_expires_at" timestamp,
	"submission_time" timestamp DEFAULT now() NOT NULL,
	"delivery_time" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lost_found" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_name" text NOT NULL,
	"category" text NOT NULL,
	"color" text NOT NULL,
	"description" text,
	"image_url" text,
	"found_by" integer NOT NULL,
	"status" text DEFAULT 'available' NOT NULL,
	"claimed_by" integer,
	"claim_remarks" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schedule_bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"schedule_id" integer NOT NULL,
	"student_id" integer NOT NULL,
	"status" text DEFAULT 'booked' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schedules" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" text NOT NULL,
	"time_slot" text NOT NULL,
	"capacity" integer NOT NULL,
	"current_bookings" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" text NOT NULL,
	"student_id" text,
	"hostel_block" text,
	"room_no" text,
	"barcode" text,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_barcode_unique" UNIQUE("barcode")
);
--> statement-breakpoint
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_laundry_record_id_laundry_records_id_fk" FOREIGN KEY ("laundry_record_id") REFERENCES "public"."laundry_records"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_laundry_record_id_laundry_records_id_fk" FOREIGN KEY ("laundry_record_id") REFERENCES "public"."laundry_records"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laundry_records" ADD CONSTRAINT "laundry_records_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lost_found" ADD CONSTRAINT "lost_found_found_by_users_id_fk" FOREIGN KEY ("found_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lost_found" ADD CONSTRAINT "lost_found_claimed_by_users_id_fk" FOREIGN KEY ("claimed_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_bookings" ADD CONSTRAINT "schedule_bookings_schedule_id_schedules_id_fk" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule_bookings" ADD CONSTRAINT "schedule_bookings_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;