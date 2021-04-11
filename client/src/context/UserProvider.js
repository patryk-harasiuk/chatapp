import React, { useState, useContext } from 'react';
import axios from 'axios';


const UserContext = React.createContext();

const UserProvider = ({children}) => {

    const [userData, setUserData] = useState({});
    const token = localStorage.getItem('tokenauth');


    const updateUserData = async () => {
        if (token === null) {
            setUserData({});
        } else {
            await axios.get('auth/user', {withCredentials: true, headers: {'authorization': `Bearer ${token}`}})
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                setUserData({});
                localStorage.removeItem('tokenauth');
            });
        };
    };

    return (
        <UserContext.Provider value={{userData, setUserData, updateUserData}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserProvider = () => {
    return useContext(UserContext);
};

export { UserContext, UserProvider };
