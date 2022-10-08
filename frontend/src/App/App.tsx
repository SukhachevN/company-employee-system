import { Companies } from '../components/Companies';
import { EditForm } from '../components/EditForm';
import { Employees } from '../components/Employees';
import { haveSelected } from '../utils/selectors';
import { useAppSelector } from './hooks';

import './styles.scss';

const App = () => {
  const showEmployees = useAppSelector(haveSelected);

  return (
    <main className='container'>
      <EditForm />
      <div className='tables'>
        <Companies />
        {showEmployees && <Employees />}
      </div>
    </main>
  );
};

export default App;
