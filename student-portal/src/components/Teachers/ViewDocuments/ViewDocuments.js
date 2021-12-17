import React from "react";
import ViewDocument from "./ViewDocument";
import "./viewdocument.css";
function ViewDocuments(props) {
  let batches = props?.batches;

  return (
    <>
      {batches?.map((batch) => {
        return (
          <ViewDocument
            id={batch?.batchId}
            name={batch?.batchName}
            updatedAt={batch?.updatedAt}
          />
        );
      })}
    </>
  );
}

export default ViewDocuments;
