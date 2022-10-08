import { memo, useMemo } from 'react';
import { useAppDispatch } from '../../App/hooks';
import { useCompanies } from '../../utils/selectors';
import { Table } from '../Table';
import {
  deleteCompanies,
  fetchCompanies,
  setCompany,
  setSelectedCompanies,
} from './slice';
import { tableConfig } from './tableConfig';
import { ButtonHandlers } from '../../utils/interfaces';
import { setFormType } from '../EditForm/slice';
import { setEmployeesCompany } from '../Employees/slice';

const Companies = memo(() => {
  const dispatch = useAppDispatch();

  const { entities, endOfData, isLoading, selected, entitiesError } =
    useCompanies();

  const fetchNext = () =>
    !isLoading && !endOfData && dispatch(fetchCompanies());

  const buttonHandlers: ButtonHandlers = useMemo(
    () => ({
      EDIT: (id: string) => {
        dispatch(setCompany(id));
        dispatch(setFormType('company'));
      },
      ADD_EMPLOYEE: (id: string) => {
        dispatch(setFormType('employee'));
        dispatch(setEmployeesCompany(id));
      },
      REMOVE: (ids: string | string[]) =>
        dispatch(deleteCompanies(Array.from(ids))),
    }),
    []
  );

  return (
    <Table
      error={entitiesError}
      entities={entities}
      tableConfig={tableConfig}
      onClick={(id, setAllTo) =>
        dispatch(setSelectedCompanies({ id, setAllTo }))
      }
      fetchNext={fetchNext}
      selected={selected}
      isLoading={isLoading}
      buttonHandlers={buttonHandlers}
    />
  );
});

export { Companies };
