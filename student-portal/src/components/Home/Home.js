import React, { useRef, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./home.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FiBookOpen } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  BsFillBellFill,
  BsFillPlayFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";
import Axios from "../../axios";
import Videos from "../Videos/Videos";
import Loader from "../Loader/Loader";
function Home() {
  let [state, dispatch] = useStateValue();
  const history = useHistory();
  let user = JSON.parse(sessionStorage.getItem("user"));
  let authToken = sessionStorage.getItem("auth_token");
  let userName = user?.name;
  let temp = userName?.split(" ");
  let firstName = temp?.[0];
  let userEmail = user?.email;
  let userLBRollNumber = user?.lbrollnumber;
  let userContactNumber = user?.contactNumber;
  let userImageUrl = user?.imageUrl;
  let tempCourseDetails = [];
  // let lastName = temp[1];
  const totalFrenchClasses = 50;
  const totalVedicClasses = 60;
  const [course, setCourse] = useState([]);
  const [recentVideos, setRecentVideos] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [frenchAttendence, setFrenchAttendence] = useState("");
  const [vedicAttendence, setVedicAttendence] = useState("");
  const [frenchIntermidiateDetails, setFrenchIntermediateDetails] = useState(
    []
  );
  const [frenchAdvancedDetails, setFrenchAdvancedDetails] = useState([]);
  const [vedicBasicDetails, setVedicBasicDetails] = useState([]);
  const [vedicIntermediateDetails, setVedicIntermediateDetails] = useState([]);
  const [vedicAdvancedDetails, setVedicAdvancedDetails] = useState([]);
  const [isLoaderVisible, setLoaderVisibility] = useState(true);
  const [isGetCoursesComplete, setGetCoursesComplete] = useState(false);
  const [isGetCoursesDetailsComplete, setGetCoursesDetailsComplete] =
    useState(false);
  const [isGetRecentVideosComplete, setGetRecentVideosComplete] =
    useState(false);
  const [isGetRecordedVideosComplete, setGetRecordedVideosComplete] =
    useState(false);
  const statisticsCardRef = useRef();
  const videosCardRef = useRef();
  const studyCardRef = useRef();

  //By Default first course would be selected
  sessionStorage.setItem("courseOpted", course?.[0]?.course);

  useEffect(() => {
    //If there is no value in sessionstorage then redirect to login
    if (user === null || user === undefined) {
      history.push("/login");
    }
    let courseDetails = JSON.parse(sessionStorage.getItem("courseDetails"));
    setCourse(JSON.parse(sessionStorage.getItem("course")));
    setFrenchAttendence(sessionStorage.getItem("FrenchAttendence"));
    setVedicAttendence(sessionStorage.getItem("VedicAttendence"));
    setFrenchIntermediateDetails(
      courseDetails?.[0]?.French?.[0]?.Intermediate?.[0]
    );
    setFrenchAdvancedDetails(courseDetails?.[0]?.French?.[1]?.Advanced?.[0]);
    setVedicBasicDetails(courseDetails?.[1]?.Vedic?.[0]?.Basic?.[0]);
    setVedicIntermediateDetails(
      courseDetails?.[1]?.Vedic?.[1]?.Intermediate?.[0]
    );
    setVedicAdvancedDetails(courseDetails?.[1]?.Vedic?.[2]?.Advanced?.[0]);

    setGetCoursesComplete(true);
    setGetCoursesDetailsComplete(true);
    setGetRecordedVideosComplete(true);
  }, []);

  // Here we are getting the recent videos which user has watched
  useEffect(() => {
    //console.log(recentVideos);
    Axios.get("/v1/get_recent_videos", {
      params: {
        contactNumber: userContactNumber,
      },
      headers: {
        Authorization: authToken,
      },
    })
      .then((response) => {
        setRecentVideos(response.data?.data);
        setGetRecentVideosComplete(true);
        //console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  // Here we are getting the course in which user is registered
  useEffect(() => {
    let tempCourse = JSON.parse(sessionStorage.getItem("course"));
    if (tempCourse == undefined && userContactNumber?.length === 10) {
      Axios.get("/v1/get_courses", {
        params: {
          contactNumber: userContactNumber,
        },
        headers: {
          Authorization: authToken,
        },
      })
        .then((response) => {
          let courses = response.data?.data;
          setCourse(response.data?.data);
          setGetCoursesComplete(true);

          //Here Storing the data for further use
          sessionStorage.setItem(
            "course",
            JSON.stringify(response?.data?.data)
          );
          sessionStorage.setItem(
            "courseOpted",
            response?.data?.data?.[0]?.course
          );

          //Making api call for getting details about the course
          if (response.data.data != null) {
            Axios.get("/v1/get_courses_details", {
              headers: {
                Authorization: authToken,
              },
            })
              .then(async (response) => {
                if (response?.data.statuscode === "SC200") {
                  console.log(
                    response.data.data?.[0]?.French?.[0]?.Intermediate?.[0]
                  );
                  //Setting data to sessionstorage for further use
                  sessionStorage.setItem(
                    "courseDetails",
                    JSON.stringify(response.data.data)
                  );
                  setGetCoursesDetailsComplete(true);
                  setFrenchIntermediateDetails(
                    response.data.data?.[0]?.French?.[0]?.Intermediate?.[0]
                  );
                  setFrenchAdvancedDetails(
                    response.data.data?.[0]?.French?.[1]?.Advanced?.[0]
                  );
                  setVedicBasicDetails(
                    response.data.data?.[1]?.Vedic?.[0]?.Basic?.[0]
                  );
                  setVedicIntermediateDetails(
                    response.data.data?.[1]?.Vedic?.[1]?.Intermediate?.[0]
                  );
                  setVedicAdvancedDetails(
                    response.data.data?.[1]?.Vedic?.[2]?.Advanced?.[0]
                  );
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }

          //Making Api call for getting details about attendence
          courses?.map((course, index) => {
            Axios.get("/v1/get_attendence", {
              params: {
                LBRollNumber: course?.LBRollNumber,
              },
              headers: {
                Authorization: authToken,
              },
            })
              .then((response) => {
                console.log(response.data.data?.[0]?.count);
                // console.log(course);
                if (course?.course === "French") {
                  let tempPercentage =
                    (response.data.data?.[0]?.count / totalFrenchClasses) * 100;
                  setFrenchAttendence(tempPercentage);
                  sessionStorage.setItem("FrenchAttendence", tempPercentage);
                } else if (course?.course === "Vedic") {
                  let tempPercentage =
                    (response.data.data?.[0]?.count / totalVedicClasses) * 100;
                  setVedicAttendence(tempPercentage);
                  sessionStorage.setItem("VedicAttendence", tempPercentage);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  //This is only for debugging purpose
  // useEffect(() => {
  //   console.log(frenchIntermidiateDetails);
  // }, [frenchIntermidiateDetails]);

  // useEffect(() => {
  //   console.log(frenchAdvancedDetails);
  // }, [frenchAdvancedDetails]);

  // useEffect(() => {
  //   console.log(vedicBasicDetails);
  // }, [vedicBasicDetails]);

  // useEffect(() => {
  //   console.log(vedicIntermediateDetails);
  // }, [vedicIntermediateDetails]);

  // useEffect(() => {
  //   console.log(vedicAdvancedDetails);
  // }, [vedicAdvancedDetails]);

  useEffect(() => {
    //If we have the details already
    //we would not fetch them again
    let tempVideos = JSON.parse(sessionStorage.getItem("workshopLectures"));
    if (tempVideos == undefined) {
      Axios.get("/v1/getrecordedvideos", {
        headers: {
          Authorization: authToken,
        },
      })
        .then((response) => {
          setGetRecordedVideosComplete(true);
          let statusCode = response.data.statuscode;
          //console.log(response);
          if (statusCode === "SC501") {
            let tempCourse = response.data.course;
            let tempPreRecordedLectures = response.data.data.preRecorded;
            let tempRegularLectures = response.data.data.regular;
            let tempWorkshopLectures = response.data.data.workshop;
            // setCourse(tempCourse);
            // sessionStorage.setItem("course", JSON.stringify(tempCourse));
            sessionStorage.setItem(
              "workshopLectures",
              JSON.stringify(tempWorkshopLectures)
            );
            sessionStorage.setItem(
              "regularLectures",
              JSON.stringify(tempRegularLectures)
            );
            sessionStorage.setItem(
              "preRecordedLectures",
              JSON.stringify(tempPreRecordedLectures)
            );
          }
        })
        .catch((err) => {
          //let statusCode = err.response.statuscode;
          console.log(err.response);
        });
    }
  }, [authToken]);

  useEffect(() => {
    if (
      isGetCoursesComplete &&
      isGetCoursesDetailsComplete &&
      isGetRecentVideosComplete &&
      isGetRecordedVideosComplete
    ) {
      setLoaderVisibility(false);
    }
  }, [
    isGetCoursesComplete,
    isGetCoursesDetailsComplete,
    isGetRecentVideosComplete,
    isGetRecordedVideosComplete,
  ]);

  function handleRightStatisticsClick() {
    //console.log(statisticsCardRef.current);
    statisticsCardRef.current.scrollLeft += 451;
    if (course.length > 1) {
      sessionStorage.setItem("courseOpted", course?.[1].course);
    }
  }
  function handleLeftStatisticsClick() {
    statisticsCardRef.current.scrollLeft -= 451;
    sessionStorage.setItem("courseOpted", course?.[0].course);
  }
  function handleRightVideosClick() {
    //console.log(statisticsCardRef.current);
    videosCardRef.current.scrollLeft += 400;
  }
  function handleLeftVideosClick() {
    videosCardRef.current.scrollLeft -= 400;
  }
  function handleRightStudyVideosClick() {
    //console.log(statisticsCardRef.current);
    studyCardRef.current.scrollLeft += 400;
  }
  function handleLeftStudyVideosClick() {
    studyCardRef.current.scrollLeft -= 400;
  }

  return isLoaderVisible ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div className="home-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="home">
        <div className="home-section-1">
          <div className="home-section-1-section-1">
            <h5 className="home-section-1-section-1-heading">
              <span style={{ fontWeight: "600" }}>Hello,</span> {firstName}{" "}
              &#128075;
            </h5>
            <p className="home-section-1-section-1-sub-heading">
              Nice to have you back with us! Get ready and continue learning.
            </p>
            <div className="home-section-1-section-1-statistics-container">
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
                  {course?.length > 0 ? (
                    course?.map((item) => {
                      return (
                        <div className="home-section-1-section-1-statistics-card">
                          <div className="home-section-1-section-1-statistics-card-icon-container">
                            <div style={{ width: "95px", height: "95px" }}>
                              <CircularProgressbarWithChildren
                                value={
                                  item?.course === "French"
                                    ? frenchAttendence
                                    : vedicAttendence
                                }
                              >
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
                              {/* If course is french*/}
                              {item?.course === "French"
                                ? Math.round(frenchAttendence) + "%"
                                : ""}
                              {/* If course is vedic */}
                              {item?.course === "Vedic"
                                ? Math.round(vedicAttendence) + "%"
                                : ""}
                            </p>
                          </div>
                          <div className="home-section-1-section-1-statistics-card-content-container">
                            <p className="home-section-1-section-1-statistics-card-content-heading">
                              {/* If course is french */}
                              {item?.course === "French"
                                ? frenchIntermidiateDetails?.courseName
                                : ""}
                              {/* If course is vedic */}
                              {item?.course === "Vedic"
                                ? vedicIntermediateDetails?.courseName
                                : ""}
                              &nbsp;
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "300",
                                  color: "#727272",
                                }}
                              >
                                ({item?.courseType})
                              </span>
                            </p>
                            <div className="home-section-1-section-1-statistics-card-points-container">
                              <div className="home-section-1-section-1-statistics-card-points-row-1">
                                <div className="home-section-1-section-1-statistics-card-point">
                                  <FiBookOpen className="home-section-1-section-1-statistics-card-point-icon" />
                                  {/* Point 1 */}
                                  <p className="home-section-1-section-1-statistics-card-point-text">
                                    {/* If Course is French and type is Intermediate */}
                                    {item?.course === "French" &&
                                    item?.courseType === "Intermediate"
                                      ? frenchIntermidiateDetails?.detail1
                                      : ""}
                                    {/*  */}

                                    {/* If Course is French and type is advanced */}
                                    {item?.course === "French" &&
                                    item?.courseType === "Advanced"
                                      ? frenchAdvancedDetails?.detail1
                                      : ""}
                                    {/*  */}

                                    {/* If Course is Vedic and type is basic */}
                                    {item?.course === "Vedic" &&
                                    item?.courseType === "Basic"
                                      ? vedicBasicDetails?.detail1
                                      : ""}
                                    {/*  */}

                                    {/* If Course is Vedic and type is Intermediate */}
                                    {item?.course === "Vedic" &&
                                    item?.courseType === "Intermediate"
                                      ? vedicIntermediateDetails?.detail1
                                      : ""}
                                    {/*  */}

                                    {/* If Course is Vedic and type is Advanced */}
                                    {item?.course === "Vedic" &&
                                    item?.courseType === "Advanced"
                                      ? vedicAdvancedDetails?.detail1
                                      : ""}
                                    {/*  */}
                                  </p>
                                </div>
                              </div>
                              <div className="home-section-1-section-1-statistics-card-points-row-2">
                                <div className="home-section-1-section-1-statistics-card-point">
                                  <FiBookOpen className="home-section-1-section-1-statistics-card-point-icon" />
                                  {/* Point 2*/}
                                  <p className="home-section-1-section-1-statistics-card-point-text">
                                    {/* If Course is French and type is Intermediate */}
                                    {item?.course === "French" &&
                                    item?.courseType === "Intermediate"
                                      ? frenchIntermidiateDetails?.detail2
                                      : ""}
                                    {/*  */}

                                    {/* If Course is French and type is advanced */}
                                    {item?.course === "French" &&
                                    item?.courseType === "Advanced"
                                      ? frenchAdvancedDetails?.detail2
                                      : ""}
                                    {/*  */}

                                    {/* If Course is Vedic and type is basic */}
                                    {item?.course === "Vedic" &&
                                    item?.courseType === "Basic"
                                      ? vedicBasicDetails?.detail2
                                      : ""}
                                    {/*  */}

                                    {/* If Course is Vedic and type is Intermediate */}
                                    {item?.course === "Vedic" &&
                                    item?.courseType === "Intermediate"
                                      ? vedicIntermediateDetails?.detail2
                                      : ""}
                                    {/*  */}

                                    {/* If Course is Vedic and type is Advanced */}
                                    {item?.course === "Vedic" &&
                                    item?.courseType === "Advanced"
                                      ? vedicAdvancedDetails?.detail2
                                      : ""}
                                    {/*  */}
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
                      );
                    })
                  ) : (
                    <div className="home-section-1-section-1-statistics-card">
                      <span
                        style={{
                          display: "flex",
                          margin: "auto",
                          alignItems: "center",
                        }}
                      >
                        You have'nt registered in any course yet
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="home-section-1-section-2">
            <div className="home-section-1-section-2-user-info-container">
              <div className="home-section-1-section-2-user-email-roll-no-container">
                <p className="home-section-1-section-2-user-info">
                  {userEmail}
                </p>
                <p className="home-section-1-section-2-user-info">
                  Roll Number: {userLBRollNumber}
                </p>
              </div>
              <span className="home-section-1-section-2-line"></span>
              <div className="home-section-1-section-2-user-avatar-container">
                <BsFillBellFill className="home-section-1-section-2-bell-icon" />
                <div className="home-section-1-section-2-user-avatar">
                  {userImageUrl == null ? (
                    <div>
                      <BsFillPersonFill fontSize={"33px"} />
                    </div>
                  ) : (
                    <img
                      src="/images/test-avatar.jpg"
                      className="home-section-1-section-2-user-img"
                      alt="avatar-image"
                    ></img>
                  )}
                </div>
              </div>
            </div>
            <div className="home-section-1-section-2-vidoes-btn-container">
              <p className="home-section-1-section-2-vidoes-btn-container-heading">
                Continue to watch
              </p>
              <button
                className="home-section-1-section-1-statistics-container-left-btn"
                onClick={() => handleLeftVideosClick()}
              >
                <IoIosArrowBack className="statistics-card-arrow-icon" />
              </button>
              <button
                className="home-section-1-section-1-statistics-container-right-btn"
                onClick={() => handleRightVideosClick()}
              >
                <IoIosArrowForward className="statistics-card-arrow-icon" />
              </button>
              <div
                className="home-section-1-section-2-videos-container"
                ref={videosCardRef}
              >
                {recentVideos.length > 0 ? (
                  recentVideos?.map((item) => {
                    return <Videos url={item.videoURL} id={item?.videoId} />;
                  })
                ) : (
                  <div style={{ fontSize: "16px" }}>
                    You Have'nt Watched Anything Yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="home-section-2">
          <p className="home-section-2-heading">Study Materials</p>
          <button
            className="home-section-2-left-btn"
            onClick={() => handleLeftStudyVideosClick()}
          >
            <IoIosArrowBack className="statistics-card-arrow-icon" />
          </button>
          <button
            className="home-section-2-right-btn"
            onClick={() => handleRightStudyVideosClick()}
          >
            <IoIosArrowForward className="statistics-card-arrow-icon" />
          </button>
          <div className="home-section-2-videos-container" ref={studyCardRef}>
            {/* Video 1 */}
            <div className="home-section-2-video">
              <img
                src="/images/videoTestThumbnail1.png"
                alt="videothumbnail"
                className="home-section-2-video-thumbnail"
              ></img>
              <div className="overlay"></div>
              <p className="home-section-2-video-heading">
                Live - classes Recordings
              </p>
              <div
                className="home-section-2-video-icon-container"
                onClick={() => {
                  history.push("/liverecordings");
                }}
              >
                <BsFillPlayFill className="home-section-2-video-icon" />
              </div>
              <div className="home-section-2-video-footer">
                <p className="home-section-2-video-footer-text">
                  42/50 Classes
                </p>
                <p className="home-section-2-video-footer-text">12/15 Tasks</p>
              </div>
            </div>
            {/*  */}

            {/* Video 2 */}
            <div className="home-section-2-video">
              <img
                src="/images/videoTestThumbnail1.png"
                alt="videothumbnail"
                className="home-section-2-video-thumbnail"
              ></img>
              <div className="overlay"></div>
              <p className="home-section-2-video-heading">
                Pre - Recorded Lectures
              </p>
              <div
                className="home-section-2-video-icon-container"
                onClick={() => history.push("/prerecorded")}
              >
                <BsFillPlayFill className="home-section-2-video-icon" />
              </div>
              <div className="home-section-2-video-footer">
                <p className="home-section-2-video-footer-text">
                  42/50 Classes
                </p>
                <p className="home-section-2-video-footer-text">12/15 Tasks</p>
              </div>
            </div>
            {/*  */}

            {/* Video 3 */}
            <div className="home-section-2-video">
              <img
                src="/images/videoTestThumbnail1.png"
                alt="videothumbnail"
                className="home-section-2-video-thumbnail"
              ></img>
              <div className="overlay"></div>
              <p className="home-section-2-video-heading">
                Workshop Recordings
              </p>
              <div
                className="home-section-2-video-icon-container"
                onClick={() => history.push("/workshoprecordings")}
              >
                <BsFillPlayFill className="home-section-2-video-icon" />
              </div>
              <div className="home-section-2-video-footer">
                <p className="home-section-2-video-footer-text">
                  42/50 Classes
                </p>
                <p className="home-section-2-video-footer-text">12/15 Tasks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
