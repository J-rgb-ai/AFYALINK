# 🏥 Afyalink Backend API

This is the backend for **Afyalink** — a healthcare system built for secure user management, OTP-based authentication, and facility-linked access control.

---

## 📌 Available Routes

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| POST   | `/users/signup`       | Register a new user            |
| POST   | `/users/signin`       | Login with email & password    |
| GET    | `/users/:id`          | Get user profile (JWT required)|
| POST   | `/users/forgotpass`   | Request OTP for password reset |
| PUT    | `/users/resetpass`    | Reset password with OTP        |
| POST   | `/verify/email`       | Verify email with OTP          |

---

## 📝 User Registration

**Endpoint:** `POST /users/signup`  
**Payload:**

```json
{
  "fname": "cyril",
  "lname": "imbwaga",
  "email": "cyroimbwaga@gmail.com",
  "phone": "+254707471340",
  "password": "password",
  "user_role": "nurse",
  "gender": "Male",
  "dob": "1995-02-13",
  "facility_id": 2
}
Response: Returns a JWT token. Use it in the Authorization header to verify email.

Email Verification
Endpoint: POST /verify/email Header:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoiY3lyb2ltYndhZ2FAZ21haWwuY29tIiwicGhvbmUiOiIrMjU0NzA3NDcxMzQwIiwicm9sZSI6Im51cnNlIiwiaWF0IjoxNzYwNTk5NTc3LCJleHAiOjE3NjA2MDMxNzd9.hf8e7786wJDUDawGT_uxFIOBhD0G7TvhhfFEHHdMl98

just an example

req.body

{
  "otp": "344669"
}


res.body
{
  "success": "Email verified successfully"
}


Endpoint: POST /users/signin Payload:

{
  "email": "cyroimbwaga@gmail.com",
  "password": "password123"
}


response

{
  "message": "Login successful",
  "user": {
    "id": 24,
    "fname": "cyril",
    "lname": "imbwaga",
    "email": "cyroimbwaga@gmail.com",
    "role": "nurse",
    "age": 30,
    "verified": true,
    "facility": "Kilimani Lab Services",
    "facility_type": "lab",
    "joined": "2025-10-16T07:26:17.000Z"
  },
  "token": "Bearer eyJhbGciOiJIUzI1NiIs..."
}


Endpoint: GET /users/:id Header:

e.g for cyril /users/27

and a jwt token from either signin or signup

Endpoint: POST /users/forgotpass Payload:

{
  "email": "cyroimbwaga@gmail.com"
}

only works if emil is verified

res.body
{
  "message": "Otp sent to +254707471340 via WhatsApp and cyroimbwaga@gmail.com",
  "token": "Bearer eyJhbGciOiJIUzI1NiIs..."
}


Endpoint: PUT /users/resetpass Header:

resets password
req.header
Authorization:  <token>

{
  "otp": "344669",
  "newpassword": "password123"
}


//if succesful youll be notifeid via email.


res.body 
{
  "success": "Password changed successfully"
}


admin login under development but sai analogin tu kaa user na kaa ni admin ndo itaonyesha kwa roles...



run npm run dev.. its obvious i know

if its running will display that

 npm run dev

> dev
> nodemon src/server.js

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node src/server.js`
[dotenv@17.2.2] injecting env (22) from .env -- tip: 🔐 encrypt with Dotenvx: https://dotenvx.com
[dotenv@17.2.2] injecting env (0) from .env -- tip: 🔐 prevent committing .env to code: https://dotenvx.com/precommit
[dotenv@17.2.2] injecting env (0) from .env -- tip: ⚙️  load multiple .env files with { path: ['.env.local', '.env'] }
[dotenv@17.2.2] injecting env (0) from .env -- tip: ⚙️  override existing env vars with { override: true }
[dotenv@17.2.2] injecting env (0) from .env -- tip: 📡 observe env with Radar: https://dotenvx.com/radar
[dotenv@17.2.2] injecting env (0) from .env -- tip: 📡 version env with Radar: https://dotenvx.com/radar
[dotenv@17.2.2] injecting env (0) from .env -- tip: ⚙️  write to custom object with { processEnv: myObject }
Connecting to redis server...
Redis connected
Connected to redis........
Connecting to database.....
Models synced
Connected to Database now
Backend Server running on port 3000......
Waiting for your requests now.....





