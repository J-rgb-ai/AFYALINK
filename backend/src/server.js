const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/authRoutes');
const labtechRoutes = require('./routes/labtechRoutes');

app.use('/', indexRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/labtech', labtechRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Backend is running ✅" });
});

// DB test
app.get("/db-test", async (req, res) => {
  try {
    const createPool = require("./config/db/db");
    const pool = await createPool(process.env.DB_USER, process.env.DB_PASS);
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json({ success: true, result: rows[0].result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 8083;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("[DEBUG] Express server started and listening.");
});
