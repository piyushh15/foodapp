import './App.css';
import Home from './screens/Home';
import React from "react";
import Login from './screens/Login';
import { CartProvider } from './components/Contextreducer';
import {
  BrowserRouter as Router,
  Routes,
  Route,     
} from "react-router-dom";
import Signup from './screens/Signup';
function App() {
  return (
   <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/createuser" element={<Signup />}></Route>
        </Routes>
      </div>
    </Router>
   </CartProvider>
      
    
  );
}

export default App;
