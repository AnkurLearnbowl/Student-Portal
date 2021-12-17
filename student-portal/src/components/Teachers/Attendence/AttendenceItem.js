import React, { useState, useEffect } from "react";
import { IoIosRadioButtonOn } from "react-icons/io";
function AttendenceItem(props) {
  const [isButtonActive, setButtonActive] = useState(false);
  const updatingFor = props?.updatingFor;
  const student = props?.student;
  const name = student?.studentName;
  const LBRollNumber = student?.LBRollNumber;

  function onRadioButtonClicked() {
    let oldState = isButtonActive;
    let newState = !isButtonActive;
    setButtonActive((isButtonActive) => !isButtonActive);

    //Make an api call to update attendence
  }
  return (
    <div className="assignment-heading-container">
      <div className="assignment-content-1">
        <p className="feedback-item-content-1-content">{name}</p>
        <p className="feedback-item-content-1-content">12-11-2021</p>
        <p className="feedback-item-content-1-content">{updatingFor}</p>
        <div
          onClick={() => onRadioButtonClicked()}
          className={
            isButtonActive
              ? "radio-button-container-active"
              : "radio-button-container-inactive"
          }
        >
          <IoIosRadioButtonOn
            className={
              isButtonActive ? "radio-circle-active" : "radio-circle-inactive"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default AttendenceItem;
