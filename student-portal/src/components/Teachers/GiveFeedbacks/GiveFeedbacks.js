import React from "react";
import GiveFeedback from "./GiveFeedback";

function GiveFeedbacks(props) {
  let batches = props?.batches;
  let batchSelected = props?.batchSelected;
  return (
    <>
      {batches?.map((batch) => {
        return (
          <GiveFeedback
            id={batch?.batchId}
            name={batch?.batchName}
            updatedAt={batch?.updatedAt}
          />
        );
      })}
    </>
  );
}

export default GiveFeedbacks;
