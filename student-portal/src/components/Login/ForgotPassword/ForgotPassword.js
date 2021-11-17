import React, { useState, useRef } from "react";
import LoginSignUpAnimation from "../../LoginSignUpAnimation/LoginSignUpAnimation";
import "./forgotpassword.css";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../../axios";
import { encrypt } from "unixcrypt";
toast.configure();

function ForgotPassword() {
  const headers = {
    "Content-Type": "application/json",
  };
  const history = useHistory();
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [contactNumberVisibility, setContactNumberVisibility] = useState(true);
  const [otpVisibility, setOtpVisibility] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isContactNumberValild, setContactNumberValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpValid, setOtpValid] = useState(false);
  const [btnText, setBtnText] = useState("Send Otp");
  const contactInputRef = useRef();
  // const passwordInputRef = useRef();

  //Defining the notification
  const otpSent = () => {
    toast.success("Otp Sent Succesfully", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };

  //Defining the notification
  const somethingWrong = () => {
    toast.error("Something went wrong, please try again", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  const passwordsNotMatching = () => {
    toast.info("Password and ConfirmPassword must be same", {
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
  //Defining the notification
  const notFound = () => {
    toast.error("Number not found, Please Sign Up", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };

  //Defining the notification
  const contactNumberLength = () => {
    toast.error("Contact Number Must be of length 10", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  //Defining the notification
  const wrongOtp = () => {
    toast.error("Incorrect otp", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  //Defining the notification
  const otpNotValid = () => {
    toast.error("Otp must be of length 4", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  //Defining the notification
  const otpVerificationNotDone = () => {
    toast.error("Otp Verification Not Done", {
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
  function onOtpChangeHandler(e) {
    setOtp(e.target.value);
    if (e.target.value.length === 4) {
      setOtpValid(true);
    } else {
      setOtpValid(false);
    }
  }

  //This function would send otp
  function sendOtp() {
    //Function to display message that otp is sent
    // console.log("inside get otp");
    Axios.post(
      "/v1/forgot_password_otp",
      {
        contactNumber: contactNumber,
      },
      {
        headers: headers,
      }
    )
      .then((response) => {
        // console.log(response.data.statuscode);
        if (response.data.statuscode === "SC701") {
          otpSent();
          setOtpVisibility(true);
          setBtnText("Verify Otp");
        }
      })
      .catch((err) => {
        console.log(err.response);
        let statusCode = err.response.data.statuscode;
        if (statusCode === "SC705") {
          //The user is not registerd
          notFound();
        }
        if (statusCode === "SC702") {
          somethingWrong();
        }
      });
  }

  function verifyOtp() {
    //Function to display message that otp is sent
    //console.log("inside verify otp");
    Axios.post(
      "/v1/forgot_password_otpverify",
      {
        contactNumber: contactNumber,
        otp: otp,
      },
      {
        headers: headers,
      }
    )
      .then((response) => {
        console.log(response.data.statuscode);
        if (response.data.statuscode === "SC703") {
          setContactNumberVisibility(false);
          setOtpVisibility(false);
          setPasswordVisibility(true);
          setConfirmPasswordVisibility(true);
          setBtnText("Change Password");
        }
      })
      .catch((err) => {
        console.log(err.response);
        let statusCode = err.response.data.statuscode;
        if (statusCode === "SC704") {
          wrongOtp();
        }
      });
  }

  function changePassword() {
    //Function to display message that otp is sent
    console.log("inside change Password");
    if (confirmPassword === password && password.length > 5) {
      let hashedPassword = encrypt(password, "$5$rounds=10000$hrwashere");
      hashedPassword = hashedPassword.substring(26, hashedPassword.length);
      console.log(hashedPassword);
      Axios.post(
        "/v1/forgot_password_update",
        {
          contactNumber: contactNumber,
          newpassword: hashedPassword,
        },
        {
          headers: headers,
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
          if (statusCode === "SC707") {
            //Error in password update
            somethingWrong();
          }
          if (statusCode === "SC708") {
            //Otp verification not done
            otpVerificationNotDone();
          }
        });
    } else if (confirmPassword !== password) {
      passwordsNotMatching();
    } else {
      //Length is less than 6
      invalidPassword();
    }
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    if (btnText === "Send Otp") {
      //Sending Otp
      if (contactNumber.length === 10) {
        //If contact number is correct we send otp
        sendOtp();
      } else {
        //else we show error message to user
        contactNumberLength();
      }
    } else if (btnText === "Verify Otp") {
      //verify
      if (otp.length === 4) {
        //If otp length is 4 we try to verify it
        verifyOtp();
      } else {
        //if not we show error to user
        otpNotValid();
      }
    } else if (btnText === "Change Password") {
      //change password
      changePassword();
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
          <h4 className="forgot-password-page-sign-up-text">
            Forgot Password!!!
          </h4>
          <p className="forgot-password-page-sign-up-text-sub-heading">
            Don't worry we've
            <span style={{ fontWeight: "600" }}> got you covered</span>
          </p>
          <form className="forgot-password-form">
            {/* Contact Box */}
            <div
              className="login-sign-up-input-box"
              style={{ display: contactNumberVisibility ? "inherit" : "none" }}
            >
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
            {/* Otp Box */}
            {/* It would be visible after otp is sent to mobile number */}
            <div
              className="login-sign-up-input-box"
              style={{ display: otpVisibility ? "inherit" : "none" }}
            >
              <label className="login-sign-up-label">Enter otp</label>
              <input
                className="login-sign-up-input"
                type="text"
                pattern="[0-9]*"
                onChange={(e) => onOtpChangeHandler(e)}
                value={otp}
                required
              ></input>
            </div>
            {/* Password Box */}
            {/* It would be visible after otp is verified */}
            <div
              className="login-sign-up-input-box"
              style={{ display: passwordVisibility ? "inherit" : "none" }}
            >
              <label className="login-sign-up-label">Password</label>
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
            <div
              className="login-sign-up-input-box"
              style={{
                display: confirmPasswordVisibility ? "inherit" : "none",
              }}
            >
              <label className="login-sign-up-label">Confirm Password</label>
              <input
                className="login-sign-up-input"
                type={isConfirmPasswordVisible ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
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
            </div>
            <button
              className="sign-up-btn"
              onClick={(e) => handleFormSubmit(e)}
            >
              {btnText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
