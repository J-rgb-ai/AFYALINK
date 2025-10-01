const express = require("express");
const router = express.Router();
const {registerUser,verifyUser,userLogin,loginVerify } = require("../controllers/authController");




/*needed routes

/users
/users/doctors
/users/nurses
/users/login/verify
/users/register/verify
/users/doctor/login
users/nurses/login
/users/doctor/register
/users/patients/login
/users/patients/register
/user/staff
/user/staff/departments
/user/


*/





router.post("users/register", registerUser);

router.post("/users/register/verify",verifyUser );
router.post('/users/login',userLogin);
router.post('users/login/verify',loginVerify);


module.exports = router;
