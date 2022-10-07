import {
  ITableConfigValue,
  NotCreatedCompany,
} from '../../../utils/interfaces';

export const tableConfig: Record<keyof NotCreatedCompany, ITableConfigValue> = {
  title: {
    fieldName: 'Название',
    styles: {
      width: '30%',
    },
  },
  address: {
    fieldName: 'Адрес',
    styles: {
      width: '30%',
    },
  },
  employees: {
    fieldName: 'Кол-во сотрудников',
    styles: {
      width: '30%',
    },
  },
};
