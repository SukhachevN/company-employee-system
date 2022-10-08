import { memo, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { ButtonHandlers } from '../../utils/interfaces';
import {
  haveSelected,
  queryForEmployees,
  useEmployees,
} from '../../utils/selectors';
import { setFormType } from '../EditForm/slice';
import { Table } from '../Table';
import {
  deleteEmployees,
  fetchEmployees,
  setEmployee,
  setSelectedEmployees,
} from './slice';
import { tableConfig } from './tableConfig';

const Employees = memo(() => {
  const dispatch = useAppDispatch();

  const { entities, endOfData, isLoading, selected, entitiesError } =
    useEmployees();

  const haveSelectedCompany = useAppSelector(haveSelected);

  const query = useAppSelector(queryForEmployees);

  const fetchNext = () => {
    const condition = haveSelectedCompany && !isLoading && !endOfData;

    condition && dispatch(fetchEmployees(query));
  };

  const buttonHandlers: ButtonHandlers = useMemo(
    () => ({
      EDIT: (id: string) => {
        dispatch(setFormType('employee'));
        dispatch(setEmployee(id));
      },
      REMOVE: (id: string) => dispatch(deleteEmployees([id])),
    }),
    []
  );

  const performedEntities = useMemo(
    () =>
      entities.map(({ id, firstName, lastName, position }) => ({
        id,
        position,
        fullName: `${firstName} ${lastName}`,
      })),
    [entities]
  );

  useEffect(() => {
    dispatch(fetchEmployees(query));
  }, [query]);

  return (
    <Table
      error={entitiesError}
      entities={performedEntities}
      onClick={(id, setAllTo) =>
        dispatch(setSelectedEmployees({ id, setAllTo }))
      }
      fetchNext={fetchNext}
      selected={selected}
      tableConfig={tableConfig}
      isLoading={isLoading}
      buttonHandlers={buttonHandlers}
      emptyText='У этой компании нет сотрудников'
    />
  );
});

export { Employees };
