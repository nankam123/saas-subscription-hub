import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('SaaS Subscription Hub API');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
