const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role || "provider"]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = users[0];

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
