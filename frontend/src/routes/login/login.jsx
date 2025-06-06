import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest"
import { AuthContext } from "../../context/AuthContext";


function Login() {

    const [error,setError] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const {updateUser} = useContext(AuthContext) //usecontext hook

    const navigate = useNavigate()
  
    const handleSubmit = async (e) => {
       e.preventDefault(); //prevents refreshing page
       setIsLoading(true)
       setError("")

       const formData = new FormData(e.target); //using this we can access the form-inputs
  
       const username = formData.get("username"); //using their names we can reach their values
       const password = formData.get("password");
       
       try{
           const res = await apiRequest.post("/auth/login",{
               username,
               password
            })
            //console.log(res.data) 
            //localStorage.setItem("user",JSON.stringify(res.data))
            updateUser(res.data)
            navigate("/")
  
        }catch(err){
           
            setError(err.response.data.message)
        }finally{
            setIsLoading(false)
        }
  
    };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading} >Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>

      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;