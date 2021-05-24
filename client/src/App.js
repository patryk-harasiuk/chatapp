import { useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { useUserProvider } from "./context/UserProvider";
import ReactNotification from "react-notifications-component";

import GlobalStyle from "./globalStyles";

//COMPONENT IMPORTS
import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";
import ChatRoom from "./components/ChatRoom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ProfileSettings from "./components/ProfileSettings";
import NotFoundPage from "./components/NotFoundPage";

const App = () => {
  const { createRoomPopup, joinRoomPopup, setUserData } = useUserProvider();
  const history = useHistory();

  const updateUserData = () => {
    const token = localStorage.getItem("tokenauth");
    if (token === null) {
      setUserData({});
    } else {
      axios
        .get("/auth", {
          withCredentials: true,
          headers: { authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          setUserData({});
          localStorage.removeItem("tokenauth");
          history.push("/login");
        });
    }
  };

  useEffect(() => {
    updateUserData();
  }, []);

  return (
    <Router>
      <GlobalStyle />
      {createRoomPopup || joinRoomPopup ? <Modal /> : null}
      <div className={createRoomPopup || joinRoomPopup ? "modal" : null}>
        <ReactNotification />

        <Switch>
          <Route exact path="/">
            <Sidebar />
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
            <LoginPage updateUserData={updateUserData} />
          </Route>

          <Route exact path="/settings">
            <ProfileSettings />
          </Route>

          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
