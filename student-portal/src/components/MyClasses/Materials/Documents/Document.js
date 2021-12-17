import React from "react";
import { saveAs } from "file-saver";
function Document(props) {
  const documentTitle = props?.documentTitle;
  const documentUrl = props?.documentUrl;

  function downloadDocument() {
    saveAs(documentUrl, documentTitle);
  }
  return (
    <div className="document-container" onClick={() => downloadDocument()}>
      <div className="document-thumbnail-container">
        <img
          alt="document"
          src="/images/pdficon.png"
          className="document-thumbnail"
        ></img>
        <img
          alt="download"
          src="/images/downloadIcon.png"
          className="document-download-thumbnail"
        ></img>
      </div>
      <div className="document-text-container">{documentTitle}</div>
    </div>
  );
}

export default Document;
