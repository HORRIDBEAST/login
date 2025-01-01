import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './signup.css'; // Ensure you create a Signup.css file and include the CSS below
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const usenavigate=useNavigate();
  const handleInputChange = (event) => {
    
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      /*
     const response=await fetch("http://localhost:8954/api/user/register",{
       method:"POST",
       headers:{
         "Content-Type":"application/json"
       },
       body:JSON.stringify(formData)
     }) 
       const responseData=await response.json();
       console.log(responseData)
             */

      const response =await axios.post("http://localhost:8954/api/user/register", formData);
      toast.success("Signup successful.Account created successfully");
      usenavigate("/login");
    }catch(err){
      toast.error("Signup failed. Please try again.");

      console.log(err.message);
    }finally{
      setFormData({
        email: '',
        password: '',
        name: '',
      });
    }
  }
  return (
    <div className="signup-container">
      <Form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Signup</h1>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} />
        </Form.Group>
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
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
