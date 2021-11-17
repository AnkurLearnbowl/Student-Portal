import React, { useEffect } from "react";
import "./sidebar.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { CgArrowLongRight } from "react-icons/cg";

function Sidebar() {
  const [itemClickedNumber, setItemClickedNumber] = useState(1);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    //console.log(location.pathname + "Ankur")
    if (location.pathname === "/home") {
      setItemClickedNumber(1);
    } else if (location.pathname === "/myprofile") {
      setItemClickedNumber(4);
    }
  }, [location.pathname]);
  function handleClick(number) {
    if (number === 1) {
      setItemClickedNumber(1);
      history.push("/home");
    } else if (number === 2) {
      setItemClickedNumber(2);
    } else if (number === 3) {
      setItemClickedNumber(3);
    } else if (number === 4) {
      setItemClickedNumber(4);
      history.push("/myprofile");
    }
  }
  return (
    <div className="sidebar" aria-hidden="true">
      <div className="sidebar-section-1">
        <div
          className="sidebar-learnbowl-icon-container"
          onClick={() => handleClick(1)}
        >
          <div className="sidebar-learnbowl-img-container">
            <img
              src="/images/learnbowl-icon.svg"
              alt="learnbowl-icon"
              className="sidebar-learnbowl-icon"
            ></img>
          </div>
          <div className="sidebar-learnbowl-text-container">LearnBowl</div>
        </div>
      </div>
      <div className="sidebar-section-2">
        <div
          className={
            itemClickedNumber === 1
              ? "sidebar-section-2-point-container-active"
              : "sidebar-section-2-point-container"
          }
          onClick={() => handleClick(1)}
        >
          <div className="sidebar-section-2-img-container">
            {/* <img
              src="/images/sidebar-home-icon.svg"
              alt="learnbowl-icon"
              className="sidebar-section-2-icon"
            ></img> */}
            <AiOutlineHome className="sidebar-section-2-icon" />
          </div>
          <div className="sidebar-section-2-point-text-container">Home</div>
        </div>

        <div
          className={
            itemClickedNumber === 2
              ? "sidebar-section-2-point-container-active"
              : "sidebar-section-2-point-container"
          }
          onClick={() => handleClick(2)}
        >
          <div className="sidebar-section-2-img-container">
            {/* <img
              src="/images/sidebar-home-icon.svg"
              alt="learnbowl-icon"
              className="sidebar-section-2-icon"
            ></img> */}
            <AiOutlineHome className="sidebar-section-2-icon" />
          </div>
          <div className="sidebar-section-2-point-text-container">
            My Classes
          </div>
        </div>

        <div
          className={
            itemClickedNumber === 3
              ? "sidebar-section-2-point-container-active"
              : "sidebar-section-2-point-container"
          }
          onClick={() => handleClick(3)}
        >
          <div className="sidebar-section-2-img-container">
            {/* <img
              src="/images/sidebar-home-icon.svg"
              alt="learnbowl-icon"
              className="sidebar-section-2-icon"
            ></img> */}
            <AiOutlineHome className="sidebar-section-2-icon" />
          </div>
          <div className="sidebar-section-2-point-text-container">
            My Report
          </div>
        </div>

        <div
          className={
            itemClickedNumber === 4
              ? "sidebar-section-2-point-container-active"
              : "sidebar-section-2-point-container"
          }
          onClick={() => handleClick(4)}
        >
          <div className="sidebar-section-2-img-container">
            <AiOutlineHome className="sidebar-section-2-icon" />
          </div>
          <div className="sidebar-section-2-point-text-container">
            My Profile
          </div>
        </div>
      </div>
      <div className="sidebar-section-3">
        <div className="sidebar-section-3-icon-container">
          <div className="sidebar-section-3-icon">
            <img
              alt="icon-1"
              src="/images/home-section-3-icon-1.png"
              className="sidebar-section-3-icon-1"
            ></img>
          </div>
          <div className="sidebar-section-3-icon">
            <img
              alt="icon-2"
              src="/images/home-section-3-icon-2.png"
              className="sidebar-section-3-icon-2"
            ></img>
          </div>
        </div>
        <p className="sidebar-section-3-text">
          Download our <br />
          mobile app
          <CgArrowLongRight className="sidebar-section-3-text-icon" />
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
