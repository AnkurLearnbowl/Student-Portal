import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./myclasses.css";
import { GrDocumentPdf } from "react-icons/gr";
import { VscFilePdf } from "react-icons/vsc";
import { BsFillBellFill, BsFillPlayFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import Calendar from "./Calendar/Calendar";
function MyClasses() {
  const history = useHistory();
  if (
    sessionStorage.getItem("user") === null ||
    sessionStorage.getItem("user") === undefined
  ) {
    history.push("/login");
  }
  const user = JSON.parse(sessionStorage.getItem("user"));
  const course = JSON.parse(sessionStorage.getItem("course"));
  const courseOpted = sessionStorage.getItem("courseOpted");
  const courseDetails = JSON.parse(sessionStorage.getItem("courseDetails"));
  const frenchIntermidiateDetails =
    courseDetails?.[0]?.French?.[0]?.Intermediate?.[0];
  const frenchAdvancedDetails = courseDetails?.[0]?.French?.[1]?.Advanced?.[0];
  const vedicBasicDetails = courseDetails?.[1]?.Vedic?.[0]?.Basic?.[0];
  const vedicIntermediateDetails =
    courseDetails?.[1]?.Vedic?.[1]?.Intermediate?.[0];
  const vedicAdvancedDetails = courseDetails?.[1]?.Vedic?.[2]?.Advanced?.[0];
  let userName = user?.name;
  let LBRollNumber = user?.lbrollnumber;
  let userEmail = user?.email;

  return (
    <div className="myclasses-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="myclasses">
        <div className="myclasses-heading-container">
          <div className="live-class-recordings-heading-left">Course Opted</div>
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
              <div className="home-section-1-section-2-user-avatar-container">
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
        <div className="myclasses-courses-container">
          {course?.map((item) => {
            return (
              <div
                className={
                  item?.course === courseOpted
                    ? "myclasses-course-card selected"
                    : "myclasses-course-card"
                }
              >
                <div className="myclasses-course-card-row-1">
                  <img
                    src="/images/test.svg"
                    alt="tower"
                    className="myclasses-course-card-img"
                  ></img>
                  <p className="myclasses-course-card-course-name">
                    {/* If course is french */}
                    {item?.course === "French"
                      ? frenchIntermidiateDetails?.courseName
                      : ""}
                    {/* If course is vedic */}
                    {item?.course === "Vedic"
                      ? vedicIntermediateDetails?.courseName
                      : ""}
                  </p>
                </div>
                <div className="myclasses-course-card-row-2">
                  <p className="myclasses-course-card-course-type">
                    ({item.courseType})
                  </p>
                </div>
                <div className="myclasses-course-card-row-3">
                  <button className="myclasses-course-card-btn">
                    Schedule
                  </button>
                  <button
                    className="myclasses-course-card-btn"
                    onClick={() => history.push("/materials")}
                  >
                    Materials
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="myclasses-calendar-container">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default MyClasses;
