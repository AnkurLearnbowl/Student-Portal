import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function BatchItem(props) {
  const redirectPath = props?.path;
  const batchName = props?.name;
  const batchId = props?.id;
  const updatedAt = props?.updatedAt;
  console.log(redirectPath);
  return (
    <>
      <div className="upload-documents-container">
        <div className="upload-documents-container-item-item-1 center-horizontally-and-vertically">
          {batchName}
        </div>
        <div className="upload-documents-container-item-item-2 center-horizontally-and-vertically">
          {updatedAt}
        </div>
        <div className="upload-documents-container-item-item-3 center-horizontally-and-vertically">
          <Link
            to={{
              pathname: redirectPath,
              state: {
                batchId: batchId,
              },
            }}
            className="teachers-btn"
          >
            Proceed
          </Link>
          {/* Passing the bactch id as state to the documents component */}
        </div>
      </div>
    </>
  );
}

export default BatchItem;
