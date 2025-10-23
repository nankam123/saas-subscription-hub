import express from "express";
const router = express.Router();

interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [];

// ✅ GET /api/users — show all users
router.get("/", (req, res) => {
  res.json(users);
});

// POST /api/users
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if user exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);

  res.status(201).json({ message: "User created", user: newUser });
});

export default router;
