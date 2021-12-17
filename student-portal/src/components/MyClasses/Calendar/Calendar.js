import React, { useState, useEffect, useMemo } from "react";
import "./calendar.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Task from "./Task";
function Calendar() {
  const dates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [activeMonth, setActiveMonth] = useState(0);
  const [activeStartDate, setActiveStartDate] = useState(1);
  const [datesToRender, setDatesToRender] = useState([]);
  let currentYear = new Date().getFullYear();
  useEffect(() => {
    setDates();
  }, [activeMonth, activeStartDate]);

  // Logic to set the dates in calendar
  function setDates() {
    let tempDatesToRender = [];
    let totalDates = dates[activeMonth];
    let tempActiveStartDate = activeStartDate;

    while (
      tempActiveStartDate <= totalDates &&
      activeStartDate + 6 > tempActiveStartDate
    ) {
      let d = new Date(
        months[activeMonth] + " " + tempActiveStartDate + " " + currentYear
      );
      //console.log(d.getDay());
      tempDatesToRender.push({
        date: tempActiveStartDate,
        day: days[d.getDay()],
        tasks: [""],
      });

      tempActiveStartDate++;
    }
    setDatesToRender(tempDatesToRender);
  }

  function onClickNext() {
    if (activeStartDate + 6 > dates[activeMonth] && activeMonth < 11) {
      console.log(activeMonth);
      setActiveMonth(activeMonth + 1);
      setActiveStartDate(1);
    } else if (activeStartDate + 6 < dates[activeMonth] && activeMonth === 11) {
      setActiveStartDate(1);
      setActiveMonth(0);
    } else {
      setActiveStartDate(activeStartDate + 6);
    }
  }
  function onClickPrevious() {
    if (activeStartDate - 6 < 0 && activeMonth > 0) {
      setActiveMonth(activeMonth - 1);
      setActiveStartDate(1);
    } else if (activeStartDate - 6 < 0 && activeMonth === 0) {
      setActiveStartDate(1);
      setActiveMonth(0);
    } else {
      setActiveStartDate(activeStartDate - 6);
    }
  }
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-header-month-dropdown-container">
          <select
            className="calendar-header-month-dropdown"
            value={activeMonth}
            onChange={(e) => setActiveMonth(e.target.value)}
          >
            <option value="0">January</option>
            <option value="1">February</option>
            <option value="2">March</option>
            <option value="3">April</option>
            <option value="4">May</option>
            <option value="5">June</option>
            <option value="6">July</option>
            <option value="7">August</option>
            <option value="8">September</option>
            <option value="9">October</option>
            <option value="10">November</option>
            <option value="11">December</option>
          </select>
        </div>
        <div className="calendar-header-button-container">
          <button
            className="calendar-header-button"
            onClick={() => onClickPrevious()}
          >
            <IoIosArrowBack className="calendar-header-button-left-icon" />
            Previous
          </button>
          <button
            className="calendar-header-button"
            onClick={() => onClickNext()}
          >
            Next
            <IoIosArrowForward className="calendar-header-button-right-icon" />
          </button>
        </div>
      </div>
      <div className="calendar-date-container">
        {[
          datesToRender?.map((item) => {
            return (
              <div className="date-container">
                <div className="date-container-day">
                  <div className="date">{item?.date}</div>
                  <div className="day">{item?.day}</div>
                </div>
                <div className="date-container-tasks">
                  {item.tasks.length === 0 ? (
                    <div className="no-classes-container">
                      <span className="line"></span>
                      <span className="no-classes-text">No Classes Today</span>
                      <span className="line"></span>
                    </div>
                  ) : (
                    item.tasks.map((task) => {
                      return (
                        <Task
                          taskHeading={"French - Session 1"}
                          taskTime={"10:00 AM - 11:00 AM"}
                        />
                      );
                    })
                  )}

                  {/* <Task
                    taskHeading={"French - Session 1"}
                    taskTime={"10:00 AM - 11:00 AM"}
                  />
                  <Task
                    taskHeading={"French - Session 1"}
                    taskTime={"10:00 AM - 11:00 AM"}
                  />
                  <Task
                    taskHeading={"French - Session 1"}
                    taskTime={"10:00 AM - 11:00 AM"}
                  /> */}
                </div>
              </div>
            );
          }),
        ]}
        {/* Date 2 */}

        {/* Date 3 */}
        {/* Date 4 */}
        {/* Date 5 */}
        {/* Date 6 */}
      </div>
    </div>
  );
}

export default Calendar;
