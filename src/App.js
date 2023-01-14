import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './Hooks/useAuthContext';

// Pages & Components
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';


function App() {

  const {user} = useAuthContext();
  
  return (
    <div className="App">
      <BrowserRouter>
        {/* NAVBAR */}
        <Navbar/>

        {/* PAGES */}
        <div className='pages'>
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path='login' element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
          </Routes>
        </div>


      </BrowserRouter>
    </div>
  );
}


export default App;