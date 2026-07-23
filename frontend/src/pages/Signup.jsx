import { Link } from "react-router-dom";

const Signup = () => {
  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1>Create Account</h1>

        <p>Start learning smarter with AI</p>

        <form>

          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <input
            type="password"
            placeholder="Confirm Password"
          />

          <button>
            Signup
          </button>

        </form>

        <span>

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </span>

      </div>

    </div>

  );
};

export default Signup;