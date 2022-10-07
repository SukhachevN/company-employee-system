import { memo, useEffect } from 'react';
import { useAppDispatch } from '../../../App/hooks';
import { useCompanies } from '../../../utils/selectors';
import { Table } from '../../UI/Table';
import { fetchCompanies, postCompany } from './slice';
import { tableConfig } from './tableConfig';

const Companies = memo(() => {
  const dispatch = useAppDispatch();

  const { entities, endOfData, isLoading } = useCompanies();

  const fetchNext = () =>
    !isLoading && !endOfData && dispatch(fetchCompanies());

  useEffect(() => {
    dispatch(postCompany({ title: 'test', address: 'test', employees: 0 }));
  }, []);

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
