import React, { useState, useRef } from "react";
import LoginSignUpAnimation from "../LoginSignUpAnimation/LoginSignUpAnimation";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../axios";
import { encrypt } from "unixcrypt";
import { useStateValue } from "../../StateProvider";
toast.configure();

function ChangePassword() {
  const headers = {
    "Content-Type": "application/json",
  };
  const history = useHistory();
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [state, dispatch] = useStateValue();
  const contactInputRef = useRef();
  const authToken = state?.authToken;

  //Defining the notification
  const contactNumberLength = () => {
    toast.error("Contact Number Must be of length 10", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  //Defining the notification
  const passwordChanged = () => {
    toast.success("Password Changed Succesfully", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  const passwordError = () => {
    toast.error("invalid username password", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  const invalidPassword = () => {
    toast.info("Password must be of length 6", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  function onContactNumberChangeHandler(e) {
    setContactNumber(e.target.value);
    if (e.target.value.length === 10) {
      contactInputRef.current.style.border = "1px solid #BCBCBC";
    } else {
      contactInputRef.current.style.border = "2px solid red";
    }
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    if (contactNumber.length !== 10) {
      contactNumberLength();
    } else if (password.length < 6) {
      invalidPassword();
    } else {
      let hashedOldPassword = encrypt(password, "$5$rounds=10000$hrwashere");
      hashedOldPassword = hashedOldPassword.substring(
        26,
        hashedOldPassword.length
      );
      let hashedNewPassword = encrypt(newPassword, "$5$rounds=10000$hrwashere");
      hashedNewPassword = hashedNewPassword.substring(
        26,
        hashedNewPassword.length
      );
      Axios.post(
        "/v1/change_password",
        {
          contactNumber: contactNumber,
          password: hashedOldPassword,
          newpassword: hashedNewPassword,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
        .then((response) => {
          console.log(response.data.statuscode);
          passwordChanged();
          setFormSubmitted(true);
          setTimeout(() => {
            history.push("/login");
          }, 4000);
        })
        .catch((err) => {
          console.log(err.response);
          let statusCode = err.response.data.statuscode;
          if (statusCode === "SC602") {
            //Error in password update
            passwordError();
          }
        });
    }
  }
  return (
    <div className="forgot-password">
      <div className="forgot-password-section-1">
        <LoginSignUpAnimation isClicked={isFormSubmitted} />
      </div>
      <div className="forgot-password-section-2">
        <div className="forgot-password-section-2-content">
          <div className="forgot-password-section-2-leanbowl-icon-container">
            <object
              alt="learnbowl-icon"
              data="/images/learnbowl-blue.svg"
              type="image/svg+xml"
              className="signup-learnbowl-icon"
              aria-labelledby="learnbowl-icon"
            ></object>
          </div>
          <button
            className="forgot-password-page-back-btn"
            onClick={() => history.goBack()}
          >
            Back
          </button>
          {/* <h4 className="forgot-password-page-sign-up-text">
            Forgot Password!!!
          </h4> */}
          <p className="forgot-password-page-sign-up-text-sub-heading">
            Please Enter the Details
            <span style={{ fontWeight: "600" }}> given below</span>
          </p>
          <form className="forgot-password-form">
            {/* Contact Box */}
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
            {/* Password Box */}

            <div className="login-sign-up-input-box">
              <label className="login-sign-up-label">Old Password</label>
              <input
                className="login-sign-up-input"
                type={isPasswordVisible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
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
            </div>
            {/* Confirm Password Box */}
            <div className="login-sign-up-input-box">
              <label className="login-sign-up-label">New Password</label>
              <input
                className="login-sign-up-input"
                type={isConfirmPasswordVisible ? "text" : "password"}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
              ></input>
              {isConfirmPasswordVisible ? (
                <AiFillEye
                  className="eye-icon"
                  onClick={() =>
                    setConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                />
              ) : (
                <AiFillEyeInvisible
                  className="eye-icon"
                  onClick={() =>
                    setConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                />
              )}
              <button
                className="sign-up-btn"
                onClick={(e) => handleFormSubmit(e)}
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
