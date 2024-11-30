import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewLoan from './pages/NewLoan';
import LoanDetails from './pages/LoanDetails';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import PrivateRouteAdmin from './components/PrivateAdmin';


function App() {
  return (
    
      <Router future={{ v7_relativeSplatPath: true , v7_startTransition: true}}>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/loans/new" element={<PrivateRoute><NewLoan /></PrivateRoute>} />
              <Route path="/loans/:id" element={<PrivateRoute><LoanDetails /></PrivateRoute>} />
              <Route path="/admin" element={<PrivateRoute> <AdminDashboard /></PrivateRoute>} />
            </Routes>
          </div>
          <Toaster position="top-right" />
        </div>
      </Router>
    
  );
}

export default App;