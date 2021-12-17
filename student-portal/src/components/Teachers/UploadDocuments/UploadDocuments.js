import React, { useEffect, useState } from "react";
import "./uploaddocuments.css";
import UploadDocument from "./UploadDocument";
import Axios from "../../../axios";
import { useHistory } from "react-router-dom";
function UploadDocuments(props) {
  const history = useHistory();
  if (
    sessionStorage.getItem("user") === null ||
    sessionStorage.getItem("user") === undefined
  ) {
    history.push("/login");
  }
  let batches = props?.batches;
  return (
    <div>
      {batches?.map((batch) => {
        return (
          <UploadDocument
            id={batch?.batchId}
            name={batch?.batchName}
            updatedAt={batch?.updatedAt}
          />
        );
      })}
    </div>
  );
}

export default UploadDocuments;
