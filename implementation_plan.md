# Implementation Plan - V-Wash Laundry Management System

This document outlines the step-by-step implementation plan for building V-Wash, a web-based laundry management system for hostel students. The plan is organized level-by-level (phase-by-phase), detailing backend API structures, database schemas, and frontend view requirements.

---

## User Review Required

1. **Cloudinary Credentials**: We need Cloudinary configuration details (Cloud Name, API Key, API Secret) for image uploads for complaints and Lost & Found.
2. **Database Connection**: We have set up the database configuration using the pooler URL.
3. **Vite Framework Setup**: We will initialize the frontend inside the workspace under a `Frontend` directory.

---

## Open Questions

1. Do we have pre-configured student/staff barcode formats? We will assume standard string formats.
2. How should the OTP notifications be delivered? We will implement a robust In-App Notification system as specified in the PRD, and display the OTP on the UI/API response for testing/viewing.

---

## Proposed Changes

We will divide the development of V-Wash into **10 Levels**.

```
Level 1: Environment & DB Setup
Level 2: Authentication & Authorization
Level 3: User & Schedule Management
Level 4: Laundry Lifecycle & Scanning
Level 5: Complaints & Lost/Found
Level 6: Notifications & Dashboard Reports
Level 7: Frontend Setup & Common Shell
Level 8: Frontend Student Portal
Level 9: Frontend Staff Interface
Level 10: Frontend Admin Dashboard
```

---

### Phase A: Backend Development

#### Level 1: Environment & DB Setup [COMPLETED]
- Drizzle Schemas defined in `Backend/src/db/schema.js`.
- DB Connection initialized via node-postgres in `Backend/src/db/db.js`.
- Migrations compiled and pushed to Supabase.
- DB Seeded with test data.

#### Level 2: Authentication & Authorization [COMPLETED]
- JWT Middlewares defined in `Backend/src/middleware/authMiddleware.js`.
- Auth Controller (Login, Logout, Refresh, Profile) created in `Backend/src/controllers/authController.js`.
- Auth Routes configured in `Backend/src/routes/authRoutes.js`.

#### Level 3: User & Schedule Management
- Admin CRUD endpoints for users/staff.
- Schedule slots and student reservation endpoints.

#### Level 4: Laundry Lifecycle & Scanning
- Barcode scanning & receipt creation endpoints.
- Stepper status checkpoints (Received ➔ Ready to Pick Up ➔ Delivered).
- OTP Generation & Verification.

#### Level 5: Complaints & Lost/Found
- Cloudinary setup & image upload integration.
- Complaint category logging and tracking.
- Lost & Found item uploads and claiming mechanisms.

#### Level 6: Notifications & Dashboard Reports
- In-app notification checks & statuses.
- Analytics counters & report details.

---

### Phase B: Frontend Development

#### Level 7: Frontend Setup & Common Shell
- Vite + React + Tailwind CSS setup.
- Route controls and authentication contexts.

#### Level 8: Frontend Student Portal
- Schedule bookings, Active Tracking, Complaints & Lost/Found interfaces.

#### Level 9: Frontend Staff Interface
- Barcode scanner integration, OTP delivery panel, and item recovery submissions.

#### Level 10: Frontend Admin Dashboard
- Quick metric charts, system config interfaces, and complaint consoles.
