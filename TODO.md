# TODO: Implement Messaging Channels and Link to Chat Page

## 1. Update chat.jsx for Role-Based Permissions
- Modify `getAllowedUsers()` to support new chat permissions:
  - Doctor: Patient, Referral manager, Nurse, Labtech
  - Patient: Doctor, Referral manager, Nurse
  - Referral manager: Doctor, Patient
  - Nurse: Doctor, Patient
  - Labtech: Doctor
- Ensure chat logic handles these roles correctly.

## 2. Add Messages Nav Button to Dashboards
- Admin.jsx: Add "Messages" nav button linking to '/chat' ✓
- Secretary.jsx: Add "Messages" nav button linking to '/chat' ✓
- Surgeon.jsx: Add "Messages" nav button linking to '/chat' ✓
- AccountClerk.jsx: Add "Messages" nav button linking to '/chat' ✓

## 3. Update ReferralManager.jsx Messages Section
- Replace static messages with a link to '/chat' or integrate chat functionality. ✓

## 4. Test Chat Functionality
- Verify chat works for allowed role pairs.
- Check navigation from dashboards to chat page.
