import React, { useContext, createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
const AuthContext = createContext();
let initialState = {
  user: null,
};
if (localStorage.getItem('jwt')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwt'));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwt');
  } else {
    initialState.user = {
      ...decodedToken,
      token: localStorage.getItem('jwt'),
    };
  }
}
const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'REMOVE_USER':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  function addUser(userData) {
    localStorage.setItem('jwt', userData.token);
    dispatch({
      type: 'SET_USER',
      payload: userData,
    });
  }
  function removeUser() {
    localStorage.removeItem('jwt');
    dispatch({
      type: 'REMOVE_USER',
    });
  }
  return (
    <AuthContext.Provider value={{ user: state.user, addUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext);
