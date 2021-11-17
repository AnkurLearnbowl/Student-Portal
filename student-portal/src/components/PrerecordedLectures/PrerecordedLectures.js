import React from "react";
import Sidebar from "../Sidebar/Sidebar";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { BsFillBellFill, BsFillPlayFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";

function PrerecordedLectures() {
  const history = useHistory();
  if (
    sessionStorage.getItem("user") === null ||
    sessionStorage.getItem("user") === undefined
  ) {
    history.push("/login");
  }
  const user = JSON.parse(sessionStorage.getItem("user"));
  const preRecordedVideos = JSON.parse(
    sessionStorage.getItem("preRecordedLectures")
  );
  //console.log(preRecordedVideos);
  const preRecordedFrenchVideos = preRecordedVideos[0].French;
  const preRecordedVedicVideos = preRecordedVideos[1].Vedic;
  //   console.log(preRecordedFrenchVideos);
  let userName = user?.name;
  let LBRollNumber = user?.lbrollnumber;
  let userEmail = user?.email;

  let videos = [{}, {}, {}, {}, {}, {}];
  return (
    <div className="live-class-recordings-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="live-class-recordings">
        <div className="live-class-recordings-heading-container">
          <div className="live-class-recordings-heading-left">
            Pre Recorded Lectures
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
          {videos.map((item) => {
            return (
              <a href="/" target="_blank">
                <div className="live-class-recordings-video">
                  <div className="home-section-1-section-2-video-icon-container">
                    <CircularProgressbarWithChildren
                      value={23}
                      styles={buildStyles({
                        textColor: "white",
                        pathColor: "white",
                        textSize: "200px",
                      })}
                    >
                      {
                        <BsFillPlayFill
                          style={{
                            color: "var(--primary-color)",
                            width: 25,
                            height: 25,
                            backgroundColor: "white",
                            borderRadius: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      }
                    </CircularProgressbarWithChildren>
                  </div>
                  <div className="home-section-1-section-2-video-heading">
                    <p className="home-section-1-section-2-video-sub-heading">
                      French-Lesson-31
                    </p>
                    <p className="home-section-1-section-2-video-sub-sub-heading">
                      35 mins left
                    </p>
                  </div>
                  <img
                    src="/images/videoTestThumbnail.png"
                    alt="thumbail"
                    className="home-section-1-section-2-video-thumbnail"
                  ></img>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PrerecordedLectures;
