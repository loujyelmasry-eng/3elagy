// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// // import { auth } from "../services/firebase";
// import { useNavigate } from "react-router-dom";

// function Login(){

// const navigate = useNavigate();

// const [email,setEmail] = useState("");
// const [password,setPassword] = useState("");

// const handleLogin = async(e)=>{
// e.preventDefault();

// try{

// await signInWithEmailAndPassword(auth,email,password);

// navigate("/profile");

// }catch(err){
// alert(err.message);
// }

// };

// return(

// <div className="auth-container">

// <h2>Login</h2>

// <form onSubmit={handleLogin}>

// <input
// type="email"
// placeholder="Email"
// onChange={(e)=>setEmail(e.target.value)}
// required
// />

// <input
// type="password"
// placeholder="Password"
// onChange={(e)=>setPassword(e.target.value)}
// required
// />
// <p>
//   Don't have an account?
//   <Link to="/signup">Sign up</Link>
// </p>
// <button type="submit">Login</button>

// </form>

// </div>

// );

// }

// export default Login;

import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Login() {

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <img src="/src/assets/logo.jpeg" className="auth-logo" />

        <h2>Welcome Back</h2>
        <p>Your trusted healthcare platform</p>

        <form onSubmit={handleLogin}>

          <input type="email" placeholder="Email address" required />

          <input type="password" placeholder="Password" required />

          <button type="submit">Login</button>

        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

      </div>

    </div>
  );
}