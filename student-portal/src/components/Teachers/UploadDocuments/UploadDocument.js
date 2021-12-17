import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Document from "../../MyClasses/Materials/Documents/Document";
function UploadDocument(props) {
  const [isUploadClicked, setUploadClicked] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const batchName = props?.name;
  const batchId = props?.id;
  const updatedAt = props?.updatedAt;
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Add upload logic here
        const binaryStr = reader.result;
      };
      reader.readAsArrayBuffer(file);

      let tempFileNames = fileNames;
      tempFileNames.push(file);
      setFileNames([...tempFileNames]);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
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
          <button
            className="teachers-btn"
            onClick={() =>
              setUploadClicked((isUploadClicked) => !isUploadClicked)
            }
          >
            Upload
          </button>
        </div>
      </div>
      {isUploadClicked ? (
        <div
          {...getRootProps({
            className: fileNames.length === 0 ? "dropzone" : "dropzone row",
          })}
        >
          <input
            {...getInputProps({
              accept: "application/pdf, application/vnd.ms-excel",
            })}
          />
          {fileNames.length === 0 ? (
            <>
              <p>Drag 'n' drop some files here, or click to select files</p>
              <button className="dropzone-btn">Upload From device</button>
            </>
          ) : (
            <>
              {fileNames.map((item) => {
                return <Document documentTitle={item?.name} />;
              })}
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default UploadDocument;
