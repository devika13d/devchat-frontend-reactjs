import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { loginAPI } from '../services/allAPI';
import toast from 'react-hot-toast';
import { isAuthTokenContext } from '../context/AuthContext';


function Login() {
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    if (!username || !password) {
      toast.error('Please fill out the form correctly.');
    } else {
      const result = await loginAPI(formData)
      console.log(result);
      if (result.status === 200) {
        sessionStorage.setItem('user', JSON.stringify(result.data.user))
        sessionStorage.setItem('token', result.data.token)
        setIsAuthToken(true)
        toast.success('User loggedin successfully');
        setFormData({
          username: '',
          password: '',
        });
        navigate('/msg');
      } else {
        toast.error(result.response.data);
        setLoading(true)
      }
    }
    setLoading(false);
  };

  return (
    <div className="login-container l d-flex justify-content-center align-items-center vh-100">
      <div className="login-form p-5 rounded">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">LOGIN NOW!!</h2>
          <Row className="mb-3">
            <Col md="12">
              <Form.Group controlId="validationCustom01">
                <Form.Label className="text-light">User name:</Form.Label>
                <Form.Control
                  required
                  type="text" title='Please fill out this fields'
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="12">
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="text-light">Password</Form.Label>
                <Form.Control
                  required
                  type="password" title='Please fill out this fields'
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" className="me-3 w-100" disabled={loading} onClick={handleSubmit}>
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </Form>
        <div className="text-center mt-4">
          <h6 className="text-dark">
            If you don't have an account, please <br />
            <Link to={'/signup'} className="text-decoration-none">Create an Account</Link>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Login;
