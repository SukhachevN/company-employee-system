import { IEmployeeForTable, ITableConfigValue } from '../../utils/interfaces';

export const tableConfig: Record<keyof IEmployeeForTable, ITableConfigValue> = {
  fullName: {
    fieldName: 'ФИО',
    styles: {
      width: '30%',
    },
  },
  position: {
    fieldName: 'Должность',
    styles: {
      width: '30%',
    },
  },
};
