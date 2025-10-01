const express = require("express");
const router = express.Router();
const { landingPage } = require("../controllers/indexController");
const rolecheck = require('../controllers/rolectrl/rolecheck');


/*needed routes

/users
/users/doctors
/users/nurses
/users/login
/users/register
/users/doctor/login
users/nurses/login
/users/doctor/register
/users/patients/login
/users/patients/register
/user/staff
/user/staff/departments
/user/


*/



router.post()
router.get("/", landingPage);
router.get("/backendhome", (req, res) => {
  res.json({ status: "Backend is running ✅" });
});

module.exports = router;
