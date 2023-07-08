import React, { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";


const Login = () => {
  let navigate=useNavigate();
    const [credentials, setCredentials] = useState({email:"",password:""})

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response= await fetch("http://localhost:5000/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify( {email:credentials.email,password:credentials.password})
        })
        const json=await response.json()
        console.log(json);

        if(json.success){
          localStorage.setItem("authToken",json.authToken);
          console.log(localStorage.getItem("authToken"));
          navigate("/");
        }
        else {
          alert("Enter Valid Credentials");
          
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })     
    }

  
  return (
    <> 
       <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',height: '100vh',backgroundSize:"cover" }}>
      <div>
      <Navbar/>  
      </div>

        <div className='container pb-3' >
          <form className='w-50 m-auto mt-5 border bg-black bg-gradient rounded' onSubmit={handleSubmit}>
           
            <div className="m-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>
           
            <div className="m-3 " >
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <button type="submit" className="m-3 btn"  style={{"font-family":"'Belanosima', sans-serif",backgroundColor:"#F2BE22"}}>Submit</button>
            <Link to="/createuser" className="m-3 mx-1 btn btn-danger bg-gradient">I'm a new user</Link>
            
          </form>
        </div>
      </div>

    </>
  )
}

export default Login