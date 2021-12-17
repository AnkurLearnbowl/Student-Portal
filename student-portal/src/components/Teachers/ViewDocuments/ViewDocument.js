import React, { useState } from "react";
import Documents from "../../MyClasses/Materials/Documents/Documents";
import { Link } from "react-router-dom";
function ViewDocument(props) {
  const batchName = props?.name;
  const batchId = props?.id;
  const updatedAt = props?.updatedAt;
  const [showDocuments, setShowDocuments] = useState(false);
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
              pathname: "/documents",
              state: {
                batchId: batchId,
              },
            }}
            className="teachers-btn"
          >
            Proceed
          </Link>
        </div>
      </div>
    </>
  );
}

export default ViewDocument;
