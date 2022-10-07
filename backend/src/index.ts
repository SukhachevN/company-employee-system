import express, { Request } from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import { createStartData, getPaginatedResult } from './utils';
import {
  ICompany,
  IEmployee,
  INotCreatedCompany,
  INotCreatedEmployee,
} from './interfaces';

let { companies, employees } = createStartData();

const comaniesList: Record<string, boolean> = {};

const app = express();

app.use(cors());
app.use(express.json());

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

app.post('/companies', (req: Request<{}, {}, INotCreatedCompany>, res) => {
  const company = { ...req.body, id: uuid() };
  companies.push(company);
  res.json(company);
});

app.post('/employees', (req: Request<{}, {}, INotCreatedEmployee>, res) => {
  const employee = { ...req.body, id: uuid() };
  const { companyId } = req.body;
  const company = companies.find(({ id }) => id === companyId);
  if (!company) {
    res
      .status(400)
      .send(
        'Компании, куда вы хотите добавить сотрудника больше не существует'
      );
  } else {
    company.employees++;
    employees.push(employee);
    res.json(employee);
  }
});

app.put('/companies', (req: Request<{}, {}, ICompany>, res) => {
  const company = req.body;
  const index = employees.findIndex(({ id }) => id === company.id);
  if (~index) {
    res.status(400).send('Компания была удалена, либо не существовала');
  } else {
    companies[index] = company;
    res.json(company);
  }
});

app.put('/employees', (req: Request<{}, {}, IEmployee>, res) => {
  const employee = req.body;
  const index = employees.findIndex(({ id }) => id === employee.id);
  if (~index) {
    res.status(400).send('Сотрудник был удалён, либо не существовал');
  } else {
    employees[index] = employee;
    res.json(employee);
  }
});

app.delete('/companies', (req: Request<{}, {}, string[]>, res) => {
  const ids = req.body;
  companies = companies.filter(({ id }) => !ids.includes(id));
  employees = employees.filter(({ companyId }) => !ids.includes(companyId));
  res.json(ids);
});

app.delete('/employees', (req: Request<{}, {}, string[]>, res) => {
  const ids = req.body;
  const removedFromCompany: Record<string, number> = {};

  employees = employees.filter(({ companyId }) => {
    const condition = !ids.includes(companyId);

    if (!removedFromCompany[companyId]) removedFromCompany[companyId] = 0;
    removedFromCompany[companyId]++;

    return condition;
  });

  companies = companies.map((company) =>
    removedFromCompany[company.id]
      ? {
          ...company,
          employees: company.employees - removedFromCompany[company.id],
        }
      : company
  );
  res.json(ids);
});

const port = 4000;
const url = 'http://localhost:' + port;

app.listen(port, () => {
  console.log(url);
});
