import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import {
  ToastContainer
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';

import Register from './pages/Register';

import Dashboard from './pages/Dashboard';

function App() {

  const token =
    localStorage.getItem('token');

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* Register */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Dashboard */}

        <Route
          path="/dashboard"
          element={
            token
              ? <Dashboard />
              : <Navigate to="/" />
          }
        />

      </Routes>
      <ToastContainer />

    </BrowserRouter>

  );

}

export default App;