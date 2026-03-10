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

      <img src="/logo.jpeg" alt="3elagy Logo" className="auth-logo" />

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