import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/layouts/AppLayout'; // Import the Layout component
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from './components/users/UserDashboard'; // Assuming you have this component
import UserJobCardEntry from './components/users/UserJobCardEntry'; // Import Manage Users component
import ViewAllJobCards from './components/admin/ViewAllJobCards'; // Import Manage Users component
import ViewUserJobCards from './components/users/ViewUserJobCards'; 
import EmployeeManagement from './components/admin/EmployeeManagement';
import ActivityCodeSheet from './components/admin/ActivityCodeSheet';
import EfficiencyComputation from './components/admin/EfficiencyComputation';
import Incentives from './components/admin/Incentives';
import EmployeeEfficiency from './components/admin/EmployeeEfficiency';
import StdHrs from './components/admin/StdHrs';
import Reports from './components/admin/Reports';
import Analytics from './components/admin/Analytics';
import CasualLabourJobCardEntry from './components/admin/CasualLabourJobCardEntry';

import { Outlet } from 'react-router-dom';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(''); // Store role here

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setRole={setRole} />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route path="/admin" element={isAuthenticated && role === 'Admin' ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Navigate to="/admin/dashboard" />} /> {/* Redirect to dashboard on entering /admin */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="view_all_job_cards" element={<ViewAllJobCards />} />
            <Route path="employee_management" element={<EmployeeManagement />} />
            <Route path="activity_code_sheet" element={<ActivityCodeSheet />} />
            <Route path="efficiency_computation" element={<EfficiencyComputation />} />
            <Route path="incentives" element={<Incentives />} />
            <Route path="employee_efficiency" element={<EmployeeEfficiency />} />
            <Route path="std_hrs" element={<StdHrs />} />
            <Route path="reports" element={<Reports />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="casual_labour_job_card_entry" element={<CasualLabourJobCardEntry />} />
            <Route path="user_job_card_entry" element={<UserJobCardEntry />} />
          </Route>

          {/* User Routes */}
          <Route path="/user" element={isAuthenticated && role === 'User' ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Navigate to="/user/dashboard" />} /> {/* Redirect to dashboard on entering /user */}
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="user_job_card_entry" element={<UserJobCardEntry />} />
            <Route path="view_user_job_cards" element={<ViewUserJobCards />} />
          </Route>

          {/* Redirect to login for unknown routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
