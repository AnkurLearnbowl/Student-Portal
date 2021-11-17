import React from "react";
import "./signup.css";
import { useState, useRef, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import LoginSignUpAnimation from "../LoginSignUpAnimation/LoginSignUpAnimation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import Axios from "../../axios";
import { encrypt } from "unixcrypt";

toast.configure();
function SignUp() {
  const headers = {
    "Content-Type": "application/json",
  };
  const history = useHistory();
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpText, setOtpText] = useState("Get Otp");
  const [isotpVerified, setOtpVerified] = useState(false);
  const [isNameValid, setNameValid] = useState(false);
  const [isContactNumberValild, setContactNumberValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [isOtpValid, setOtpValid] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const nameInputRef = useRef();
  const contactInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const getOtpRef = useRef();
  const verifyOtpRef = useRef();

  //Defining the notification
  const otpLength = () => {
    toast.info("Otp Must be of 4 numbers", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };

  const wrongPassword = () => {
    toast.error("Wrong Password", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };

  //Defining the notification
  const passwordInfo = () => {
    toast.info("Password length should be greater than 6", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };

  //Defining the notification
  const invalidContactNumber = () => {
    toast.info("Mobile Number Must be of length 10", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };

  //Defining the notification
  const invalidName = () => {
    toast.info(
      "Name Must be combination of only uppercase and lowecase letters",
      {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "dark",
        pauseOnHover: false,
      }
    );
  };
  //Defining the notification
  const invalidEmail = () => {
    toast.info("Please enter a valid Email", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  //Defining the notification
  const otpSent = () => {
    toast.success("Otp Sent", {
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
  const otpVerified = () => {
    toast.success("Otp Verified Succesfully", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  const otpNotVerified = () => {
    toast.error("Please Enter Correct Otp", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  const alreadyRegistered = () => {
    toast.info("Please choose a differnt email or contact number", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  const wait10Seconds = () => {
    toast.info("You must wait for 10 seconds before clicking resend otp", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  const somethingWentWrong = () => {
    toast.error("Something Went Wrong, Please try again later", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  useEffect(() => {
    //console.log(authToken);
    if (authToken !== "") {
      getOtp();
    }
  }, [authToken]);

  //Function for validating name
  function onNameChangeHandler(e) {
    setName(e.target.value);
    let pattern = /^[a-zA-Z ]+$/;
    let result = pattern.test(e.target.value);
    if (result === false) {
      nameInputRef.current.style.border = "2px solid red";
      setNameValid(false);
    } else {
      nameInputRef.current.style.border = "1px solid #BCBCBC";
      setNameValid(true);
    }
  }
  //Function for validating number
  function onContactNumberChangeHandler(e) {
    setContactNumber(e.target.value);
    if (e.target.value.length === 10) {
      contactInputRef.current.style.border = "1px solid #BCBCBC";
      setContactNumberValid(true);
      getOtpRef.current.style.color = "green";
    } else {
      contactInputRef.current.style.border = "2px solid red";
      setContactNumberValid(false);
      getOtpRef.current.style.color = "#727272";
    }
  }
  //Function for validating email
  function onEmailChangeHandler(e) {
    setEmail(e.target.value);
    let pattern = /\S+@\S+\.\S+/;
    let result = pattern.test(e.target.value);
    if (result === false) {
      emailInputRef.current.style.border = "2px solid red";
      setEmailValid(false);
    } else {
      emailInputRef.current.style.border = "1px solid #BCBCBC";
      setEmailValid(true);
    }
  }

  //Function for validating password
  function onPasswordChangeHandler(e) {
    setPassword(e.target.value);
    if (parseInt(e.target.value.length) >= 6) {
      setPasswordValid(true);
      if (e.target.value === confirmPassword) {
        confirmPasswordInputRef.current.style.border = "1px solid #BCBCBC";
        setConfirmPasswordValid(true);
      }
      passwordInputRef.current.style.border = "1px solid #BCBCBC";
    } else {
      setPasswordValid(false);
      passwordInputRef.current.style.border = "2px solid red";
    }
  }
  //Function for validating password
  function onConfirmPasswordChangeHandler(e) {
    setConfirmPassword(e.target.value);
    // console.log(password === e.target.value);
    if (password === e.target.value) {
      confirmPasswordInputRef.current.style.border = "1px solid #BCBCBC";
      if (e.target.value === password && password.length >= 6) {
        passwordInputRef.current.style.border = "1px solid #BCBCBC";
        setPasswordValid(true);
      }
      setConfirmPasswordValid(true);
    } else {
      confirmPasswordInputRef.current.style.border = "2px solid red";
      setConfirmPasswordValid(false);
    }
  }
  //Function for validating password
  function onOtpChangeHandler(e) {
    setOtp(e.target.value);
    //console.log(e.target.value.length);
    if (parseInt(e.target.value.length) === parseInt(4)) {
      verifyOtpRef.current.style.color = "green";
      setOtpValid(true);
      // setOtpva
    } else {
      verifyOtpRef.current.style.color = "#727272";
      setOtpValid(false);
    }
  }

  function onLoginClick() {
    history.push("/login");
  }
  async function createUser() {
    //Encrypting the Password
    // $5 for sha256 || $6 for sha 512
    //$hrwashere is the salt
    let hashedPassword = encrypt(password, "$5$rounds=10000$hrwashere");
    hashedPassword = hashedPassword.substring(26, hashedPassword.length);
    // console.log(hashedPassword);
    Axios.post(
      "/v1/signup",
      {
        user: {
          email: email,
          name: name,
          contactNumber: contactNumber,
          password: hashedPassword,
          password_confirmation: hashedPassword,
        },
      },
      {
        headers: headers,
      }
    )
      .then((response) => {
        let statusCode = response.data.statuscode;
        let auth_token = response.data.auth_token;
        let user = response.data.user;
        if (statusCode === "SC101") {
          //Success
          console.log("User Created");
          setAuthToken(auth_token);
        } else if (statusCode === "SC102") {
          //User Already exists please Log in
          alreadyRegistered();
        }
      })
      .catch((err) => {
        console.log(err.response);
        let statusCode = err.response.data.statuscode;
        if (statusCode === "SC102") {
          alreadyRegistered();
        } else if (statusCode === "SC103") {
          alreadyRegistered();
        } else if (statusCode === "SC104") {
          alreadyRegistered();
        }
      });
  }
  function getOtp() {
    //Function to display message that otp is sent
    if (authToken !== "") {
      console.log("inside get otp");
      if (isContactNumberValild) {
        Axios.get("/v1/verifyotp", {
          headers: {
            Authorization: authToken,
          },
        })
          .then((response) => {
            console.log(response);
            otpSent();
            setOtpText("Resend Otp");
            setContactNumberValid(false);
            getOtpRef.current.style.color = "#727272";
            setTimeout(() => {
              getOtpRef.current.style.color = "green";
              setContactNumberValid(true);
            }, 10000);
          })
          .catch((err) => {
            console.log(err.response);
            let statusCode = err.response.data.statuscode;
            if (statusCode === "SC202") {
              somethingWentWrong();
            }
          });
      }
    } else {
      checkForm();
    }
  }

  function verifyOtp() {
    if (otp.length === 4) {
      Axios.post(
        "/v1/verifyotp",
        {
          otp: otp,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      )
        .then((response) => {
          let tempStatusCode = response.data.statuscode;
          console.log(response.data);
          if (tempStatusCode === "SC301") {
            //Otp Verified
            setOtpVerified(true);
            otpVerified();
            console.log("Signed Up Succesfully");
            setFormSubmitted(true);
            setTimeout(() => {
              history.push("/login");
            }, 4000);
          } else if (tempStatusCode === "SC302") {
            //Wrong Otp Entered
            setOtpVerified(false);
            otpNotVerified();
          }
        })
        .catch((err) => {
          console.log(err.response);
          let statusCode = err.response.data.statuscode;
          if (statusCode === "SC302") {
            //Wrong Otp Entered
            setOtpVerified(false);
            otpNotVerified();
          }
        });
    } else {
      //Please Enter the correct Otp
      otpLength();
    }
  }
  function checkForm() {
    let isFormValid = false;

    // Here the logic to check otp would go
    if (
      isNameValid &&
      isContactNumberValild &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      password === confirmPassword
    ) {
      isFormValid = true;
    } else {
      if (!isPasswordValid) {
        passwordInfo();
      }
      if (!(password === confirmPassword)) {
        passwordsNotMatching();
      }
      if (!isContactNumberValild) {
        invalidContactNumber();
      }
      if (!isNameValid) {
        invalidName();
      }
      if (!isEmailValid) {
        invalidEmail();
      }
    }
    if (isFormValid) {
      console.log("Form Submitted");
      createUser();
    }
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    verifyOtp();
  }
  return (
    <div className="signup">
      <div className="signup-section-1">
        <LoginSignUpAnimation isClicked={isFormSubmitted} />
      </div>
      <div className="signup-section-2">
        {/* <button onClick={() => setIsClicked(true)}>Click Me</button> */}
        <div className="signup-section-2-content">
          <div className="signup-section-2-leanbowl-icon-container">
            <object
              alt="learnbowl-icon"
              data="/images/learnbowl-blue.svg"
              type="image/svg+xml"
              className="signup-learnbowl-icon"
              aria-labelledby="learnbowl-icon"
            ></object>
          </div>
          <button className="signup-page-back-btn">Back</button>
          <h4 className="signup-page-sign-up-text">Sign Up</h4>
          <p className="signup-page-sign-up-text-sub-heading">
            Let’s get you all set up for your personal{" "}
            <span style={{ fontWeight: "600" }}>Student Portal!</span>
          </p>
          <form className="signup-form">
            {/* Name Input */}
            <div className="login-sign-up-input-box">
              <label className="login-sign-up-label">Name</label>
              <input
                className="login-sign-up-input"
                type="text"
                ref={nameInputRef}
                onChange={(e) => onNameChangeHandler(e)}
                value={name}
                required
              ></input>
            </div>

            {/* Email Input */}
            <div className="login-sign-up-input-box">
              <label className="login-sign-up-label">Email-ID</label>
              <input
                className="login-sign-up-input"
                type="email"
                ref={emailInputRef}
                onChange={(e) => onEmailChangeHandler(e)}
                value={email}
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
            </div>

            {/* Confirm Password Input */}
            <div className="login-sign-up-input-box">
              <label className="login-sign-up-label">Confirm Password</label>
              <input
                className="login-sign-up-input"
                type={isConfirmPasswordVisible ? "text" : "password"}
                onChange={(e) => onConfirmPasswordChangeHandler(e)}
                ref={confirmPasswordInputRef}
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

            {/* Mobile Number Input */}
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
              <p
                className="login-sign-up-input-txt"
                onClick={
                  isContactNumberValild === true
                    ? () => getOtp()
                    : () => wait10Seconds()
                }
                ref={getOtpRef}
              >
                {otpText}
              </p>
            </div>

            {/* Enter Otp Input */}
            <div className="login-sign-up-input-box">
              <label className="login-sign-up-label">Enter OTP</label>
              <input
                className="login-sign-up-input"
                type="text"
                pattern="[0-9]*"
                onChange={(e) => onOtpChangeHandler(e)}
                value={otp}
                required
              ></input>
              <p
                className="login-sign-up-input-txt"
                onClick={() => verifyOtp()}
                ref={verifyOtpRef}
              >
                Verify
              </p>
            </div>
            <button
              className={
                otp.length === 4 ? "sign-up-btn" : "sign-up-btn-disabled"
              }
              onClick={(e) => handleFormSubmit(e)}
              disabled={otp.length === 4 ? false : true}
            >
              Sign - Up
            </button>
            <p className="signup-info-text">
              Already have an account?{" "}
              <span
                style={{
                  color: "#0064FF",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
                onClick={() => onLoginClick()}
              >
                Log In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
