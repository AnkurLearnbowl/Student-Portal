import React, { useState, useEffect } from "react";
import Sidebar from "../../../Sidebar/Sidebar";
import { GrDocumentPdf } from "react-icons/gr";
import { VscFilePdf } from "react-icons/vsc";
import { BsFillBellFill, BsFillPlayFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import "./documents.css";
import Document from "./Document";
import Axios from "../../../../axios";
import Loader from "../../../Loader/Loader";
function Documents(props) {
  const history = useHistory();
  if (
    sessionStorage.getItem("user") === null ||
    sessionStorage.getItem("user") === undefined
  ) {
    history.push("/login");
  }
  const user = JSON.parse(sessionStorage.getItem("user"));
  const authtoken = sessionStorage.getItem("auth_token");
  let userName = user?.name;
  let LBRollNumber = user?.lbrollnumber;
  let userEmail = user?.email;
  const [documents, setDocuments] = useState([]);
  const [areDocumentsLoaded, setAreDocumentsLoaded] = useState(false);
  const batchId = props?.batchId;

  useEffect(() => {
    if (batchId == undefined) {
      //This means we wanna get all documents
      Axios.get("/v1/get_documents_by_date", {
        headers: {
          Authorization: authtoken,
        },
      })
        .then((response) => {
          // console.log(response.data.data);
          let statuscode = response?.data?.statuscode;
          if (statuscode === "SC201") {
            setDocuments(response?.data?.data);
            setAreDocumentsLoaded(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return areDocumentsLoaded ? (
    <div className="myclasses-documents-container">
      <div className="myclasses-documents">
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
  ) : (
    <Loader />
  );
}
{
  /* Recents Documents container */
}
{
  /* <div className="documents">
          <h5 className="documents-heading">Recents</h5>
          <div className="documents-container">
            <Document
              documentTitle={"French101.pdf"}
              documentUrl={"/documents/Test.pdf"}
            />
            <span className="documents-seprator"></span>
            <Document
              documentTitle={"French101.pdf"}
              documentUrl={"/documents/Test.pdf"}
            />
            <span className="documents-seprator"></span>
            <Document
              documentTitle={"French101.pdf"}
              documentUrl={"/documents/Test.pdf"}
            />
            <span className="documents-seprator"></span>
            <Document
              documentTitle={"French101.pdf"}
              documentUrl={"/documents/Test.pdf"}
            />
          </div>
        </div> */
}
export default Documents;
