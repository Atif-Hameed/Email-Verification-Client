import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Welcom from './components/Welcom';
import Login from './components/Login';
import VerifyEmail from './components/VerifyEmail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/welcom/:id' element={<Welcom/>} />
        <Route path='/logIn' element={<Login/>} />
        <Route path='/verifyMail' element={<VerifyEmail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
