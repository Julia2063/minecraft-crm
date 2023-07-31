import React, { useEffect, useMemo, useState } from "react";
import { auth, getCollectionWhereKeyValue } from "../helpers/firebaseControl";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

export const AppContext = React.createContext({
    userAuth: null,
    setUserAuth: () => {},
    user: null,
    setUser: () => {},
    users: [],
    setUsers: () => {},
    userRole: '',
    setUserRole: () => {},
    orders: [],
    setOrders: () => {
    }
  });

  export const AppProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(null);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState('');
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState();

    const navigate = useNavigate();
  
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        setUserAuth(user || null)});
        if (userAuth) {
          getCollectionWhereKeyValue('users', 'uid', auth.currentUser.uid).then(res => {
          setUser(res[0]);
          setUserRole(res[0].role);
          if(res[0].role.length === 0) {
            navigate('notEmployees');
          } else {
            db.collection('users').onSnapshot(snapshot => {
              setUsers(snapshot.docs.map(doc => ({...doc.data()})));
            })
            navigate('/');
          }
          }).catch((error) => {
            console.log(error)
          });
        }
    }, [userAuth]);
  
    const contextValue = useMemo(() => {
      return {
        user,
        setUser,
        userRole, 
        setUserRole, 
        orders,
        setOrders,
        users
      };
    }, [user, users, userRole, orders]) ;
  
    return (
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
    );
  };
  