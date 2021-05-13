import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import Sidebar from "./components/Sidebar";
import ChatRoom from "./components/ChatRoom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ProfileSettings from "./components/ProfileSettings";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <Router>
      <ReactNotification />

      <Switch>
        <Route exact path="/">
          <Sidebar />
          {/* <ChatRoom /> */}
        </Route>

        <Route path="/room/:roomId">
          <div className="content-wrapper">
            <Sidebar />
            <ChatRoom />
          </div>
        </Route>

        <Route path="/register">
          <RegisterPage />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/settings">
          <ProfileSettings />
        </Route>

        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
