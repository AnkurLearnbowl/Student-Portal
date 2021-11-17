import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ForgotPassword from "./components/Login/ForgotPassword/ForgotPassword";
import MyProfile from "./components/MyProfile/MyProfile";
import ChangePassword from "./components/MyProfile/ChangePassword";
import LiveClassRecordings from "./components/LiveClassRecordings/LiveClassRecordings";
import PrerecordedLectures from "./components/PrerecordedLectures/PrerecordedLectures";
import WorkshopRecordings from "./components/WorkshopRecordings/WorkshopRecordings";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Path For Login Page */}
          <Route path="/login">
            <Login />
          </Route>
          {/* Path For SignUp Page */}
          <Route path="/signup">
            <SignUp />
          </Route>
          {/* Path For ForgotPassword Page */}
          <Route path="/forgotpassword">
            <ForgotPassword />
          </Route>
          {/* Path For My Profile Page */}
          <Route path="/myprofile">
            <MyProfile />
          </Route>
          {/* Path For Change Password Page */}
          <Route path="/changepassword">
            <ChangePassword />
          </Route>
          {/* Path For Live Recordings Page */}
          <Route path="/liverecordings">
            <LiveClassRecordings />
          </Route>
          {/* Path For Pre Recorded Lecures Page */}
          <Route path="/prerecorded">
            <PrerecordedLectures />
          </Route>
          {/* Path For Workshop Recodings Page */}
          <Route path="/workshoprecordings">
            <WorkshopRecordings />
          </Route>
          {/* Path For Home Page */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
