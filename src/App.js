import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/page/Signup';
import Login from './components/page/Login';
import Home from './components/main/Home';
import Msg from './components/page/Msg'
import Conversation from './components/page/Coversation';
import toast, { Toaster } from 'react-hot-toast';
import { useContext, useEffect, useState } from 'react';
import { isAuthTokenContext } from './components/context/AuthContext';

function App() {
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)

  useEffect(() => {
    const tsn = sessionStorage.getItem('token')
    if (tsn) {
      setIsAuthToken(tsn)
    }
  }, [isAuthToken])
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={isAuthToken ? <Msg /> : <Login />} />
        <Route path='/msg' element={<Msg />} />
        <Route path='/conversation/:contactId' element={<Conversation />} />

      </Routes>
      <Toaster />
    </>
  );
}

export default App;
