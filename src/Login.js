import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { firebaseApp } from "./firebase";

const auth = getAuth(firebaseApp);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log(auth);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src="./123.png" />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" onClick={signIn} className="login__signinButton">
            Sign In
          </button>
        </form>

        <p>By signing-in you agree to Craftsmanship Baltic's Conditions of Use & Sale. Please see our Privacy Notice.</p>

        <button onClick={register} className="login__registerButton">
          Create your Craftsmanship Account
        </button>
      </div>
    </div>
  );
}

export default Login;
