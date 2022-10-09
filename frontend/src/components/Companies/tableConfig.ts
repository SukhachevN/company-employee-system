import { ITableConfigValue, NotCreatedCompany } from '../../utils/interfaces';

export const tableConfig: Record<keyof NotCreatedCompany, ITableConfigValue> = {
  title: {
    fieldName: 'Название',
    styles: {
      width: '15%',
    },
  },
  address: {
    fieldName: 'Адрес',
    styles: {
      width: '30%',
    },
  },
  employees: {
    fieldName: 'Cотрудников',
    styles: {
      width: '25%',
    },
  },
};
