import React, { useState, useCallback } from 'react';
import { Signup } from './pages/signupPage';
import { Signin } from './pages/signinPage';
import { Dashboard } from './components/dashBoard';
import { SendMoney } from './components/sendMoney';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainPage } from './components/mainPage';

import './App.css';

function App() {

  return (


    <BrowserRouter>

      <Routes>

        <Route path='/' element={<MainPage></MainPage>}></Route>
        <Route path='/signin' element={<Signin></Signin>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/send' element={<SendMoney></SendMoney>}></Route>
        
      </Routes>

    </BrowserRouter>




  )


}

export default App;
