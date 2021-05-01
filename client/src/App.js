import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import Sidebar from "./components/Sidebar";
import LoginPage from "./components/LoginPage";
import ProfileSettings from "./components/ProfileSettings";
import NotFoundPage from "./components/NotFoundPage";
import ReactNotification from "react-notifications-component";
import ChatRoom from "./components/ChatRoom";

function App() {
  return (
    <Router>
      <ReactNotification />

      <Switch>
        <Route exact path={["/", "/room/:id"]}>
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
