const labdb = require('../config/db/labtech');
const rolecheck = require('./rolectrl/rolecheck');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Get active patients count
    const [activePatients] = await labdb.query(`
      SELECT COUNT(DISTINCT lr.patient_id) as count
      FROM labresults lr
      WHERE lr.status IN ('Pending', 'Completed')
    `);

    // Get active injections (assuming this means active lab tests)
    const [activeTests] = await labdb.query(`
      SELECT COUNT(*) as count
      FROM labresults
      WHERE status = 'Pending'
    `);

    // Get ongoing surgeries (referrals with urgent priority)
    const [ongoingSurgeries] = await labdb.query(`
      SELECT COUNT(*) as count
      FROM referrals
      WHERE status IN ('sent', 'received', 'accepted') AND priority = 'Emergency'
    `);

    // Get department visits (patient visits)
    const [departmentVisits] = await labdb.query(`
      SELECT COUNT(*) as count
      FROM visits
      WHERE DATE(visited_at) = CURDATE()
    `);

    // Get gender distribution
    const [genderData] = await labdb.query(`
      SELECT
        CASE
          WHEN u.gender = 'Male' THEN 'Male'
          WHEN u.gender = 'Female' THEN 'Female'
          ELSE 'Other'
        END as gender,
        COUNT(*) as value
      FROM users u
      JOIN patients p ON u.id = p.user_id
      GROUP BY u.gender
    `);

    // Get test status summary
    const [testStatus] = await labdb.query(`
      SELECT status, COUNT(*) as value
      FROM labresults
      GROUP BY status
    `);

    res.json({
      activePatients: activePatients[0].count,
      activeTests: activeTests[0].count,
      ongoingSurgeries: ongoingSurgeries[0].count,
      departmentVisits: departmentVisits[0].count,
      genderData,
      testStatus
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
};

// Get lab results
exports.getLabResults = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT
        lr.id,
        lr.patient_id,
        lr.test_type,
        lr.results_summary,
        lr.status,
        lr.created_at,
        lr.completed_at,
        lr.verified_at,
        u.fname,
        u.lname,
        p.national_id
      FROM labresults lr
      JOIN patients p ON lr.patient_id = p.id
      JOIN users u ON p.user_id = u.id
    `;

    const params = [];
    if (status) {
      query += ' WHERE lr.status = ?';
      params.push(status);
    }

    query += ' ORDER BY lr.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const [results] = await labdb.query(query, params);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM labresults';
    if (status) {
      countQuery += ' WHERE status = ?';
    }
    const [countResult] = await labdb.query(countQuery, status ? [status] : []);
    const total = countResult[0].total;

    res.json({
      results,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching lab results:', error);
    res.status(500).json({ error: 'Failed to fetch lab results' });
  }
};

// Update lab result status
exports.updateLabResultStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, results_summary, result_file_url } = req.body;

    const updateData = { status };
    if (results_summary) updateData.results_summary = results_summary;
    if (result_file_url) updateData.result_file_url = result_file_url;

    await labdb.query('UPDATE labresults SET ? WHERE id = ?', [updateData, id]);

    res.json({ message: 'Lab result updated successfully' });
  } catch (error) {
    console.error('Error updating lab result:', error);
    res.status(500).json({ error: 'Failed to update lab result' });
  }
};

// Get doctor requests (pending referrals that need lab work)
exports.getDoctorRequests = async (req, res) => {
  try {
    const [requests] = await labdb.query(`
      SELECT
        r.id,
        r.patient_id,
        r.reason,
        r.priority,
        r.created_at,
        u.fname as doctor_fname,
        u.lname as doctor_lname,
        p.fname as patient_fname,
        p.lname as patient_lname
      FROM referrals r
      JOIN users u ON r.reffering_user_id = u.id
      JOIN patients pt ON r.patient_id = pt.id
      JOIN users p ON pt.user_id = p.id
      WHERE r.status IN ('sent', 'received', 'accepted')
      AND r.reason LIKE '%lab%' OR r.reason LIKE '%test%'
      ORDER BY r.priority DESC, r.created_at DESC
      LIMIT 10
    `);

    res.json(requests);
  } catch (error) {
    console.error('Error fetching doctor requests:', error);
    res.status(500).json({ error: 'Failed to fetch doctor requests' });
  }
};

// Get inventory status (simplified - assuming we create a basic inventory table or use existing data)
exports.getInventoryStatus = async (req, res) => {
  try {
    // For now, return mock data since inventory table might not exist
    // In a real implementation, this would query an inventory table
    const inventory = [
      { item: 'Reagents', status: 'Sufficient', level: 'High' },
      { item: 'Slides', status: 'Low', level: 'Medium' },
      { item: 'Test Tubes', status: 'OK', level: 'High' },
      { item: 'Syringes', status: 'Critical', level: 'Low' }
    ];

    res.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory status' });
  }
};

// Get recent activities
exports.getRecentActivities = async (req, res) => {
  try {
    const [activities] = await labdb.query(`
      SELECT
        lr.test_type,
        lr.status,
        lr.created_at,
        u.fname,
        u.lname
      FROM labresults lr
      JOIN patients p ON lr.patient_id = p.id
      JOIN users u ON p.user_id = u.id
      ORDER BY lr.created_at DESC
      LIMIT 5
    `);

    const formattedActivities = activities.map(activity => ({
      description: `${activity.test_type} ${activity.status.toLowerCase()} for ${activity.fname} ${activity.lname}`,
      timestamp: activity.created_at
    }));

    res.json(formattedActivities);
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    res.status(500).json({ error: 'Failed to fetch recent activities' });
  }
};

// Get weekly patient visits data for chart
exports.getWeeklyVisits = async (req, res) => {
  try {
    const [visits] = await labdb.query(`
      SELECT
        DATE_FORMAT(visited_at, '%b') as month,
        COUNT(*) as count
      FROM visits
      WHERE visited_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(visited_at, '%b')
      ORDER BY MIN(visited_at)
    `);

    res.json(visits);
  } catch (error) {
    console.error('Error fetching weekly visits:', error);
    res.status(500).json({ error: 'Failed to fetch weekly visits data' });
  }
};
