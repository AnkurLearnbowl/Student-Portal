import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import ForgotPassword from "./components/Login/ForgotPassword/ForgotPassword";
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
