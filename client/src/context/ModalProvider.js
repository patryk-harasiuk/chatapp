import React, { useState, useContext } from "react";

const ModalContext = React.createContext();

// const ModalProvider = ({ children }) => {
//   const [createRoomPopup, setCreateRoomPopup] = useState(false);
//   const [joinRoomPopup, setJoinRoomPopup] = useState(false);
//   const siema = "siema";
//   const handleCreateRoom = () => {
//     setCreateRoomPopup(true);
//     setJoinRoomPopup(false);
//   };

//   const handleJoinRoom = () => {
//     setJoinRoomPopup(true);
//     setCreateRoomPopup(false);
//   };

//   const handleCloseModal = () => {
//     setJoinRoomPopup(false);
//     setCreateRoomPopup(false);
//   };

//   return (
//     <ModalContext.Provider
//       value={{
//         createRoomPopup,
//         setCreateRoomPopup,
//         joinRoomPopup,
//         setJoinRoomPopup,
//         handleCloseModal,
//         handleCreateRoom,
//         handleJoinRoom,
//       }}
//     >
//       {children}
//     </ModalContext.Provider>
//   );
// };

// export const useModalProvider = () => {
//   return useContext(ModalContext);
// };

// export { ModalContext, ModalProvider };
