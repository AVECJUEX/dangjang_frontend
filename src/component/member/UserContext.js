import React, { createContext, useContext, useReducer, useEffect } from "react";

const initialState = {
  userList: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: {
          userid: action.userid,
          user_seq: action.user_seq,
          role: action.role,
          nickname: action.nickname,
          username: action.username,
          email: action.email
        },
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "MODIFY":
      return {
        ...state,
        user: {
            userid: action.userid,
        },
      };
    default:
      return state;
  }
};

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  useEffect(() => {
    if (window.sessionStorage.getItem("userid") != null) {
      dispatch({
        type: "LOGIN",
        userid: window.sessionStorage.getItem("userid"),
        user_seq: window.sessionStorage.getItem("user_seq"),
        role: window.sessionStorage.getItem("role"),
        nickname: window.sessionStorage.getItem("nickname"),
        username: window.sessionStorage.getItem("username"),
        email: window.sessionStorage.getItem("email")
      });
    }
  }, []);



  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const state = useContext(UserStateContext);
  if (!state) throw new Error("Cannot find UserProvider");
  return state;
};

export const useUserDispatch = () => {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error("Cannot find UserProvider");
  return dispatch;
};
