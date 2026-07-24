import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

import "../styles/auth.css";

export default function Register() {

  const navigate = useNavigate();

  const [error, setError] =
  useState("");

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await register({
        username,
        email,
        password
      });

      navigate("/login");

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

          <h2>Create Account</h2>

          <p>Create your account</p>

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <label>Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

            <label>Email</label>

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

            <button type="submit">
              Register →
            </button>

          </form>

          <div className="bottom-link">

            Already have an account ?

            <Link to="/login">
              Login
            </Link>

          </div>

        </div>

        <div className="auth-right">

          <div className="content">

            <h2>
              Organize your work
            </h2>

            <p>
              Manage tasks, boards and projects
              easily.
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}