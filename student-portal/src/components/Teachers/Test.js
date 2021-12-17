import React from "react";
import { useLocation } from "react-router-dom";
function Test(props) {
  let location = useLocation();
  console.log(location.state?.batchId);
  return <div>{location.state?.batchId}</div>;
}

export default Test;
