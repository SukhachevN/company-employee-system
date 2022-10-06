import express from 'express';
import cors from 'cors';
import { createStartData, getPaginatedResult } from './utils';

const { companies, employees } = createStartData();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.json('Possible routes: /companies, /employees');
});

app.get('/companies', (req, res) => {
  const page = req.query.page;

  const realPage = page ? +page : 0;

  const result = getPaginatedResult(realPage, companies);

  res.json(result);
});

app.get('/employees', (req, res) => {
  const { companyId: company, page } = req.query;

  const filtered = employees.filter(({ companyId }) => companyId === company);

  const realPage = page ? +page : 0;

  const result = getPaginatedResult(realPage, filtered);

  res.json(result);
});

const port = 4000;
const url = 'http://localhost:' + port;

app.listen(port, () => {
  console.log(url);
});
