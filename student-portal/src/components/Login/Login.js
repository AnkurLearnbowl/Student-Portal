import React, { useState, useRef } from "react";
import LoginSignUpAnimation from "../LoginSignUpAnimation/LoginSignUpAnimation";
import "./login.css";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../axios";
import { encrypt } from "unixcrypt";
import { useStateValue } from "../../StateProvider";
toast.configure();
function Login() {
  const [state, dispatch] = useStateValue();
  const headers = {
    "Content-Type": "application/json",
  };
  const history = useHistory();
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [isContactNumberValild, setContactNumberValid] = useState(false);
  const [password, setPassword] = useState("");
  const contactInputRef = useRef();
  const passwordInputRef = useRef();

  //Defining the notification
  const passwordInfo = () => {
    toast.info("Password must be of length 6", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  //Defining the notification
  const wrongPassword = () => {
    toast.error("Wrong Username or Password", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };

  //Defining the notification
  const mobileNumberLength = () => {
    toast.info("Number Must be of length 10", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  //Defining the notification
  const signUpFirst = () => {
    toast.error("You are not registered, Please Sign Up First", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };

  //Function for validating Password
  function onPasswordChangeHandler(e) {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      passwordInputRef.current.style.border = "2px solid red";
      setPasswordValid(false);
    } else {
      passwordInputRef.current.style.border = "1px solid #BCBCBC";
      setPasswordValid(true);
    }
  }
  //Function for validating number
  function onContactNumberChangeHandler(e) {
    setContactNumber(e.target.value);
    if (e.target.value.length === 10) {
      contactInputRef.current.style.border = "1px solid #BCBCBC";
      setContactNumberValid(true);
    } else {
      contactInputRef.current.style.border = "2px solid red";
      setContactNumberValid(false);
    }
  }
  function onClickSignUp() {
    history.push("/signup");
  }
  function onClickForgotPassword() {
    history.push("/forgotpassword");
  }
  function handleFormSubmit(e) {
    e.preventDefault();

    // console.log("asda");
    if (isPasswordValid && isContactNumberValild) {
      let hashedPassword = encrypt(password, "$5$rounds=10000$hrwashere");
      hashedPassword = hashedPassword.substring(26, hashedPassword.length);
      //console.log(hashedPassword);
      Axios.post(
        "/v1/auth_user",
        {
          contactNumber: contactNumber,
          password: hashedPassword,
        },
        {
          headers: headers,
        }
      )
        .then((response) => {
          console.log(response);
          let statusCode = response.data.statuscode;
          let user = response.data?.user;
          let batch = response.data?.batch;
          let isUserRegistered = response.data?.isRegisteredUser;
          let authToken = response.data?.auth_token;

          //Setting the information in the app so that it could be accesed universally
          dispatch({
            type: "SET_USER",
            isUserLoggedIn: true,
            user: user,
            batch: batch,
            isUserRegistered: isUserRegistered,
            authToken: authToken,
          });

          //Setting in session
          sessionStorage.setItem("user", JSON.stringify(user));
          sessionStorage.setItem("batch", JSON.stringify(batch));
          sessionStorage.setItem("auth_token", authToken);
          sessionStorage.setItem("isUserLoggedIn", true);
          // localStorage.setItem("user", JSON.stringify(user));
          if (statusCode === "SC403") {
            //otp Not verified so sign in first
            signUpFirst();
          } else if (statusCode === "SC404") {
            //Invalid Username or password
            wrongPassword();
          } else if (statusCode === "SC401") {
            //Login SUCCESS and Batch is assigned
            setFormSubmitted(true);
            setTimeout(() => {
              history.push("/home");
            }, 4000);
          } else if (statusCode === "SC402") {
            //Login SUCCESS but Batch is not assigned
            setFormSubmitted(true);
            setTimeout(() => {
              history.push("/home");
            }, 4000);
          } else if (statusCode === "SC405") {
            //Login SUCCESS but no data in registration details
            setFormSubmitted(true);
            setTimeout(() => {
              history.push("/home");
            }, 4000);
          } else if (statusCode === "SC406") {
            //Login SUCCESS and workshopPayment paid
            setFormSubmitted(true);
            setTimeout(() => {
              history.push("/home");
            }, 4000);
          }
        })
        .catch((err) => {
          console.log(err.response);
          let statusCode = err.response.data.statuscode;
          if (statusCode === "SC403") {
          }
          if (statusCode === "SC404") {
            //Invalid Username or password
            wrongPassword();
          }
        });
    } else {
      if (!isPasswordValid) {
        passwordInfo();
      }
      if (!isContactNumberValild) {
        mobileNumberLength();
      }
    }
  }
  return (
    <div className="login">
      <div className="login-section-1">
        <LoginSignUpAnimation isClicked={isFormSubmitted} />
      </div>
      <div className="login-section-2">
        <div className="login-section-2-content">
          <div className="login-section-2-leanbowl-icon-container">
            <object
              alt="learnbowl-icon"
              data="/images/learnbowl-blue.svg"
              type="image/svg+xml"
              className="signup-learnbowl-icon"
              aria-labelledby="learnbowl-icon"
            ></object>
          </div>
          <button
            className="login-page-back-btn"
            onClick={() => history.goBack()}
          >
            Back
          </button>
          <h4 className="login-page-sign-up-text">Log In</h4>
          <p className="login-page-sign-up-text-sub-heading">
            Great to see you again! Hop on the adventure and
            <span style={{ fontWeight: "600" }}> continue learning</span>
          </p>
          <form className="login-form">
            <div className="login-sign-up-input-box">
              <label className="login-sign-up-label">Mobile Number</label>
              <input
                className="login-sign-up-input"
                type="text"
                pattern="[0-9]*"
                onChange={(e) => onContactNumberChangeHandler(e)}
                ref={contactInputRef}
                value={contactNumber}
                required
              ></input>
            </div>

            {/* Password Input */}
            <div className="login-sign-up-input-box">
              <label className="login-sign-up-label">Password</label>
              <input
                className="login-sign-up-input"
                type={isPasswordVisible ? "text" : "password"}
                onChange={(e) => onPasswordChangeHandler(e)}
                ref={passwordInputRef}
                value={password}
                required
              ></input>
              {isPasswordVisible ? (
                <AiFillEye
                  className="eye-icon"
                  onClick={() => setPasswordVisible(!isPasswordVisible)}
                />
              ) : (
                <AiFillEyeInvisible
                  className="eye-icon"
                  onClick={() => setPasswordVisible(!isPasswordVisible)}
                />
              )}
              <button
                className="sign-up-btn"
                onClick={(e) => handleFormSubmit(e)}
              >
                Log - In
              </button>
              <p className="login-info-text">
                Forgot Password?{" "}
                <span
                  style={{
                    color: "#0064FF",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  onClick={() => onClickForgotPassword()}
                >
                  Click Here
                </span>
              </p>
              <p className="login-info-text">
                Don't have an account?{" "}
                <span
                  style={{
                    color: "#0064FF",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  onClick={() => onClickSignUp()}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
