import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import "./markattendence.css";
import { useLocation, useHistory } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import AttendenceItem from "../AttendenceItem";
import Axios from "../../../../axios";
import Loader from "../../../Loader/Loader";
function MarkAttendence() {
  const location = useLocation();
  const batchId = location.state?.batchId;
  const history = useHistory();
  const [batchStudents, setBatchStudents] = useState([]);
  const [areBatchStudentsLoaded, setBatchStudentsLoaded] = useState(false);
  const [dateSelected, setDateSelected] = useState("Select Date");
  const [isDateItemActive, setDateItemActive] = useState(false);
  const authToken = sessionStorage.getItem("auth_token");
  let dateRef = useRef();

  if (batchId == undefined) {
    history.push("/teachers");
  }

  useEffect(() => {
    if (batchId != undefined) {
      Axios.get("/v1/get_students_by_batch", {
        params: {
          batchID: batchId,
        },
        headers: {
          Authorization: authToken,
        },
      })
        .then((response) => {
          let statuscode = response?.data?.statuscode;
          if (statuscode === "SC201") {
            console.log(response?.data?.data);
            setBatchStudents(response?.data?.data);
            setBatchStudentsLoaded(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div className="mark-attendence-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="mark-attendence-content">
        {areBatchStudentsLoaded ? (
          <>
            <div className="mark-attendence-heading-container">
              <div className="mark-attendence-heading-item">
                Batch-{batchId}
              </div>
              <div className="mark-attendence-heading-item">
                {!isDateItemActive && (
                  <div
                    onClick={() => {
                      setDateItemActive(
                        (isDateItemActive) => !isDateItemActive
                      );
                    }}
                  >
                    {dateSelected} <IoMdArrowDropdown />
                  </div>
                )}
                {isDateItemActive && (
                  <input
                    type="date"
                    ref={dateRef}
                    onChange={(e) => {
                      setDateSelected(e.target.value);
                      setDateItemActive(
                        (isDateItemActive) => !isDateItemActive
                      );
                    }}
                  ></input>
                )}
              </div>
            </div>
            <div className="mark-attendence-items-container">
              <div className="assignment-heading-container">
                <div className="assignment-content-1">
                  <p className="feedback-content-1-content">Name</p>
                  <p className="feedback-content-1-content">Last Updated</p>
                  <p className="feedback-content-1-content">Updating For</p>
                  <p className="feedback-content-1-content">Action</p>
                </div>
              </div>
              {batchStudents?.map((student) => {
                return (
                  <AttendenceItem
                    student={student}
                    updatingFor={dateSelected}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            <Loader />
          </>
        )}
      </div>
    </div>
  );
}

export default MarkAttendence;
