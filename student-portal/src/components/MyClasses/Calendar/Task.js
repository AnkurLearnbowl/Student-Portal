import React from "react";
import "./task.css";
function Task(props) {
  const taskHeading = props?.taskHeading;
  const taskTime = props?.taskTime;
  return (
    <div className="task">
      <div className="task-row-1">
        <img
          src="/images/test.svg"
          alt="tower"
          className="task-row-1-icon"
        ></img>
        <p className="task-row-1-heading">{taskHeading}</p>
      </div>
      <div className="task-row-2">
        <p className="task-row-2-heading">{taskTime}</p>
      </div>
      <button className="task-button">Join</button>
    </div>
  );
}

export default Task;
