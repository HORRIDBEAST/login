import React from 'react'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './login.css';
const Login = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleInputChange = (event) => {
    
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async (event) => {  
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8954/api/user/login', formData);
      toast.success('Login successful!');

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');

      console.error(error);
    }
  };
  return (
    <div className="login-container">
    <Form className="login-form" onSubmit={handleSubmit}>
      <h1 className="text-center">Login</h1>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"     name="email" // Add this line
    placeholder="Enter email" value={formData.email} onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password"  value={formData.password} onChange={handleInputChange}/>
      </Form.Group>
      
      <Button variant="dark" type="submit" className="w-100">
        Login
      </Button>
    </Form>
  </div>
  )
}

export default Login
