import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import { useUserProvider } from "./context/UserProvider";
import UserContext from "./context/UserContext";
import ReactNotification from "react-notifications-component";

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
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("tokenauth");

  const updateUserData = () => {
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
        });
    }
  };

  useEffect(() => {
    updateUserData();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData, updateUserData }}>
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

            <PrivateRoute exact path="/settings" component={ProfileSettings} />

            <Route exact path="/register" component={RegisterPage} />

            <Route
              exact
              path="/login"
              component={LoginPage}
              updateUserData={updateUserData}
            />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
