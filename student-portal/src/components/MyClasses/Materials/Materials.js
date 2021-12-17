import React, { useState } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Documents from "./Documents/Documents";
import "./materials.css";
import SubmitAssignment from "./SubmitAssignment/SubmitAssignment";

function Materials() {
  const [isSubmitAssignmentClicked, setSubmitAssignmentClicked] =
    useState(true);
  const [isDocumentsClicked, setDocumentsClicked] = useState(false);
  return (
    <div className="materials-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="materials-content">
        <>
          <button
            className={
              isSubmitAssignmentClicked
                ? "materials-content-header-button active"
                : "materials-content-header-button"
            }
            onClick={() => {
              setSubmitAssignmentClicked(true);
              setDocumentsClicked(false);
            }}
          >
            Submit Assignment
          </button>
          <button
            className={
              isDocumentsClicked
                ? "materials-content-header-button active"
                : "materials-content-header-button"
            }
            onClick={() => {
              setSubmitAssignmentClicked(false);
              setDocumentsClicked(true);
            }}
          >
            Documents
          </button>
        </>
        <>{isSubmitAssignmentClicked ? <SubmitAssignment /> : <Documents />}</>
      </div>
    </div>
  );
}

export default Materials;
