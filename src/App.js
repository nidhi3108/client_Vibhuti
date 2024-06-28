import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Card from './component/Card';
import Navbar from './component/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route element={<Card/>} path="/user-mycourses"/>
    </Routes>

  </BrowserRouter>
  );
}

export default App;
