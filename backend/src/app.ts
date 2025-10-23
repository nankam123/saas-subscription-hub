import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import plansRouter from './routes/plans';
import usersRouter from "./routes/users";
import subscriptionsRouter from "./routes/subscriptions";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('SaaS Subscription Hub API');
});

app.use('/api/plans', plansRouter); 
app.use("/api/users", usersRouter);
app.use("/api", subscriptionsRouter);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
