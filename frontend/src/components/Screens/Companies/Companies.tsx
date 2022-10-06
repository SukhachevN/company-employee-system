import { memo, useEffect } from 'react';
import { useAppDispatch } from '../../../App/hooks';
import { fetchCompanies } from './slice';

const Companies = memo(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  return <div>Companies</div>;
});

export { Companies };
