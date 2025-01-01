import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const token = localStorage.getItem('token');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8954/api/user/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
            console.error(`Error: ${response.status}`);
            setUsers([]); // Set to an empty array if the response is not ok
            return;
          }
        const data = await response.json();
        
      if (Array.isArray(data)) {
        setUsers(data); // Only set if data is an array
      } else {
        console.error('Invalid data format:', data);
        setUsers([]); // Default to an empty array for safety
      }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [token, navigate]);

  const handleDelete = async (userId) => {
    if (!token) return;

    try {
      await fetch(`http://localhost:8954/api/user/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>All Users</h3>
      {Array.isArray(users) && users.length === 0 ? (
        <p>No users found.</p>
      ) : Array.isArray(users) ?(
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ): (
        <p>Failed to load users. Please try again later.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
