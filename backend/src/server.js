const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

console.log("[DEBUG] Requiring database pool...");
const pool = require("./config/db");
console.log("[DEBUG] Database pool required.");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());


app.get("/health", (req, res) => {
  res.json({ status: "Backend is running ✅" });
});

// DB test
app.get("/db-test", async (req, res) => {
  try {
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
