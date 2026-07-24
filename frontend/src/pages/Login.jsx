import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";

import "../styles/auth.css";

export default function Login() {

  const navigate = useNavigate();
  const [error, setError] =
  useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await login({
        email,
        password
      });

      localStorage.setItem(
        "token",
        data.token
      );
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/dashboard");

    } catch (error) {

      setError(error.message);

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-left">

          <div className="logo">
            <h1>TaskFlow</h1>
          </div>

          <h2>Welcome Back !</h2>

          <p>Please enter your details</p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <label>Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <div className="options">

              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <span>
                Forgot Password ?
              </span>

            </div>

            <button type="submit">
              Login →
            </button>

          </form>

          <div className="bottom-link">

            Don't have an account ?

            <Link to="/register">
              Sign Up
            </Link>

          </div>

        </div>

        <div className="auth-right">

          <div className="content">

            <h2>
              Seamless work experience
            </h2>

            <p>
              Everything you need in an
              easily customizable dashboard
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}