import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import SignIn from './components/SignIn/Signin';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import './App.css';
import NotFound from './components/NotFound/NotFound';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/regestration" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
