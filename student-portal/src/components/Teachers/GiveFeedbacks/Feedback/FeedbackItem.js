import React, { useState, useEffect } from "react";
import Axios from "../../../../axios";
function FeedbackItem(props) {
  const [isButtonClicked, setbuttonClicked] = useState(false);
  const [feedback, setFeedback] = useState("");
  const student = props?.student;
  const name = student?.studentName;
  const LBRollNumber = student?.LBRollNumber;
  //   Css from feedback.css

  function onSubmit() {
    //Make an api call to add feedback to table after that close the textbox
    setbuttonClicked((isButtonClicked) => !isButtonClicked);
  }
  return (
    <div className="assignment-heading-container">
      <div className="assignment-content-1">
        <p className="feedback-item-content-1-content">{name}</p>
        <p className="feedback-item-content-1-content">12-11-2021</p>
        <button
          className="feedback-item-content-1-btn"
          onClick={() =>
            setbuttonClicked((isButtonClicked) => !isButtonClicked)
          }
        >
          Enter
        </button>
      </div>
      {isButtonClicked && (
        <div className="feedback-textbox-container">
          <textarea
            className="feedback-textbox"
            placeholder="Write your text here"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button className="feedback-submit-btn" onClick={() => onSubmit()}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default FeedbackItem;
