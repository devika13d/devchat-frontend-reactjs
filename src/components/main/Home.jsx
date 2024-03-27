import React from 'react'
import './home.css'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
     <div className="l container-fluid p-0">
      <header className="text-white py-5 text-center " >
        <h1 className="display-4 ">Welcome to DevChat!</h1>
        <p className="lead text-dark">Connect with Peoples</p>
      </header>
      <main>
        <section className="container">
          <div className="row align-items-center justify-content-center my-5">
            <div className="col-md-6 text-center">
              <img src={logo} alt="Banner" className="img-fluid rounded-circle shadow" style={{opacity:0.5}} />
            </div>
            <div className="col-md-6">
              <h2 className="text-dark">About Us</h2>
              <p className="text-muted">This is a platform for peoples to connect, chat, and fun.</p>
              <h2 className="text-dark">Get Started</h2>
              <p className="text-muted">Sign up or log in to start chatting with peoples. <span>  <Link to={'/signup'} className="text-decoration-none"style={{color:"#0d32fd"}}>Create an Account</Link></span>  </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="text-white text-center py-5" id='foo'>
        <p className='text-dark'>&copy; 2024 DevChat. All rights reserved.</p>
      </footer>
    </div>
    </>
  );

}



export default Home