import { Button, Input, Space, Alert, Flex, Progress } from 'antd';
import './App.css';
import { BrowserRouter, Routes, Switch, Route, Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
import SigninPage from './pages/SigninPage';
import Verification from './pages/VerificatePage';
import HomePage from './pages/HomePage';
import LayoutStyle from './components/LayoutStyle';
import Password from 'antd/es/input/Password';

function App() {

const [email, setEmail] = useState('');
const [userinfo, setUserinfo] = useState({name: '', surname: '', username: ''});
const [getnames, setGetnames] = useState({username: '', password: ''});
const [loginkey, setLoginkey] = useState(false);
return(
 <div>
   <BrowserRouter>
   <Routes>
    <Route index element={<WelcomePage/>} />
    <Route path='login' element={<LoginPage setGetnames={setGetnames} setLoginkey={setLoginkey}/>}/>
    <Route path='signin' element={<SigninPage setUserinfo={setUserinfo} setEmail={setEmail}/>}/>
    <Route path='signin/verification' element={<Verification email={email}/>}/>
    <Route path='homepage' element={<LayoutStyle userinfo={userinfo} email={email} getnames={getnames} 
    loginkey={loginkey}/>}/>
  </Routes>
   </BrowserRouter>
 </div>
)
}

export default App;
