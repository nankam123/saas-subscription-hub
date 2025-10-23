import express from 'express';
const router = express.Router();

let plans = [
  { id: 1, name: 'Basic', price: 10 },
  { id: 2, name: 'Pro', price: 30 },
];

// GET all plans
router.get('/', (req, res) => {
  res.json(plans);
});

// POST create new plan
router.post('/', (req, res) => {
  const { name, price } = req.body;
  const newPlan = {
    id: plans.length + 1,
    name,
    price,
  };
  plans.push(newPlan);
  res.status(201).json(newPlan);
});

export default router;
