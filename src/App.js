// src/App.js
import React, {useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Cards from './components/Cards';
import Login from './components/Login';
import Signup from './components/CustomSignUp';
import CreateGroup from './components/CreateGroup';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';

const App = () => {

  const { signOut } = useAuth();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log('Logging out...');
      signOut();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [signOut]);

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/join-group" element={<Cards />} /> {/* "Join a Group" shows Cards */}
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/about-us" element={<div>About Us Page</div>} />
          <Route path="/login" element={<Login />} /> {/* Add a proper login route */}
          <Route path="/signup" element={<Signup />} /> {/* Add a proper signup route */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
