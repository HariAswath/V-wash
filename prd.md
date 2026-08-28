# Product Requirements Document (PRD)

## V-Wash

### 1. Product Overview

**Product Name:** V-Wash  
**Version:** 1.0.0  
**Product Type:** Web-based Laundry Management System for Hostel Students

V-Wash is a web-based application designed to digitize and automate hostel laundry operations. The system manages the complete laundry lifecycle, from assigning laundry schedules and recording laundry submission using QR/barcode scanning to status tracking, OTP-based pickup, complaint management, Lost & Found management, student feedback, notifications, and administrative reporting.

The system provides separate role-based access for Students, Laundry Staff, and Administrators.

### 2. Target Users

- **Students:** View laundry schedules, submit and track laundry, collect laundry using OTP, raise complaints, use Lost & Found, and provide feedback.
- **Laundry Staff:** Scan student barcodes, record laundry, update laundry status, verify pickup OTPs, deliver laundry, and upload found items.
- **Administrators:** Manage users and staff, assign laundry schedules, monitor laundry operations, handle complaints and Lost & Found claims, and view reports and analytics.

### 3. Core Features

#### 3.1 User Authentication & Authorization

- **User Registration:** Create student and staff accounts through authorized administration.
- **User Login:** Secure authentication using JWT.
- **Password Security:** Passwords stored using secure hashing.
- **Role-Based Access Control:** Separate permissions for Student, Staff, and Admin.
- **Token Management:** Access and refresh token mechanism.
- **Account Management:** Activate, deactivate, and update user accounts.

#### 3.2 User & Staff Management

- **Student Management:** Create, view, update, and manage student accounts.
- **Staff Management:** Create, view, update, and manage laundry staff accounts.
- **Role Management:** Assign appropriate system roles.
- **Student Information:** Maintain student ID, hostel block, room number, and barcode information.
- **Staff Information:** Maintain staff ID and operational information.

#### 3.3 Laundry Scheduling

- **Schedule Creation:** Admin can create laundry dates and time slots.
- **Student Assignment:** Assign students to available laundry slots.
- **Schedule Viewing:** Students can view their assigned laundry schedule.
- **Schedule Management:** Admin can modify or reschedule laundry slots.
- **Capacity Management:** Manage the number of students assigned to a slot.

#### 3.4 QR/Barcode-Based Laundry Submission

- **Student Identification:** Each student is associated with a unique QR code/barcode.
- **Barcode Scanning:** Staff scan the student's barcode during laundry submission.
- **Student Verification:** System retrieves and verifies student details and assigned schedule.
- **Laundry Record Creation:** A unique laundry record is created for every submission.
- **Cloth Details:** Staff can record cloth type, quantity, and weight.
- **Submission Timestamp:** System records the exact submission date and time.

#### 3.5 Laundry Status Tracking

- **Status Management:** Track laundry using three simple checkpoints.
- **Status Flow:** Received → Ready to Pick Up → Delivered.
- **Received:** Laundry has been handed over to the laundry staff and recorded in the system.
- **Ready to Pick Up:** Laundry processing is complete and the clothes are ready for collection.
- **Delivered:** Laundry has been handed back to the student after successful pickup verification.
- **Real-Time Tracking:** Students can view the current laundry status.
- **Laundry History:** Maintain historical records of completed laundry.
- **Staff Updates:** Authorized staff can update the laundry status.

#### 3.6 OTP-Based Laundry Delivery

- **OTP Generation:** Generate a unique temporary OTP when laundry is ready.
- **OTP Notification:** Send the OTP to the student through the notification system.
- **OTP Verification:** Staff enter the OTP provided by the student.
- **OTP Expiration:** OTP becomes invalid after its expiry period.
- **Single-Use OTP:** Successfully verified OTP cannot be reused.
- **Delivery Confirmation:** Successful OTP verification allows laundry to be marked as delivered.

#### 3.7 Complaint Management

- **Complaint Submission:** Students can raise complaints related to their laundry.
- **Complaint Categories:** Missing clothes, damaged clothes, wrong delivery, delay, and other issues.
- **Image Upload:** Students can attach supporting images.
- **Complaint Tracking:** Students can monitor complaint status.
- **Admin Review:** Admin can investigate complaints using laundry records.
- **Complaint Resolution:** Admin can resolve or reject complaints.
- **Status Tracking:** Open → Under Review → Resolved/Rejected → Closed.

#### 3.8 Lost & Found Management

- **Found Item Upload:** Laundry staff can upload unidentified clothing.
- **Item Details:** Store image, category, color, description, and found date.
- **Lost & Found Portal:** Students can browse available items.
- **Claim Submission:** Students can submit claims for items they believe belong to them.
- **Claim Verification:** Admin reviews and verifies claims.
- **Item Status:** Available → Claimed → Returned.
- **Notifications:** Students are notified about claim decisions.

#### 3.9 Student Feedback

- **Feedback Submission:** Students can submit feedback after receiving laundry.
- **Rating:** Support 1–5 star ratings.
- **Comments:** Students can provide optional comments.
- **Service Evaluation:** Feedback can cover cleanliness, timeliness, and staff service.
- **Feedback Analytics:** Admin can view aggregated ratings and comments.

#### 3.10 Notifications

- **Laundry Notifications:** Notify students about schedule and laundry status changes.
- **OTP Notifications:** Notify students when pickup OTP is generated.
- **Complaint Notifications:** Notify students when complaint status changes.
- **Lost & Found Notifications:** Notify students about claim decisions.
- **In-App Notifications:** Maintain notification records and read/unread status.

#### 3.11 Laundry History

- **History Listing:** Students can view previous laundry records.
- **Record Details:** View submission date, status history, delivery date, and related information.
- **Complaint Association:** Relevant complaints can be linked to laundry records.

#### 3.12 Admin Dashboard & Reports

- **Dashboard:** Display key laundry operation statistics.
- **Laundry Reports:** Daily, weekly, and monthly laundry statistics.
- **Complaint Reports:** Open, resolved, rejected, and categorized complaints.
- **Feedback Reports:** Average ratings and feedback trends.
- **Operational Analytics:** Monitor pending, completed, and delayed laundry.
- **Report Generation:** Generate reports for administrative use.

### 4. Technical Specifications

#### 4.1 API Endpoints Structure

**Authentication Routes** (`/api/v1/auth/`)

- `POST /login` - User authentication
- `POST /logout` - User logout
- `POST /refresh` - Refresh access token
- `GET /me` - Get current user information

**User Routes** (`/api/v1/users/`)

- `POST /` - Create user (Admin only)
- `GET /` - List users (Admin only)
- `GET /:id` - Get user details
- `PATCH /:id` - Update user
- `DELETE /:id` - Delete/deactivate user

**Schedule Routes** (`/api/v1/schedules/`)

- `POST /` - Create laundry schedule (Admin only)
- `GET /` - List schedules
- `GET /my` - View current student's schedules
- `PATCH /:id` - Update schedule
- `DELETE /:id` - Delete schedule

**Laundry Routes** (`/api/v1/laundry/`)

- `POST /submit` - Submit laundry using student identification
- `GET /my` - List current student's laundry records
- `GET /:id` - Get laundry record details
- `PATCH /:id/status` - Update laundry status (Staff/Admin)
- `POST /:id/generate-otp` - Generate pickup OTP
- `POST /:id/verify-otp` - Verify pickup OTP and confirm delivery

**Complaint Routes** (`/api/v1/complaints/`)

- `POST /` - Submit complaint
- `GET /` - List complaints
- `GET /:id` - Get complaint details
- `PATCH /:id/status` - Update complaint status (Admin)

**Lost & Found Routes** (`/api/v1/lost-found/`)

- `POST /` - Upload found item (Staff/Admin)
- `GET /` - List available found items
- `POST /:id/claim` - Submit claim
- `PATCH /:id/verify` - Approve/reject claim (Admin)

**Feedback Routes** (`/api/v1/feedback/`)

- `POST /` - Submit feedback
- `GET /` - View feedback (Admin)

**Notification Routes** (`/api/v1/notifications/`)

- `GET /` - List notifications
- `PATCH /:id/read` - Mark notification as read

**Report Routes** (`/api/v1/reports/`)

- `GET /dashboard` - Dashboard statistics
- `GET /laundry` - Laundry reports
- `GET /complaints` - Complaint reports
- `GET /feedback` - Feedback analytics

**Health Check** (`/api/v1/healthcheck/`)

- `GET /` - System health status

#### 4.2 Permission Matrix

| Feature | Student | Laundry Staff | Admin |
| --- | --- | --- | --- |
| Login | ✓ | ✓ | ✓ |
| View Own Laundry | ✓ | ✗ | ✓ |
| Submit/Scan Laundry | ✗ | ✓ | ✓ |
| Update Laundry Status | ✗ | ✓ | ✓ |
| Generate/Verify OTP | ✗ | ✓ | ✓ |
| Create Users | ✗ | ✗ | ✓ |
| Manage Users/Staff | ✗ | ✗ | ✓ |
| Manage Laundry Schedules | ✗ | ✗ | ✓ |
| Raise Complaint | ✓ | ✗ | ✓ |
| Review/Resolve Complaint | ✗ | ✗ | ✓ |
| Upload Found Item | ✗ | ✓ | ✓ |
| Claim Lost Item | ✓ | ✗ | ✓ |
| Verify Lost & Found Claim | ✗ | ✗ | ✓ |
| Submit Feedback | ✓ | ✗ | ✗ |
| View Feedback Analytics | ✗ | ✗ | ✓ |
| View Reports | ✗ | Limited | ✓ |

#### 4.3 Data Models

**User Roles:**

- `student` - Access to personal laundry services and student features
- `staff` - Access to laundry processing and delivery operations
- `admin` - Full system management access

**Laundry Status:**

- `received` - Laundry has been received by the laundry staff
- `ready_for_pickup` - Laundry is ready to be collected by the student
- `delivered` - Laundry has been successfully handed over to the student

**Complaint Status:**

- `open` - Newly submitted complaint
- `under_review` - Complaint being investigated
- `resolved` - Complaint successfully resolved
- `rejected` - Complaint rejected
- `closed` - Complaint process completed

**Lost & Found Status:**

- `available` - Item is available for claim
- `claimed` - Claim has been approved
- `returned` - Item has been returned to the owner

### 5. Security Features

- JWT-based authentication with access and refresh tokens
- Role-based authorization middleware
- Secure password hashing using bcrypt
- Input validation for API requests
- OTP expiration and single-use verification
- Protected admin and staff operations
- Environment variables for sensitive configuration
- CORS configuration
- Secure image/file upload handling
- Database-level constraints and relationships
- Transactional handling for critical laundry delivery operations

### 6. File & Image Management

- Support for complaint image uploads
- Support for Lost & Found item images
- Images stored using a dedicated cloud storage service such as Cloudinary
- Database stores image URL and required metadata
- File type and size validation
- Secure upload handling

### 7. Non-Functional Requirements

#### Performance

- API endpoints should respond efficiently under normal hostel usage.
- Frequently queried fields should be indexed.
- Database queries should be optimized.

#### Reliability

- Laundry records must not be lost during processing.
- OTP verification and delivery updates should be handled atomically.
- Database backups should be maintained.

#### Scalability

The architecture should support future expansion to additional hostels, students, staff, and laundry centers.

#### Usability

- Student portal should provide simple laundry tracking.
- Staff interface should minimize the time required to scan and update laundry.
- Admin portal should provide clear operational statistics.

### 8. Technology Stack

- **Runtime:** Node.js
- **Backend Framework:** Express.js
- **Database:** PostgreSQL
- **Database Provider:** Supabase
- **ORM:** Drizzle
- **Authentication:** JWT
- **Password Hashing:** bcrypt
- **Validation:** Zod
- **Image Storage:** Cloudinary
- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **API Testing:** Postman
- **Version Control:** Git + GitHub

### 9. Success Criteria

- Secure authentication and role-based authorization are implemented.
- Administrators can create and manage students and laundry staff.
- Students can receive and view assigned laundry schedules.
- Staff can identify students using QR/barcode scanning.
- Laundry records can be created and tracked through all processing stages.
- Students can view real-time laundry status and history.
- Laundry pickup is secured through OTP verification.
- Students can submit and track complaints.
- Staff can upload Lost & Found items and students can submit claims.
- Admins can verify Lost & Found claims.
- Students can submit feedback and ratings.
- Notifications are generated for important laundry events.
- Admins can view reports and analytics.
- The system maintains consistent and reliable records using PostgreSQL.
