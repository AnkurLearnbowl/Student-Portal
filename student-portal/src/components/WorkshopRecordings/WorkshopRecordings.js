import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { BsFillBellFill, BsFillPlayFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import Videos from "../Videos/Videos";

function WorkshopRecordings() {
  const history = useHistory();
  if (
    sessionStorage.getItem("user") === null ||
    sessionStorage.getItem("user") === undefined
  ) {
    history.push("/login");
  }
  const user = JSON.parse(sessionStorage.getItem("user"));
  const workshopVideos = JSON.parse(sessionStorage.getItem("workshopLectures"));
  const courseOpted = sessionStorage.getItem("courseOpted");
  const workshopFrenchVideos = workshopVideos[0].French;
  const workshopVedicVideos = workshopVideos[1].Vedic;
  //   console.log(regularFrenchVideos);
  let userName = user?.name;
  let LBRollNumber = user?.lbrollnumber;
  let userEmail = user?.email;

  let vidoesToShow = [];
  // If another course is added please add another if condition
  if (courseOpted === "French") {
    vidoesToShow = workshopFrenchVideos;
  } else {
    vidoesToShow = workshopVedicVideos;
  }
  return (
    <div className="live-class-recordings-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="live-class-recordings">
        <div className="live-class-recordings-heading-container">
          <div className="live-class-recordings-heading-left">
            Workshop Recordings
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
        <div className="live-class-recordings-videos-container">
          {vidoesToShow.map((item) => {
            return <Videos url={item?.videoUrl} id={item?.videoId} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default WorkshopRecordings;
