// import { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../services/firebase";
// import { doc, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// function Signup(){

// const navigate = useNavigate();

// const [name,setName] = useState("");
// const [email,setEmail] = useState("");
// const [password,setPassword] = useState("");

// const handleSignup = async(e)=>{

// e.preventDefault();

// try{

// const userCredential =
// await createUserWithEmailAndPassword(auth,email,password);

// const user = userCredential.user;

// await setDoc(doc(db,"users",user.uid),{

// name:name,
// email:email,
// bloodType:"",
// phone:""

// });

// navigate("/profile");

// }catch(err){

// alert(err.message);

// }

// };

// return(

// <div className="auth-container">

// <h2>Create Account</h2>

// <form onSubmit={handleSignup}>

// <input
// placeholder="Full Name"
// onChange={(e)=>setName(e.target.value)}
// required
// />

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

// <button type="submit">
// Signup
// </button>

// </form>

// </div>

// );

// }

// export default Signup;

import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Signup() {

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <img src="/src/assets/logo.jpeg" className="auth-logo" />

        <h2>Create Account</h2>
        <p>Join the 3elagy healthcare system</p>

        <form onSubmit={handleSignup}>

          <input type="text" placeholder="Full Name" required />

          <input type="email" placeholder="Email address" required />

          <input type="password" placeholder="Password" required />

          <button type="submit">Sign Up</button>

        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
}