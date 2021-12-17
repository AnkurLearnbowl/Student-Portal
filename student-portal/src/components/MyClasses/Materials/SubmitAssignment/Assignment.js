import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Document from "../Documents/Document";
import "./assignment.css";
function Assignment(prop) {
  const assignmentHeading = prop?.assignmentHeading;
  const assignmentDate = prop?.assignmentDate;
  const [isUploadClicked, setUploadClicked] = useState(false);
  const [fileNames, setFileNames] = useState([]);
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
      <div className="assignment-heading-container">
        <div className="assignment-content-1">
          <p className="assignment-content">{assignmentHeading}</p>
          <p className="assignment-content">{assignmentDate}</p>
          <button
            className="assignment-content-btn"
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

export default Assignment;
