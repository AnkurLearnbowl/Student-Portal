import React, { useEffect, useState } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import "./feedback.css";
import FeedbackItem from "./FeedbackItem";
import { useLocation, useHistory } from "react-router-dom";
import Axios from "../../../../axios";
function Feedback() {
  const location = useLocation();
  const history = useHistory();
  const batchId = location.state?.batchId;
  const [batchStudents, setBatchStudents] = useState([]);
  const authToken = sessionStorage.getItem("auth_token");

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
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div className="feedback-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="feedback-content">
        <div className="feedback-heading">Batch-{batchId}</div>
        <div className="feedback-items">
          <div className="assignment-heading-container">
            <div className="assignment-content-1">
              <p className="feedback-content-1-content">Name</p>
              <p className="feedback-content-1-content">Last Updated</p>
              <p className="feedback-content-1-content">Action</p>
            </div>
          </div>
          {batchStudents?.map((student) => {
            return <FeedbackItem student={student} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Feedback;
