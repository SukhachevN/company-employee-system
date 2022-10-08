import { postCompany, updateCompany } from '../Companies/slice';
import { postEmployee, updateEmployee } from '../Employees/slice';

export const config = {
  company: {
    title: 'Название',
    address: 'Адрес',
  },
  employee: {
    firstName: 'Имя',
    lastName: 'Фамилия',
    position: 'Должность',
  },
};

export const postFunc = {
  company: postCompany,
  employee: postEmployee,
};

export const updateFunc = {
  company: updateCompany,
  employee: updateEmployee,
};
