import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import './signup.css';
import GenderCheck from './GenderCheck';
import { signupAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const handleCheckboxChange = (gender) => {
    setFormData({ ...formData, gender });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { fullname, username, password, confirmPassword, gender } = formData;
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      toast.error('Please fill the form completely!');
    }
    if (password !== confirmPassword) {
      toast.error("Password mismatch")
    }
    else {
      try {
        setLoading(true);
        const result = await signupAPI(formData);
        if (result.status === 200) {
          toast.success('User registered successfully');
          setFormData({
            fullname: '',
            username: '',
            password: '',
            confirmPassword: '',
            gender: ''
          });
          navigate('/login');
        } else {
          toast.error(result.response.data);
        }
      } catch (error) {
        toast.error('An error occurred during signup.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className=" form-control signup-container l rounded d-flex justify-content-center align-items-center vh-100">
      <div className="signup-form p-5 rounded">
        <Form onSubmit={handleRegister}>
          <h2 className="text-center mb-4">Sign Up Now!!</h2>
          <Row className="mb-3">
            <Col md="6">
              <Form.Group controlId="validationCustomUsername">
                <Form.Label className='text-light'>Fullname</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your fullname"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">Please enter fullname.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group controlId="validationCustomUsername">
                <Form.Label className='text-light'>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">Please enter a username.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md="6">
              <Form.Group controlId="validationCustomPassword">
                <Form.Label className='text-light'>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group controlId="validationCustomConfirmPassword">
                <Form.Label className='text-light'>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <Form.Control.Feedback type="invalid">Please confirm your password.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <GenderCheck onCheckboxChange={handleCheckboxChange} selectedGender={formData.gender} />
            </Col>
          </Row>
          <Button type="submit" className="w-100" disabled={loading} onClick={handleRegister}>
            {loading ? 'Signing up...' : 'Sign up'}
          </Button>
        </Form>
        <div className="text-center mt-4">
          <h6>
            Already have an account? <Link to={'/login'} className='text-decoration-none'>Login here</Link>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Signup;
