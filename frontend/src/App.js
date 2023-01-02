//BrowserRouter= wraps everywhere we want to use the router basically
//Routes= Component which wraps all of our individual routes
//Route= the individual route component to create a single route
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {

  // grab user context
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={user ? <Home /> : <Navigate to={'/login'} />}
            />
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to={'/'} />}
            />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to={'/'} />}
            />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
