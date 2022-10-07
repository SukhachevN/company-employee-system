import { memo, useCallback, useMemo } from 'react';
import { useAppDispatch } from '../../../App/hooks';
import { useCompanies } from '../../../utils/selectors';
import { Table } from '../../UI/Table';
import { deleteCompanies, fetchCompanies, setSelectedCompanies } from './slice';
import { tableConfig } from './tableConfig';
import { ButtonHandlers } from '../../../utils/interfaces';

const Companies = memo(() => {
  const dispatch = useAppDispatch();

  const { entities, endOfData, isLoading, selected } = useCompanies();

  const fetchNext = () =>
    !isLoading && !endOfData && dispatch(fetchCompanies());

  const buttonHandlers: ButtonHandlers = useMemo(
    () => ({
      EDIT: (id: string) => console.log('TODO'),
      ADD_EMPLOYEE: (id: string) => console.log('TODO'),
      REMOVE: (id: string) => dispatch(deleteCompanies([id])),
    }),
    []
  );

  return (
    <Table
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
