import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import { useUserProvider } from "./context/UserProvider";

import UserContextProvider from "./context/UserContext";
import RoomContextProvider from "./context/RoomContext";
import ReactNotification from "react-notifications-component";
import { UserProvider } from "./context/UserProvider";

import GlobalStyle from "./globalStyles";

//COMPONENT IMPORTS
import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ProfileSettings from "./components/ProfileSettings";
import NotFoundPage from "./components/NotFoundPage";
import ChatComponent from "./components/ChatComponent";

const App = () => {
  const { createRoomPopup, joinRoomPopup } = useUserProvider();

  return (
    <UserContextProvider>
      <RoomContextProvider>
        <Router>
          <ReactNotification />
          <GlobalStyle />
          {createRoomPopup || joinRoomPopup ? <Modal /> : null}
          <div className={createRoomPopup || joinRoomPopup ? "modal" : null}>
            <Switch>
              <PrivateRoute exact path="/" component={Sidebar} />
              <PrivateRoute
                exact
                path="/room/:roomId"
                component={ChatComponent}
              />
              <PrivateRoute
                exact
                path="/settings"
                component={ProfileSettings}
              />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </RoomContextProvider>
    </UserContextProvider>
  );
};

export default App;
