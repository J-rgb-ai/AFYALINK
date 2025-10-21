const express = require('express');
const router = express.Router();
const labtechController = require('../controllers/labtechController');
const rolecheck = require('../controllers/rolectrl/rolecheck');

// Apply labtech role check to all routes
router.use(rolecheck.rolecheck('labtech'));

// Dashboard statistics
router.get('/dashboard/stats', labtechController.getDashboardStats);

// Lab results management
router.get('/results', labtechController.getLabResults);
router.put('/results/:id/status', labtechController.updateLabResultStatus);

// Doctor requests
router.get('/requests', labtechController.getDoctorRequests);

// Inventory status
router.get('/inventory', labtechController.getInventoryStatus);

// Recent activities
router.get('/activities', labtechController.getRecentActivities);

// Chart data
router.get('/visits/weekly', labtechController.getWeeklyVisits);

module.exports = router;
