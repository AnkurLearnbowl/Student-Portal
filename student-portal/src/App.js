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
import ChangeNumber from "./components/ChangeNumber/ChangeNumber";
import ChangeEmail from "./components/ChangeEmail/ChangeEmail";
import MyClasses from "./components/MyClasses/MyClasses";
import MyReport from "./components/MyReport/MyReport";

import Materials from "./components/MyClasses/Materials/Materials";
import Teachers from "./components/Teachers/Teachers";
import Test from "./components/Teachers/Test";
import Documents from "./components/Teachers/ViewDocuments/Documents/Documents";
import Feedback from "./components/Teachers/GiveFeedbacks/Feedback/Feedback";
import MarkAttendence from "./components/Teachers/Attendence/MarkAttendence/MarkAttendence";
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
          {/* Path For My Report Page */}
          <Route path="/myreport">
            <MyReport />
          </Route>
          {/* Path For My Classes Page */}
          <Route path="/myclasses">
            <MyClasses />
          </Route>
          {/* Path For Teachers Page */}
          <Route path="/teachers">
            <Teachers />
          </Route>
          {/* Path For documents Page */}
          <Route path="/documents">
            <Documents />
          </Route>
          {/* Path For feedback Page */}
          <Route path="/feedback">
            <Feedback />
          </Route>
          {/* Path For MarkAttendence Page */}
          <Route path="/markattendence">
            <MarkAttendence />
          </Route>
          {/* Path For Change Password Page */}
          <Route path="/changepassword">
            <ChangePassword />
          </Route>
          {/* Path For Change Number Page */}
          <Route path="/changenumber">
            <ChangeNumber />
          </Route>
          {/* Path For Change email Page */}
          <Route path="/changeemail">
            <ChangeEmail />
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
          {/* Path For Documents Page */}
          <Route path="/materials">
            <Materials />
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
