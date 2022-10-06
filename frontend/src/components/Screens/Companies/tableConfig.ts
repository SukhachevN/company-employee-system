import {
  ITableConfigValue,
  NotCreatedCompany,
} from '../../../utils/interfaces';

export const tableConfig: Record<keyof NotCreatedCompany, ITableConfigValue> = {
  title: {
    fieldName: 'Название',
    styles: {
      flexBasis: '30%',
    },
  },
  address: {
    fieldName: 'Адрес',
    styles: {
      flexBasis: '30%',
    },
  },
  employees: {
    fieldName: 'Кол-во сотрудников',
    styles: {
      flexBasis: '30%',
    },
  },
};
