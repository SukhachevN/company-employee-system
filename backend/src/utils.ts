import { createCompany, createEmployee } from './fakerFunctions';
import { Company, Employee } from './interfaces';

export const limit = 20;

export const createStartData = () => {
  const companies: Company[] = [];
  const employees: Employee[] = [];

  const randomCompanyNumber = Math.floor(Math.random() * 1000);

  for (let i = 0; i < randomCompanyNumber; i++) {
    const company = createCompany();
    const randomEmployeesNumber = Math.floor(Math.random() * 100);
    company.employees = randomEmployeesNumber;
    companies.push(company);

    for (let j = 0; j < randomEmployeesNumber; j++) {
      const employee = createEmployee(company.id);
      employees.push(employee);
    }
  }

  return {
    companies,
    employees,
  };
};

export const getPaginatedResult = <T>(
  page: number,
  array: T[]
): { endOfData: boolean; results: T[] } => {
  if (page <= 0 || isNaN(page)) return { endOfData: true, results: array };

  const startIndex = (+page - 1) * limit;
  const endIndex = +page * limit;

  const results = array.slice(startIndex, endIndex);

  return { endOfData: !results.length, results };
};
