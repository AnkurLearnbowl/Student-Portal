import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./changenumber.css";
import { BsFillBellFill, BsFillPlayFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import Axios from "../../axios";
import { toast } from "react-toastify";
toast.configure();
function ChangeNumber() {
  const history = useHistory();
  const [otp, setOtp] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isContactNumberValild, setContactNumberValid] = useState(false);
  const [isOtpValid, setOtpValid] = useState(false);
  const [otpText, setOtpText] = useState("Send Otp");
  const [isOtpVerified, setOtpVerified] = useState(false);
  const contactNumberRef = useRef();
  const otpRef = useRef();
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
  let oldContactNumber = user?.contactNumber;

  const otpSent = () => {
    toast.success("Otp Sent", {
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
  const somethingWentWrong = () => {
    toast.error("Something Went Wrong", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  const otpLength = () => {
    toast.error("Otp must be of length 4", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };
  const numberLength = () => {
    toast.error("Number must be of length 10", {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: "dark",
      pauseOnHover: false,
    });
  };

  //Function for validating number
  function onContactNumberChangeHandler(e) {
    setContactNumber(e.target.value);
    if (e.target.value.length === 10) {
      contactNumberRef.current.style.color = "green";
      setContactNumberValid(true);
    } else {
      setContactNumberValid(false);
      contactNumberRef.current.style.color = "#727272";
    }
  }

  //Function for validating password
  function onOtpChangeHandler(e) {
    setOtp(e.target.value);
    //console.log(e.target.value.length);
    if (parseInt(e.target.value.length) === parseInt(4)) {
      setOtpValid(true);
      otpRef.current.style.color = "green";
      // setOtpva
    } else {
      setOtpValid(false);
      otpRef.current.style.color = "#727272";
    }
  }

  function getOtp() {
    //Function to display message that otp is sent
    if (isContactNumberValild) {
      Axios.get("/v1/change_number_record", {
        headers: {
          Authorization: authToken,
        },
        params: {
          oldContactNumber: oldContactNumber,
          newContactNumber: contactNumber,
        },
      })
        .then((response) => {
          let statuscode = response.data?.statuscode;
          //console.log(response);
          if (statuscode === "SC201") {
            //Otp Sent
            otpSent();
          }
        })
        .catch((err) => {
          console.log(err.message);
          somethingWentWrong();
        });
    } else {
      // checkForm();
      //console.log("Invalid Number");
      numberLength();
    }
  }

  function verifyOtp() {
    if (otp.length === 4 && isOtpVerified === false) {
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
          let tempStatusCode = response.data?.statuscode;
          console.log(response.data);
          if (tempStatusCode === "SC301") {
            //Otp Verified
            otpVerified();
            setOtpVerified(true);
            Axios.post(
              "/v1/change_number_record",
              {
                oldContactNumber: oldContactNumber,
                newContactNumber: contactNumber,
              },
              {
                headers: {
                  Authorization: authToken,
                },
              }
            )
              .then((response) => {
                let statuscode = response.data?.statuscode;
                console.log(response);
                if (statuscode === "SC201") {
                  //Updated Succesfully
                  history.push("/login");
                } else {
                  somethingWentWrong();
                }
              })
              .catch((err) => {
                console.log(err);
                somethingWentWrong();
              });
          } else if (tempStatusCode === "SC302") {
            //Wrong Otp Entered
            //setOtpVerified(false);
            otpNotVerified();
          }
        })
        .catch((err) => {
          console.log(err.response);
          let statusCode = err.response.data.statuscode;
          if (statusCode === "SC302") {
            //Wrong Otp Entered
            //setOtpVerified(false);
            otpNotVerified();
          }
        });
    } else {
      //Please Enter the correct Otp
      console.log("Otp Must be of length 4");
      otpLength();
    }
  }
  return (
    <div className="change-email-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="change-email">
        <div className="change-email-heading-container">
          <div className="live-class-recordings-heading-left">
            Change Number
          </div>
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
            <label className="change-email-input-box-label">
              New Mobile Number
            </label>
            <input
              className="change-email-input-box-input"
              type="text"
              onChange={(e) => onContactNumberChangeHandler(e)}
              value={contactNumber}
              required
            ></input>
            <p
              className="change-email-input-box-input-txt"
              onClick={() => getOtp()}
              ref={contactNumberRef}
            >
              {otpText}
            </p>
          </div>
          <div className="change-email-input-box">
            <label className="change-email-input-box-label">Enter Otp</label>
            <input
              className="change-email-input-box-input"
              value={otp}
              type="text"
              onChange={(e) => onOtpChangeHandler(e)}
              required
            ></input>
            {/* <p
              className="change-email-input-box-input-txt"
              onClick={() => verifyOtp()}
              ref={otpRef}
            >
              verify{" "}
            </p> */}
          </div>
          <button
            className="change-email-submit-button"
            onClick={() => verifyOtp()}
          >
            Verify and Change
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeNumber;
