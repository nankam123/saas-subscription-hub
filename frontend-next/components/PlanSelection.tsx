import React, { useEffect, useState } from "react";

interface Plan {
  id: number;
  name: string;
  price: number;
}

interface PlanSelectionProps {
  userId: number;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({ userId }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  // Fetch plans with async/await
  const fetchPlans = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/plans");
      if (!res.ok) throw new Error(`Failed to fetch plans: ${res.statusText}`);
      const data: Plan[] = await res.json();
      setPlans(data);
    } catch (err) {
      console.error(err);
      setMessage("Unable to load plans. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubscribe = async () => {
    if (selectedPlan === null) return;

    try {
      const res = await fetch("http://localhost:4000/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, planId: selectedPlan }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Subscription failed");
      }

      const data: { message: string } = await res.json();
      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage( "Failed to subscribe. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select a Plan</h2>
      <ul>
        {plans.map(plan => (
          <li key={plan.id}>
            <label>
              <input
                type="radio"
                name="plan"
                value={plan.id}
                onChange={() => setSelectedPlan(plan.id)}
              />
              {plan.name} - ${plan.price}
            </label>
          </li>
        ))}
      </ul>

      <button onClick={handleSubscribe}>Subscribe</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default PlanSelection;
