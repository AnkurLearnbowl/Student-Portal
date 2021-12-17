import React, { useRef, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./myprofile.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ImLocation } from "react-icons/im";
import { BiBookReader } from "react-icons/bi";
import { FiBookOpen } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { GrMail } from "react-icons/gr";
import { AiOutlineLock } from "react-icons/ai";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";
function MyProfile() {
  const statisticsCardRef = useRef(null);
  const history = useHistory();
  const videosCardRef = useRef(null);
  const studyCardRef = useRef(null);
  const [state, dispatch] = useStateValue();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const authToken = sessionStorage.getItem("auth_token");
  const userName = user?.name;
  const userEmail = user?.email;
  const userContactNumber = user?.contactNumber;
  const userLBRollNumber = user?.lbrollnumber;
  const userStandard = user?.standard;
  const userImageUrl = user?.imageUrl;
  const temp = userName?.split(" ");
  const firstName = temp?.[0];
  const lastName = temp?.[1];
  //console.log(userImageUrl);
  useEffect(() => {
    //If there is no value in state take it from sessionstorage
    if (user === null || user === undefined) {
      let user = JSON.parse(sessionStorage.getItem("user"));
      //If there is no value in sessionstorage then redirect to login
      if (user === null || user === undefined) {
        history.push("/login");
      }
      //Setting the value in state
    }
  }, []);
  function handleRightStatisticsClick() {
    //console.log(statisticsCardRef.current);
    statisticsCardRef.current.scrollLeft += 451;
  }
  function handleLeftStatisticsClick() {
    statisticsCardRef.current.scrollLeft -= 451;
  }
  function onClickChangeMobileNumber() {
    history.push("/changenumber");
  }
  function onClickChangeEmailId() {
    history.push("/changeemail");
  }
  function onClickChangePassword() {
    history.push("/changepassword");
  }
  return (
    <div className="my-profile-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="my-profile">
        <div className="my-profile-row-1">
          <div className="my-profile-row-1-col-1">
            <div className="my-profile-row-1-col-1-card">
              <div className="my-profile-row-1-col-1-card-avatar-container">
                {userImageUrl == null ? (
                  <BsFillPersonFill fontSize={"130px"} />
                ) : (
                  <img
                    src="/images/test-avatar.jpg"
                    alt="avatar"
                    className="my-profile-row-1-col-1-card-avatar"
                  ></img>
                )}
              </div>
              <div className="my-profile-row-1-col-1-card-student-info-container">
                <h5 className="my-profile-row-1-col-1-card-student-name">
                  <span style={{ fontWeight: "600" }}>{firstName}</span>{" "}
                  {lastName}
                </h5>
                <div className="my-profile-row-1-col-1-card-student-info">
                  <ImLocation className="my-profile-row-1-col-1-card-student-icon" />
                  <p className="my-profile-row-1-col-1-card-student-info-text">
                    Not Known
                  </p>
                </div>
                <div className="my-profile-row-1-col-1-card-student-info">
                  <BiBookReader className="my-profile-row-1-col-1-card-student-icon" />
                  <p className="my-profile-row-1-col-1-card-student-info-text">
                    2 Courses Enrolled
                  </p>
                </div>
              </div>
              <div className="my-profile-row-1-col-1-card-button-container">
                <button className="my-profile-row-1-col-1-card-button-1">
                  Change Avatar
                </button>
                {/* <button className="my-profile-row-1-col-1-card-button-2">
                  Upload Photo
                  <input
                    type="file"
                    className="my-profile-row-1-col-1-card-button-2"
                    style={{
                      opacity: "1",
                      position: "absolute",
                      top: "0px",
                      width: "230px",
                    }}
                  ></input>
                </button> */}
                <div className="file-input-box my-profile-row-1-col-1-card-button-2">
                  <input
                    type="file"
                    style={{ opacity: "0" }}
                    className="file-input"
                    id="photo-id"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  ></input>
                  <label
                    for="photo-id"
                    className="my-profile-row-1-col-1-card-button-2-label"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="my-profile-row-1-col-2">
            <div className="my-profile-row-1-col-2-card">
              <div className="my-profile-row-1-col-2-card-col-1">
                <h5 className="my-profile-row-1-col-2-card-heading">
                  Personal Details
                </h5>
                {/* Name Container */}
                <div className="my-profile-row-1-col-2-card-info-container">
                  <p className="my-profile-row-1-col-2-card-info-heading">
                    Full Name
                  </p>
                  <p className="my-profile-row-1-col-2-card-info">
                    {userName === undefined || userName === null
                      ? "Not Known"
                      : userName}
                  </p>
                </div>
                {/* School Container */}
                <div className="my-profile-row-1-col-2-card-info-container">
                  <p className="my-profile-row-1-col-2-card-info-heading">
                    School/Institution
                  </p>
                  <p className="my-profile-row-1-col-2-card-info">Not Known</p>
                </div>
                {/* Email-Id Container */}
                <div className="my-profile-row-1-col-2-card-info-container">
                  <p className="my-profile-row-1-col-2-card-info-heading">
                    Email - ID
                  </p>
                  <p className="my-profile-row-1-col-2-card-info">
                    {userEmail === undefined || userEmail === null
                      ? "Not Known"
                      : userEmail}
                  </p>
                </div>
              </div>
              <div className="my-profile-row-1-col-2-card-col-2">
                {/* Roll Number Container */}
                <div className="my-profile-row-1-col-2-card-info-container">
                  <p className="my-profile-row-1-col-2-card-info-heading">
                    Roll Number
                  </p>
                  <p className="my-profile-row-1-col-2-card-info">
                    {userLBRollNumber === undefined || userLBRollNumber === null
                      ? "Not Known"
                      : userLBRollNumber}
                  </p>
                </div>
                {/* Grade Container */}
                <div className="my-profile-row-1-col-2-card-info-container">
                  <p className="my-profile-row-1-col-2-card-info-heading">
                    Grade
                  </p>
                  <p className="my-profile-row-1-col-2-card-info">
                    {userStandard === undefined || userStandard === null
                      ? "Not Known"
                      : userStandard}
                  </p>
                </div>
                {/* Mobile Number Container */}
                <div className="my-profile-row-1-col-2-card-info-container">
                  <p className="my-profile-row-1-col-2-card-info-heading">
                    Mobile Number
                  </p>
                  <p className="my-profile-row-1-col-2-card-info">
                    {userContactNumber === undefined ||
                    userContactNumber === null
                      ? "Not Known"
                      : userContactNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-profile-row-2">
          <div className="my-profile-row-2-statistics-container">
            <h5 className="home-section-1-section-1-statistics-container-heading">
              Statistics
            </h5>
            <button
              className="home-section-1-section-1-statistics-container-left-btn"
              onClick={() => handleLeftStatisticsClick()}
            >
              <IoIosArrowBack className="statistics-card-arrow-icon" />
            </button>
            <button
              className="home-section-1-section-1-statistics-container-right-btn"
              onClick={() => handleRightStatisticsClick()}
            >
              <IoIosArrowForward className="statistics-card-arrow-icon" />
            </button>
            <div className="horizontal-slider">
              <div
                className="home-section-1-section-1-statistics-card-container"
                ref={statisticsCardRef}
              >
                {/* {batch.map((item) => {})} */}
                {/* French Card */}
                <div className="home-section-1-section-1-statistics-card">
                  <div className="home-section-1-section-1-statistics-card-icon-container">
                    <div style={{ width: "95px", height: "95px" }}>
                      <CircularProgressbarWithChildren value={23}>
                        {
                          <img
                            src="/images/test.svg"
                            alt="thumbnail"
                            width="90%"
                            height="80%"
                          ></img>
                        }
                      </CircularProgressbarWithChildren>
                    </div>
                    <p className="home-section-1-section-1-statistics-card-percentage">
                      45%
                    </p>
                  </div>
                  <div className="home-section-1-section-1-statistics-card-content-container">
                    <p className="home-section-1-section-1-statistics-card-content-heading">
                      French Language &nbsp;
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "300",
                          color: "#727272",
                        }}
                      >
                        (Intermidiate)
                      </span>
                    </p>
                    <div className="home-section-1-section-1-statistics-card-points-container">
                      <div className="home-section-1-section-1-statistics-card-points-row-1">
                        <div className="home-section-1-section-1-statistics-card-point">
                          <FiBookOpen className="home-section-1-section-1-statistics-card-point-icon" />
                          <p className="home-section-1-section-1-statistics-card-point-text">
                            50 Lessons
                          </p>
                        </div>
                        <div className="home-section-1-section-1-statistics-card-point">
                          <FiBookOpen className="home-section-1-section-1-statistics-card-point-icon" />
                          <p className="home-section-1-section-1-statistics-card-point-text">
                            30min/ Class
                          </p>
                        </div>
                      </div>
                      <div className="home-section-1-section-1-statistics-card-points-row-2">
                        <div className="home-section-1-section-1-statistics-card-point">
                          <FiBookOpen className="home-section-1-section-1-statistics-card-point-icon" />
                          <p className="home-section-1-section-1-statistics-card-point-text">
                            10 Assignments
                          </p>
                        </div>
                        <div className="home-section-1-section-1-statistics-card-point">
                          <FiBookOpen className="home-section-1-section-1-statistics-card-point-icon" />
                          <p className="home-section-1-section-1-statistics-card-point-text">
                            256 Students
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="home-section-1-section-1-statistics-card-btn-container">
                      <button className="home-section-1-section-1-statistics-card-upgrade-btn">
                        Upgrade
                      </button>
                      <button className="home-section-1-section-1-statistics-card-continue-btn">
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
                {/* Card End */}
              </div>
            </div>
          </div>
          <div className="my-profile-row-2-quick-actions-container">
            <h5 className="my-profile-row-2-quick-actions-heading">
              Quick Actions
            </h5>
            <div className="my-profile-row-2-quick-actions">
              <div
                className="my-profile-row-2-quick-actions-item"
                onClick={() => onClickChangeMobileNumber()}
              >
                <div className="my-profile-row-2-quick-actions-icon-container">
                  <IoCall className="my-profile-row-2-quick-actions-icon" />
                </div>
                <div className="my-profile-row-2-quick-actions-txt-container">
                  <p className="my-profile-row-2-quick-actions-txt">
                    Change Mobile Number
                  </p>
                </div>
                <div className="my-profile-row-2-quick-actions-icon-container-2">
                  <IoIosArrowForward className="my-profile-row-2-quick-actions-icon"></IoIosArrowForward>
                </div>
              </div>
              {/* <div
                className="my-profile-row-2-quick-actions-item"
                onClick={() => onClickChangeEmailId()}
              >
                <div className="my-profile-row-2-quick-actions-icon-container">
                  <GrMail className="my-profile-row-2-quick-actions-icon" />
                </div>
                <div className="my-profile-row-2-quick-actions-txt-container">
                  <p className="my-profile-row-2-quick-actions-txt">
                    Change Email - ID
                  </p>
                </div>
                <div className="my-profile-row-2-quick-actions-icon-container-2">
                  <IoIosArrowForward className="my-profile-row-2-quick-actions-icon"></IoIosArrowForward>
                </div>
              </div> */}
              <div
                className="my-profile-row-2-quick-actions-item"
                onClick={() => onClickChangePassword()}
              >
                <div className="my-profile-row-2-quick-actions-icon-container">
                  <AiOutlineLock className="my-profile-row-2-quick-actions-icon" />
                </div>
                <div className="my-profile-row-2-quick-actions-txt-container">
                  <p className="my-profile-row-2-quick-actions-txt">
                    Change Password
                  </p>
                </div>
                <div className="my-profile-row-2-quick-actions-icon-container-2">
                  <IoIosArrowForward className="my-profile-row-2-quick-actions-icon"></IoIosArrowForward>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
