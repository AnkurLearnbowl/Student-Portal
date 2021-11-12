import React, { useRef } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./home.css";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FiBookOpen } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsFillBellFill, BsFillPlayFill } from "react-icons/bs";

function Home() {
  const statisticsCardRef = useRef(null);
  const videosCardRef = useRef(null);
  const studyCardRef = useRef(null);

  function handleRightStatisticsClick() {
    //console.log(statisticsCardRef.current);
    statisticsCardRef.current.scrollLeft += 451;
  }
  function handleLeftStatisticsClick() {
    statisticsCardRef.current.scrollLeft -= 451;
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
  return (
    <div className="home-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="home">
        <div className="home-section-1">
          <div className="home-section-1-section-1">
            <h5 className="home-section-1-section-1-heading">
              <span style={{ fontWeight: "600" }}>Hello,</span> Advait &#128075;
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
                  {/* French Card */}
                  <div className="home-section-1-section-1-statistics-card">
                    <div className="home-section-1-section-1-statistics-card-icon-container">
                      <div style={{ width: "95px", height: "95px" }}>
                        <CircularProgressbarWithChildren value={23}>
                          {
                            <img
                              src="/images/test.svg"
                              alt="image"
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

                  {/* French Card */}
                  <div className="home-section-1-section-1-statistics-card">
                    <div className="home-section-1-section-1-statistics-card-icon-container">
                      <div style={{ width: "95px", height: "95px" }}>
                        <CircularProgressbarWithChildren value={23}>
                          {
                            <img
                              src="/images/test.svg"
                              alt="image"
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
                        French Language1 &nbsp;
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
          </div>
          <div className="home-section-1-section-2">
            <div className="home-section-1-section-2-user-info-container">
              <div className="home-section-1-section-2-user-email-roll-no-container">
                <p className="home-section-1-section-2-user-info">
                  advait124@gmail.com
                </p>
                <p className="home-section-1-section-2-user-info">
                  Roll Number- F123
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
                {/* Video 1 */}
                <div className="home-section-1-section-2-video">
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

                {/* Video 2 */}
                <div className="home-section-1-section-2-video">
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

                {/* Video 3 */}
                <div className="home-section-1-section-2-video">
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
              <div className="home-section-2-video-progress-bar">
                <CircularProgressbarWithChildren
                  value={23}
                  styles={buildStyles({
                    textColor: "white",
                    pathColor: "green",
                  })}
                >
                  {
                    <div
                      style={{
                        backgroundColor: "rgba(106, 201, 119, 0.1)",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "white",
                      }}
                    >
                      23%
                    </div>
                  }
                </CircularProgressbarWithChildren>
              </div>
              <div className="home-section-2-video-icon-container">
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
              <div className="home-section-2-video-progress-bar">
                <CircularProgressbarWithChildren
                  value={23}
                  styles={buildStyles({
                    textColor: "white",
                    pathColor: "green",
                  })}
                >
                  {
                    <div
                      style={{
                        backgroundColor: "rgba(106, 201, 119, 0.1)",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "white",
                      }}
                    >
                      23%
                    </div>
                  }
                </CircularProgressbarWithChildren>
              </div>
              <div className="home-section-2-video-icon-container">
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
              <div className="home-section-2-video-progress-bar">
                <CircularProgressbarWithChildren
                  value={23}
                  styles={buildStyles({
                    textColor: "white",
                    pathColor: "green",
                  })}
                >
                  {
                    <div
                      style={{
                        backgroundColor: "rgba(106, 201, 119, 0.1)",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "white",
                      }}
                    >
                      23%
                    </div>
                  }
                </CircularProgressbarWithChildren>
              </div>
              <div className="home-section-2-video-icon-container">
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
              <div className="home-section-2-video-progress-bar">
                <CircularProgressbarWithChildren
                  value={23}
                  styles={buildStyles({
                    textColor: "white",
                    pathColor: "green",
                  })}
                >
                  {
                    <div
                      style={{
                        backgroundColor: "rgba(106, 201, 119, 0.1)",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "white",
                      }}
                    >
                      23%
                    </div>
                  }
                </CircularProgressbarWithChildren>
              </div>
              <div className="home-section-2-video-icon-container">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
