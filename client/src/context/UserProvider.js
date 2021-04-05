import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = React.createContext();

const UserProvider = ({children}) => {

    const [userData, setUserData] = useState({});

    const updateUserData = async () => {
        const token = localStorage.getItem('tokenauth');
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

        useEffect(() => {
            updateUserData();
        }, []);

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
