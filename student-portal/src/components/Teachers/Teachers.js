import React, { useState, useEffect } from "react";
import "./teachers.css";
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import UploadDocuments from "./UploadDocuments/UploadDocuments";
import Axios from "../../axios";
import ViewDocuments from "./ViewDocuments/ViewDocuments";
import GiveFeedbacks from "./GiveFeedbacks/GiveFeedbacks";
import Documents from "../MyClasses/Materials/Documents/Documents";
// import Attendence from "./Attendence/Attendence";
import Batches from "./Batches/Batches";
function Teachers() {
  const history = useHistory();
  if (
    sessionStorage.getItem("user") === null ||
    sessionStorage.getItem("user") === undefined
  ) {
    history.push("/login");
  }
  const user = JSON.parse(sessionStorage.getItem("user"));
  const authtoken = sessionStorage.getItem("auth_token");
  const [actionSelected, setActionSelected] = useState(1);
  const [batches, setbatches] = useState([]);
  const [isBatchSelected, setBatchSelected] = useState(false);
  useEffect(() => {
    Axios.get("/v1/get_batches", {
      headers: {
        Authorization: authtoken,
      },
    })
      .then((response) => {
        let statuscode = response?.data?.statuscode;
        if (statuscode == "SC201") {
          //set bacthes on the screen
          console.log(response?.data?.data);
          setbatches(response?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(isBatchSelected);
  }, [isBatchSelected]);

  function selectedBatch(id) {
    console.log(id);
    setBatchSelected(true);
  }
  return (
    <div className="teachers-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="teachers">
        <div className="teachers-header-container">
          <div className="teachers-header-column-1">Actions Available</div>
          <div className="teachers-header-column-2">Select Batch</div>
        </div>
        <div className="teachers-content-container">
          <div className="teachers-content-column-1">
            {/* Item-1 */}
            <div
              className={
                actionSelected === 1
                  ? "teachers-content-column-1-item active"
                  : "teachers-content-column-1-item"
              }
              onClick={() => setActionSelected(1)}
            >
              Upload Documents
            </div>

            {/* Item-2 */}
            <div
              className={
                actionSelected === 2
                  ? "teachers-content-column-1-item active"
                  : "teachers-content-column-1-item"
              }
              onClick={() => setActionSelected(2)}
            >
              View Documents
            </div>

            {/* Item-3 */}
            <div
              className={
                actionSelected === 3
                  ? "teachers-content-column-1-item active"
                  : "teachers-content-column-1-item"
              }
              onClick={() => setActionSelected(3)}
            >
              Give Feedback
            </div>

            {/* Item-4 */}
            <div
              className={
                actionSelected === 4
                  ? "teachers-content-column-1-item active"
                  : "teachers-content-column-1-item"
              }
              onClick={() => setActionSelected(4)}
            >
              Mark Attendence
            </div>

            {/* Item-5 */}
            <div
              className={
                actionSelected === 5
                  ? "teachers-content-column-1-item active"
                  : "teachers-content-column-1-item"
              }
              onClick={() => setActionSelected(5)}
            >
              Assignment Review
            </div>
          </div>
          <div className="teachers-content-column-2">
            <div className="teachers-content-column-2-heading-container">
              <div className="teachers-content-column-2-heading-item-1 center-horizontally-and-vertically">
                Name
              </div>
              <div className="teachers-content-column-2-heading-item-2 center-horizontally-and-vertically">
                Last Updated
              </div>
              <div className="teachers-content-column-2-heading-item-3 center-horizontally-and-vertically">
                Action
              </div>
            </div>
            {/* <div className="teachers-content-column-2-item-container">
              <div className="teachers-content-column-2-item-item-1 center-horizontally-and-vertically">
                Batch 1
              </div>
              <div className="teachers-content-column-2-item-item-2 center-horizontally-and-vertically">
                16-12-2021
              </div>
              <div className="teachers-content-column-2-item-item-3 center-horizontally-and-vertically">
                <button className="teachers-btn">Upload</button>
              </div>
            </div> */}
            {actionSelected === 1 && <UploadDocuments batches={batches} />}
            {actionSelected === 2 && (
              <Batches batches={batches} path="/documents" />
            )}
            {actionSelected === 3 && (
              <Batches batches={batches} path="/feedback" />
            )}
            {actionSelected === 4 && (
              <Batches batches={batches} path="/markattendence" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teachers;
