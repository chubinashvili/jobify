import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { 
  Dashbooard, 
  Register,
  Landing,
  Error
} from './pages/index';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashbooard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
