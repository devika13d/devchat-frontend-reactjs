import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../context/AuthContext';
import './doub.css'

function DoubHome() {
    const navigate = useNavigate();
    const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        setIsAuthToken(false);
        navigate('/');
    }

    return (
        <div className="ls container-fluid p-0">
            <main>
                <section className="container">
                    <div className="row align-items-center justify-content-center my-5">
                        <div className="col-md-6 text-center">
                            <Link to={'/'}><i class="fa-solid fa-house-chimney-user fa-2x text-secondary" title='Back To Home'></i></Link>
                        </div>
                        <div className="col-md-6" style={{ width: '618px' }}>
                            <marquee>

                                <p className="text-muted">This is a platform for people to connect, chat, and have fun.</p>
                            </marquee>
                            <div className='text-center'>
                                <button className='btn btn-dark text-light' onClick={handleLogout}>LogOut</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    );
}

export default DoubHome;
