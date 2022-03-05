import { createContext } from "react";

export const appContext = createContext({
  userData: {},
  setUserData: () => {},
  isAdmin: [],
  setIsAdmin: false,
  loginModalShow: false,
  setLoginModalShow: () => {},
  isLoginClicked: false,
  setIsLoginClicked: () => {},
  isAddRemoveAdminClicked: false,
  setIsAddRemoveAdminClicked: () => {},
});
