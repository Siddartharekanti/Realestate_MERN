import "./register.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const [error,setError] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
     e.preventDefault(); //prevents refreshing page
     setIsLoading(true)
     setError("")
     
     const formData = new FormData(e.target); //using this we can access the form-inputs

     const username = formData.get("username"); //using their names we can reach their values
     const email = formData.get("email");
     const password = formData.get("password");
     
     try{
         const res = await axios.post("http://localhost:8800/backend/auth/register",{
             username,
             email,
             password
          })
          //console.log(res.data) 
          navigate("/login") //after successful register--> redirect to login page

        }catch(err){
            console.log(err)
            setError(err.response.data.message)
        }finally{
          setIsLoading(false)
        }

  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}  >Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
