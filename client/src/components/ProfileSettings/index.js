import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useUserProvider } from "../../context/UserProvider";
import { UserContext } from "../../context/UserContext";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css/animate.min.css";
import {
  ProfileCardInfoWrapper,
  ProfileCardImage,
  ProfileName,
} from "../Sidebar/SidebarStyles";
import * as S from "./ProfileSettingsStyles";

const ProfileSettings = () => {
  const { userData } = useContext(UserContext);
  const { setUserData, updateUserData, setIsOnline } = useUserProvider();
  const [click, setClick] = useState(false);
  const [error, setError] = useState({});
  const [fileName, setFileName] = useState("");
  const imageInput = useRef();
  const token = localStorage.getItem("tokenauth");
  const history = useHistory();

  const logoutHandler = () => {
    setIsOnline(false);
    localStorage.removeItem("tokenauth");
    history.push("/login");

    store.addNotification({
      message: "Succesfully logged out",
      type: "success",
      container: "top-right",
      insert: "top",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: true,
      },
    });
  };

  const handleFileInformation = (e) => {
    setFileName(e.target.files[0].name);
    setClick(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = imageInput.current.files[0];
    setError({});

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      await axios
        .post("/settings", formData, {
          withCredentials: true,
          headers: {
            "content-type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setError({});
          setUserData({ ...userData, userAvatar: response });
          updateUserData();
          setFileName("");
        })
        .catch((error) => {
          setError(error.response.data);
          console.log(error.response.data);
        });
    } else {
      setError({ errorMessage: "You must upload an image" });
    }
  };

  return (
    <S.Wrapper>
      <S.ProfileCardSettings>
        <ProfileCardInfoWrapper>
          <ProfileCardImage src={userData.userAvatar} />
          <ProfileName>{userData.username}</ProfileName>
          <S.ProfileEmail>{userData.email}</S.ProfileEmail>
          <S.ChangeAvatarForm
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <S.ChangeAvatarLabel htmlFor="file">
              {" "}
              Change avatar
              <S.ChangeAvatar
                type="file"
                accept=".png, .jpg, .jpeg"
                name="file"
                ref={imageInput}
                onChange={handleFileInformation}
              />
            </S.ChangeAvatarLabel>
            {fileName ? (
              <S.FileNameInformation>{fileName}</S.FileNameInformation>
            ) : null}
            {click ? (
              <S.FileNameInformation>
                Upload an image first
              </S.FileNameInformation>
            ) : null}
            <S.ChangeAvatarSubmit
              type="submit"
              onClick={() => (!fileName ? setClick(true) : null)}
            >
              Change
            </S.ChangeAvatarSubmit>
          </S.ChangeAvatarForm>

          <S.LogoutButton to="/login" onClick={logoutHandler}>
            Logout
          </S.LogoutButton>
        </ProfileCardInfoWrapper>
      </S.ProfileCardSettings>
    </S.Wrapper>
  );
};

export default ProfileSettings;
