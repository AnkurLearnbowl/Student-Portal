import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./myreport.css";
import { BsFillBellFill, BsFillPlayFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import Axios from "../../axios";
import Loader from "../Loader/Loader";
function MyReport() {
  const history = useHistory();
  if (
    sessionStorage.getItem("user") === null ||
    sessionStorage.getItem("user") === undefined
  ) {
    history.push("/login");
  }

  const user = JSON.parse(sessionStorage.getItem("user"));
  const authToken = sessionStorage.getItem("auth_token");
  const course = JSON.parse(sessionStorage.getItem("course"));
  const [courseOpted, setCourseOpted] = useState(
    sessionStorage.getItem("courseOpted")
  );
  const courseDetails = JSON.parse(sessionStorage.getItem("courseDetails"));
  const frenchIntermidiateDetails =
    courseDetails?.[0]?.French?.[0]?.Intermediate?.[0];
  const frenchAdvancedDetails = courseDetails?.[0]?.French?.[1]?.Advanced?.[0];
  const vedicBasicDetails = courseDetails?.[1]?.Vedic?.[0]?.Basic?.[0];
  const vedicIntermediateDetails =
    courseDetails?.[1]?.Vedic?.[1]?.Intermediate?.[0];
  const [teacherRemarks, setTeacherRemarks] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [areRemarksLoaded, setRemarksLoaded] = useState(false);
  let userName = user?.name;
  let LBRollNumber = user?.lbrollnumber;
  let userEmail = user?.email;

  useEffect(() => {
    getReport(course[0], 1);
  }, []);
  function getReport(item, time) {
    setRemarksLoaded(false);
    if (course.length === 0) {
      setRemarksLoaded(true);
    }
    // Here when the component would load for first time we would pass 1 in time
    // So that the api could be called, after that we would pass 0
    if (item?.course !== courseOpted || time === 1) {
      sessionStorage.setItem("courseOpted", item?.course);
      setCourseOpted(item?.course);
      //Make an api call
      Axios.get("/v1/get_remarks", {
        headers: {
          Authorization: authToken,
        },
        params: {
          LBRollNumber: item?.LBRollNumber,
        },
      })
        .then((response) => {
          console.log(response?.data);
          let statusCode = response?.data?.statuscode;
          if (statusCode === "SC201") {
            console.log(response?.data?.data);
            setTeacherRemarks(response?.data?.data);
            setRemarksLoaded(true);
          } else {
            console.log("Error");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }
  return (
    <div className="my-report-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="myreport">
        <div className="myclasses-heading-container">
          <div className="live-class-recordings-heading-left">
            View and Download Course-wise Report
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
              {/* <span className="home-section-1-section-2-line"></span> */}
              <div className="home-section-1-section-2-user-avatar-container">
                {/* <BsFillBellFill className="home-section-1-section-2-bell-icon" /> */}
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
        <div className="my-report-section-1">
          {course?.map((item) => {
            return (
              <div
                className=""
                className={
                  courseOpted === item?.course
                    ? "my-report-card-container active-card"
                    : "my-report-card-container"
                }
              >
                <div className="my-report-card-txt-container">
                  <img
                    src="/images/test.svg"
                    alt="eiffel"
                    className="my-report-tower-img"
                  ></img>
                  <span className="my-report-card-txt">
                    {/* If course is french */}
                    {item?.course === "French"
                      ? frenchIntermidiateDetails?.courseName
                      : ""}
                    {/* If course is vedic */}
                    {item?.course === "Vedic"
                      ? vedicIntermediateDetails?.courseName
                      : ""}
                  </span>
                </div>
                <span className="my-report-card-sub-txt">
                  ({item?.courseType})
                </span>
                <div className="my-report-card-buttons-container">
                  <button
                    className="my-report-card-button-1"
                    onClick={() => getReport(item, 0)}
                  >
                    View Report
                  </button>
                  {/* <button className="my-report-card-button-2">Download</button> */}
                </div>
              </div>
            );
          })}
        </div>
        <div className="my-report-section-2">
          <div className="my-report-section-2-column-1">
            <div className="my-report-section-2-column-1-heading">
              Teacher's Remarks
            </div>
            {areRemarksLoaded === true ? (
              teacherRemarks?.map((remark) => {
                return (
                  <div>
                    <div className="my-report-section-2-column-1-teacher-remark">
                      <div className="my-report-teacher-remark-date">
                        {remark?.date}
                      </div>
                      <div className="my-report-teacher-remark-container">
                        <div className="my-report-teacher-info">
                          <div>
                            <img
                              src="/images/test-avatar.jpg"
                              className="my-report-teacher-image"
                            ></img>
                          </div>
                          <div>
                            <div className="my-report-teacher-name">
                              {remark?.teachername}
                            </div>
                            <div className="my-report-teacher-class">
                              {remark?.teachercourse}
                            </div>
                          </div>
                        </div>
                        <div className="my-report-teacher-remark">
                          {remark?.teacherremark}
                        </div>
                      </div>
                    </div>
                    {/* This is seprator for remarks */}
                    <div className="remarks-seprator"></div>
                  </div>
                );
              })
            ) : (
              <Loader />
            )}
          </div>
          <div className="my-report-section-2-column-2">
            <div className="my-report-section-2-column-2-heading">
              Progress Bars
            </div>

            {/* Bar 1 */}
            <div className="my-report-section-2-bar-container">
              <div className="my-report-section-2-bar-heading">
                <span style={{ color: "black" }}>1.</span> Ability to maintain
                focus in class
              </div>
              <div className="my-report-section-2-bar">
                <object
                  type="image/svg+xml"
                  data="/images/progress-bar.svg"
                  className="my-report-section-2-bar-img"
                ></object>
              </div>
              <div className="my-report-section-2-progress-txt">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor
                sagittis, egestas condimentum varius.
              </div>
            </div>

            {/* Bar 2 */}
            <div className="my-report-section-2-bar-container">
              <div className="my-report-section-2-bar-heading">
                <span style={{ color: "black" }}>1.</span> Ability to maintain
                focus in class
              </div>
              <div className="my-report-section-2-bar">
                <object
                  type="image/svg+xml"
                  data="/images/progress-bar.svg"
                  className="my-report-section-2-bar-img"
                ></object>
              </div>
              <div className="my-report-section-2-progress-txt">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor
                sagittis, egestas condimentum varius.
              </div>
            </div>

            {/* Bar 3 */}
            <div className="my-report-section-2-bar-container">
              <div className="my-report-section-2-bar-heading">
                <span style={{ color: "black" }}>1.</span> Ability to maintain
                focus in class
              </div>
              <div className="my-report-section-2-bar">
                <object
                  type="image/svg+xml"
                  data="/images/progress-bar.svg"
                  className="my-report-section-2-bar-img"
                ></object>
              </div>
              <div className="my-report-section-2-progress-txt">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor
                sagittis, egestas condimentum varius.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyReport;
