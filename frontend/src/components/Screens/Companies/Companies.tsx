import { memo, useEffect } from 'react';
import { useAppDispatch } from '../../../App/hooks';
import { useCompanies } from '../../../utils/selectors';
import { Table } from '../../UI/Table';
import { fetchCompanies } from './slice';
import { tableConfig } from './tableConfig';

const Companies = memo(() => {
  const dispatch = useAppDispatch();

  const { entities, endOfData, isLoading } = useCompanies();

  const fetchNext = () =>
    !isLoading && !endOfData && dispatch(fetchCompanies());

  return (
    <Table
      entities={entities}
      tableConfig={tableConfig}
      onClick={(id) => console.log(id)}
      fetchNext={fetchNext}
    />
  );
});

export { Companies };
