import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Document from "../../../MyClasses/Materials/Documents/Document";
import Axios from "../../../../axios";
import Sidebar from "../../../Sidebar/Sidebar";
import { useHistory } from "react-router-dom";
import "./documents.css";
function Documents() {
  let location = useLocation();
  let batchId = location.state?.batchId;
  const [documents, setDocuments] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const authtoken = sessionStorage.getItem("auth_token");
  const [areDocumentsLoaded, setAreDocumentsLoaded] = useState(false);
  const history = useHistory();
  if (
    sessionStorage.getItem("user") === null ||
    sessionStorage.getItem("user") === undefined
  ) {
    history.push("/login");
  }
  if (batchId == undefined) {
    history.push("/teachers");
  }
  useEffect(() => {
    // Scroll To the top
    window.scroll(0, 0);
    if (batchId != undefined) {
      Axios.get("/v1/get_documents_by_batch_id", {
        headers: {
          Authorization: authtoken,
        },
        params: {
          batchId: batchId,
        },
      })
        .then((response) => {
          // console.log(response.data.data);
          let statuscode = response?.data?.statuscode;
          if (statuscode === "SC201") {
            console.log(response?.data?.data);
            setDocuments(response?.data?.data);
            setAreDocumentsLoaded(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div className="teachers-documents-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="teachers-documents">
        {/* Date 1 container */}
        {documents?.map((item) => {
          return (
            <div className="documents">
              <h5 className="documents-heading">{item?.[0]?.dateuploaded}</h5>
              <div className="documents-container">
                {item?.map((document) => {
                  return (
                    <>
                      <Document
                        documentTitle={document?.filename}
                        documentUrl={document?.filepath}
                      />
                      <span className="documents-seprator"></span>
                    </>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Documents;
