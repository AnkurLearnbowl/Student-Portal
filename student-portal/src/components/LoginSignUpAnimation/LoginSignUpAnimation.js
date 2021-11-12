import React from "react";
import "./loginsignupanimation.css";
function LoginSignUpAnimation(prop) {
  const isClicked = prop.isClicked;
  return (
    <div className="login-animation">
      <div className="waves-container">
        <object
          alt="login-waves"
          data="/images/waves.svg"
          type="image/svg+xml"
          className={isClicked ? "login-waves-after-submit" : "login-waves"}
        ></object>
      </div>

      <div className="rocket-container">
        <object
          alt="rocket"
          data="/images/rocket.svg"
          type="image/svg+xml"
          className={isClicked ? "login-rocket-fly" : "login-rocket"}
        ></object>
      </div>

      <div className="planets-container">
        <object
          alt="planets"
          data="/images/login-page-waves.svg"
          type="image/svg+xml"
          className={isClicked ? "planets-after-submit" : "planets"}
        ></object>
      </div>
      <ul className="exhaust-fumes">
        <li className={isClicked ? "flame-1" : ""}></li>
      </ul>
    </div>
  );
}

export default LoginSignUpAnimation;
