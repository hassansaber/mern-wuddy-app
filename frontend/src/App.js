//BrowserRouter= wraps everywhere we want to use the router basically
//Routes= Component which wraps all of our individual routes
//Route= the individual route component to create a single route
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/signup'
              element={<Signup />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
