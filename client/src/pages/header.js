import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <Navbar bg={token ? 'primary' : 'dark'} variant={token ? 'light' : 'dark'}>
        <Container>
          <Navbar.Brand as={Link} to={'/'}>
            <strong>{token ? 'Logged-In' : 'Not-Logged-In'}</strong>
          </Navbar.Brand>
          <Nav className="ml-auto">
            {token ? (
              <>
                <Nav.Link as={Link} to={'/dashboard'}>Dashboard</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to={'/login'}>Login</Nav.Link>
                <Nav.Link as={Link} to={'/register'}>signup</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
