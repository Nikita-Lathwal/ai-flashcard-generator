import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Welcome Back 👋</h1>

        <p>Login to continue learning with FlashMind AI</p>

        <form>

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button>
            Login
          </button>

        </form>

        <span>
          Don't have an account?
          <Link to="/signup"> Signup</Link>
        </span>

      </div>

    </div>
  );
};

export default Login;