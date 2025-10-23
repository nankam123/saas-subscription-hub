import express from "express";
const router = express.Router();

// Mock data for available plans
const plans = [
  { id: 1, name: "Basic", price: 10 },
  { id: 2, name: "Pro", price: 25 },
  { id: 3, name: "Enterprise", price: 50 },
];

// ✅ GET /api/plans – List all available plans
router.get("/plans", (req, res) => {
  res.json(plans);
});

// ✅ POST /api/subscriptions – Create a subscription
router.post("/subscriptions", (req, res) => {
  const { userId, planId } = req.body;

  if (!userId || !planId) {
    return res.status(400).json({ message: "userId and planId are required" });
  }

  const selectedPlan = plans.find(p => p.id === planId);
  if (!selectedPlan) {
    return res.status(404).json({ message: "Plan not found" });
  }

  const subscription = {
    id: Date.now(),
    userId,
    planId,
    planName: selectedPlan.name,
    startDate: new Date(),
  };

  res.status(201).json({ message: "Subscription created", subscription });
});

export default router;
