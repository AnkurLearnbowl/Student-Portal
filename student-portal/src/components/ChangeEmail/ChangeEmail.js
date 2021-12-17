import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { BsFillBellFill, BsFillPlayFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import Axios from "../../axios";
function ChangeEmail() {
  const history = useHistory();
  const [otp, setOtp] = useState("");
  const [isOtpValid, setOtpValid] = useState(false);
  const [otpText, setOtpText] = useState("Send Otp");
  const [email, setEmail] = useState("");
  const [isEmailValid, setEmailValid] = useState(false);
  if (
    sessionStorage.getItem("user") === null ||
    sessionStorage.getItem("user") === undefined
  ) {
    history.push("/login");
  }
  const user = JSON.parse(sessionStorage.getItem("user"));
  const authToken = sessionStorage.getItem("auth_token");
  let userName = user?.name;
  let LBRollNumber = user?.lbrollnumber;
  let userEmail = user?.email;

  //Function for validating password
  function onOtpChangeHandler(e) {
    setOtp(e.target.value);
    //console.log(e.target.value.length);
    if (parseInt(e.target.value.length) === parseInt(4)) {
      setOtpValid(true);
      // setOtpva
    } else {
      setOtpValid(false);
    }
  }

  //Function for validating email
  function onEmailChangeHandler(e) {
    setEmail(e.target.value);
    let pattern = /\S+@\S+\.\S+/;
    let result = pattern.test(e.target.value);
    if (result === false) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  }

  function getOtp() {
    //Function to display message that otp is sent
    if (isEmailValid) {
      console.log("Send Otp");
    } else {
      // checkForm();
      console.log("Invalid Email");
    }
  }

  function verifyOtp() {
    if (otp.length === 4) {
      console.log("Verify Otp");
    } else {
      //Please Enter the correct Otp
      console.log("Otp Must be of length 4");
      //otpLength();
    }
  }
  return (
    <div className="change-email-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="change-email">
        <div className="change-email-heading-container">
          <div className="live-class-recordings-heading-left">Change Email</div>
          <div className="live-class-recordings-heading-right">
            <div className="live-class-recordings-user-info-container">
              <div className="home-section-1-section-2-user-email-roll-no-container">
                <p className="home-section-1-section-2-user-info">
                  {userEmail === null || userEmail === undefined
                    ? "Not Known"
                    : userEmail}
                </p>
                <p className="home-section-1-section-2-user-info">
                  Roll Number:{" "}
                  {LBRollNumber === null || LBRollNumber === undefined
                    ? "Not Known"
                    : LBRollNumber}
                </p>
              </div>
              <span className="home-section-1-section-2-line"></span>
              <div className="home-section-1-section-2-user-avatar-container">
                <BsFillBellFill className="home-section-1-section-2-bell-icon" />
                <div className="home-section-1-section-2-user-avatar">
                  <img
                    src="/images/test-avatar.jpg"
                    className="home-section-1-section-2-user-img"
                    alt="avatar-image"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="change-email-content">
          <div className="change-email-content-user-avatar">
            <img
              src="/images/test-avatar.jpg"
              className="change-email-content-user-avatar-img"
              alt="avatar-image"
            ></img>
          </div>
          <div className="change-email-content-text">
            Please Enter the details
          </div>
          <div className="change-email-input-box">
            <label className="change-email-input-box-label">New Email</label>
            <input
              className="change-email-input-box-input"
              type="text"
              onChange={(e) => onEmailChangeHandler(e)}
              value={email}
            ></input>
            <p
              className="change-email-input-box-input-txt"
              onClick={() => getOtp()}
            >
              {otpText}
            </p>
          </div>
          <div className="change-email-input-box">
            <label className="change-email-input-box-label">
              Enter Verification Code
            </label>
            <input
              className="change-email-input-box-input"
              value={otp}
              type="text"
              onChange={(e) => onOtpChangeHandler(e)}
            ></input>
            <p
              className="change-email-input-box-input-txt"
              onClick={() => verifyOtp()}
            >
              verify{" "}
            </p>
          </div>
          <button className="change-email-submit-button">Change no.</button>
        </div>
      </div>
    </div>
  );
}

export default ChangeEmail;
