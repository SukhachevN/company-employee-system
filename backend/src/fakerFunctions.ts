import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import { ICompany, IEmployee } from './interfaces';

const fakeJobsList = [
  'frontend',
  'backend',
  'fullstack',
  'devops',
  'director',
  'product manager',
  'company owner',
  'fired',
  'cleaner',
  'HR',
];

export const createCompany = (): ICompany => {
  const { county, cityName, streetAddress } = faker.address;

  return {
    id: uuid(),
    title: faker.company.name(),
    employees: 0,
    address: `${county()}, ${cityName()}, ${streetAddress()}`,
  };
};

export const createEmployee = (companyId: string): IEmployee => {
  const { firstName, lastName } = faker.name;
  const position = faker.helpers.arrayElement(fakeJobsList);

  return {
    id: uuid(),
    firstName: firstName(),
    lastName: lastName(),
    position,
    companyId,
  };
};
