import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './pages/header';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import AdminDashboard from './pages/AdminDashboard';  // Add Admin Dashboard import
import UserDashboard from './pages/Userdashboard';    // Add User Dashboard import

function App() {
  const [role, setRole] = useState(null); // State to store the user's role
   const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Fetch user profile and set the role (user or admin)
  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:8954/api/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          // console.log("Daat: ",data);
          setRole(data.role); // Assuming the response has a `role` property
        } catch (error) {
          console.error(error);
          //navigate('/login'); // Redirect to login if the user is not authorized
        }
      } 
    };

    fetchUserRole();
  }, [token, navigate]);

  // Render the routes based on user role
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        
        {/* Render specific dashboard based on role */}
        
        {role === 'admin' ? (
          <Route path="/dashboard" element={<AdminDashboard />} />
        ) : role === 'user' ? (
          <Route path="/dashboard" element={<UserDashboard />} />
        ) : null}
      </Routes>
    </>
  );
}

export default App;
