import './App.css';
import { getAuth } from 'firebase/auth'
import app from './firebase.init';
import RegisterReactBoostrap from './components/RegisterReactBoostrap';

const auth = getAuth(app);

function App() {

  return (
      <div className=''>
          <RegisterReactBoostrap></RegisterReactBoostrap>
      </div>
  );
}

export default App;
