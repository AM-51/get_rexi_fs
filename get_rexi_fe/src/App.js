import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { appContext } from "./context/appContext";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/Sidebar/Sidebar";
import SearchPage from "./components/SearchPage/SearchPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import MyPetsPage from "./components/MyPetsPage/MyPetsPage";
import SavedPets from "./components/AllSavedPets/AllSavedPets";
import PetPage from "./components/PetPage/PetPage";
import AdminPage from "./components/AdminPage/AdminPage";
import AllUsers from "./components/AllUsers/AllUsers";
import AllPets from "./components/AllPets/AllPets";

import Footer from "./components/Footer/Footer";

function App() {
  const [sidebarShow, setSidebarShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isAddRemoveAdminClicked, setIsAddRemoveAdminClicked] = useState(false);

  const checkIfUserSignedIn = () => {
    try {
      return JSON.parse(atob(localStorage.getItem("jwt").split(".")[1]));
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const [userData, setUserData] = useState(checkIfUserSignedIn());

  const [isAdmin, setIsAdmin] = useState(userData?.isAdmin);

  const contextValue = {
    userData,
    setUserData,
    isAdmin,
    setIsAdmin,
    loginModalShow,
    setLoginModalShow,
    isLoginClicked,
    setIsLoginClicked,
    isAddRemoveAdminClicked,
    setIsAddRemoveAdminClicked,
  };

  return (
    <appContext.Provider value={contextValue}>
      <Router>
        <NavBar setSidebarShow={setSidebarShow} />
        <Sidebar sidebarShow={sidebarShow} setSidebarShow={setSidebarShow} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-page" element={<SearchPage />} />
          {userData && (
            <Route path="/profile-page/:userId" element={<ProfilePage />} />
          )}
          {userData && (
            <Route path="/my-pets-page/:userId" element={<MyPetsPage />} />
          )}
          {userData && (
            <Route path="/saved-pets-page/:userId" element={<SavedPets />} />
          )}
          <Route path="/pet-page/:petId" element={<PetPage />} />
          {isAdmin && <Route path="/admin-page" element={<AdminPage />} />}
          {isAdmin && <Route path="/all-users-page" element={<AllUsers />} />}
          {isAdmin && <Route path="/all-pets-page" element={<AllPets />} />}
        </Routes>
        <Footer />
      </Router>
    </appContext.Provider>
  );
}

export default App;
