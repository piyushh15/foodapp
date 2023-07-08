import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './Contextreducer';

const Navbar = () => {
  const Navigate=useNavigate();
  const [cartview,setCartview]=useState(false);
  let data=useCart();


  const handlelogout=()=>{
    localStorage.removeItem("authToken");
    Navigate('/login')

  }
  return (
    <div><nav className="navbar navbar-expand-lg navbar-light bg-black bg-gradient">
    <div className="container-fluid">
      <Link className="navbar-brand fs-1 px-4 " to="#" style={{"font-family":"'Belanosima', sans-serif","color":"#F2BE22"}}>GoFood</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2" style={{"font-family":"'Belanosima', sans-serif"}}>
          <li className="nav-item">
            <Link className="nav-link active fs-5" aria-current="page"  to="/">Home</Link>
          </li>
          {(localStorage.getItem("authToken"))?
          <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page"  style={{"font-family":"'Belanosima', sans-serif",backgroundColor:"#F2BE22"}} to="/">My Orders</Link>
        </li>
        :""}
        </ul>
        {(!localStorage.getItem("authToken"))?
        <div className='d-flex'>
            <Link className="btn  text-dark mx-1"  style={{"font-family":"'Belanosima', sans-serif",backgroundColor:"#F2BE22"}}to="/Login">Login</Link>
            <Link className="btn text-dark mx-1"  style={{"font-family":"'Belanosima', sans-serif",backgroundColor:"#F2BE22"}}to="/createuser">Signup</Link>
        </div>
        :
          <div>
          <div className='btn  text-black mx-2' style={{"font-family":"'Belanosima', sans-serif","font-weight":"700",backgroundColor:"#F2BE22"}} onClick={()=>setCartview(true)}>
          My Cart{" "}
          <Badge pill bg="danger">{data.length}</Badge>
          </div>
          {cartview?<Modal onClose={()=>setCartview(false)}><Cart/></Modal>:null}
                  
                  
                  
          <div className='btn bg-white text-danger mx-2' onClick={handlelogout}>
           Logout
          </div>
          </div>    
      }
          
      </div>
    </div>
  </nav></div>
  )
}

export default Navbar