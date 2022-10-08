import { Companies } from '../components/Companies';
import { Employees } from '../components/Employees';
import { haveSelected } from '../utils/selectors';
import { useAppSelector } from './hooks';

import './styles.scss';

const App = () => {
  const showEmployees = useAppSelector(haveSelected);

  return (
    <main className='container'>
      <Companies />
      {showEmployees && <Employees />}
    </main>
  );
};

export default App;
