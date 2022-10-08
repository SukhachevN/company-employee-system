import { Companies } from '../components/Screens/Companies';
import { Employees } from '../components/Screens/Employees';
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
