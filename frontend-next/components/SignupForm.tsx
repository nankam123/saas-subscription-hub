import { useState } from "react";
import PlanSelection from "./PlanSelection";

interface UserResponse {
  id: number;         // the user ID returned from backend
  name?: string;
  email?: string;
  error?: string;
}

export default function SignupForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data: UserResponse = await res.json();

      if (res.ok) {
        setMessage("User created successfully!");
		setUserId(data.id);
        setName("");
        setEmail("");
        setPassword("");		   
      } else {
        setMessage(data.error || "Failed to create user");
      }
    } catch (error) {
      setMessage("Network error");
    }
	
  };

  if (userId) {
    return <PlanSelection userId={userId} />;
  }


  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
