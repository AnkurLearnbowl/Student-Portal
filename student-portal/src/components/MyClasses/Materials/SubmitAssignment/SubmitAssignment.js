import React from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import Assignment from "./Assignment";
import "./submitassignment.css";
function SubmitAssignment() {
  return (
    <div className="submit-assignment-container">
      <div className="assignment-container">
        <div className="assignment-heading-container">
          <div className="assignment-heading-1">
            <p className="assignment-heading">Assignments</p>
            <p className="assignment-heading">Date Given</p>
            <p className="assignment-heading">Action</p>
          </div>
        </div>
        <>
          <Assignment
            assignmentHeading={"Assignment-1"}
            assignmentDate={"19-10-2021"}
          />
          <Assignment
            assignmentHeading={"Assignment-2"}
            assignmentDate={"29-10-2021"}
          />
        </>
      </div>
    </div>
  );
}

export default SubmitAssignment;
