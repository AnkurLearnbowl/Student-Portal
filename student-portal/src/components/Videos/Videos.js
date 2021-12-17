import React from "react";
import { useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { BsFillBellFill, BsFillPlayFill } from "react-icons/bs";
import "../LiveClassRecordings/liveclassrecordings.css";
import Axios from "../../axios";
function Videos(prop) {
  const [isClicked, setClicked] = useState(false);

  //This is the required url for using iframe
  const defaultUrl = "https://player.vimeo.com/video/";
  let originalUrl = prop.url;
  let url = prop.url; //Here we are getting the url of vimeo video
  let id = prop.id;
  let user = JSON.parse(sessionStorage.getItem("user"));
  let authToken = sessionStorage.getItem("auth_token");
  let contactNumber = user?.contactNumber;
  url = url.split("/"); //We want to get the video id of the video
  let videoUrl = defaultUrl + url[url.length - 1]; //Here we construct the url for iframe

  function videoClicked() {
    //console.log(originalUrl);
    Axios.post(
      "/v1/add_recent_video",
      {
        contactNumber: contactNumber,
        videoId: id,
        videoURL: originalUrl,
      },
      {
        headers: {
          Authorization: authToken,
        },
      }
    )
      .then((response) => {
        let statusCode = response.data.statuscode;
        console.log("Successfulyy added");
        //Video added succesfully
      })
      .then((err) => {
        console.log(err);
        //Something Happened
      });
    setClicked(true);
  }
  return (
    <div>
      {isClicked ? (
        <iframe
          src={videoUrl}
          width="365"
          height="282"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      ) : (
        <div className="live-class-recordings-video">
          <div
            className="home-section-1-section-2-video-icon-container"
            onClick={() => videoClicked()}
          >
            <CircularProgressbarWithChildren
              value={23}
              styles={buildStyles({
                textColor: "white",
                pathColor: "white",
                textSize: "200px",
              })}
            >
              {
                <BsFillPlayFill
                  style={{
                    color: "var(--primary-color)",
                    width: 25,
                    height: 25,
                    backgroundColor: "white",
                    borderRadius: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              }
            </CircularProgressbarWithChildren>
          </div>
          <div className="home-section-1-section-2-video-heading">
            <p className="home-section-1-section-2-video-sub-heading">
              French-Lesson-31
            </p>
            <p className="home-section-1-section-2-video-sub-sub-heading">
              35 mins left
            </p>
          </div>
          <img
            src="/images/videoTestThumbnail.png"
            alt="thumbail"
            className="home-section-1-section-2-video-thumbnail"
          ></img>
        </div>
      )}
    </div>
  );
}

export default Videos;
