import React from "react";
import BatchItem from "./BatchItem";

function Batches(props) {
  let batches = props?.batches;
  let path = props?.path;
  return (
    <>
      {batches?.map((batch) => {
        return (
          <BatchItem
            id={batch?.batchId}
            name={batch?.batchName}
            updatedAt={batch?.updatedAt}
            path={path}
          />
        );
      })}
    </>
  );
}

export default Batches;
