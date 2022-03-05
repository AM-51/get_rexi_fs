import React, { useContext } from "react";
import LogInModal from "../LogInModal/LogInModal";
import "./nav-bar.css";
import { appContext } from "../../context/appContext";
import { FaDog } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdPets } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { HiOutlineSearch } from "react-icons/hi";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate, Link } from "react-router-dom";

function NavBar(props) {
  const {
    setUserData,
    userData,
    setIsAdmin,
    loginModalShow,
    setLoginModalShow,
    setIsLoginClicked,
  } = useContext(appContext);

  const navigate = useNavigate();

  const handleModalOpen = () => setLoginModalShow(!loginModalShow);

  const handleSidebarShow = () => props.setSidebarShow(true);

  const handleMyPetsPageOpen = () => navigate(`/my-pets-page/${userData.id}`);

  const handleSavedPetsPageOpen = () =>
    navigate(`/saved-pets-page/${userData.id}`);

  const handleSearchPageOpen = () => navigate("/search-page");

  const handleLogoutClick = () => {
    setUserData(null);
    setIsAdmin(false);
    localStorage.clear();
    navigate("/");
    setIsLoginClicked((prev) => !prev);
  };

  return (
    <div className="d-flex col-12 justify-content-between align-items-center nav-bar-container">
      <div className="d-flex align-items-center">
        <div className="hamburger-btn-container ms-2 align-items-center">
          <button className="hamburger-btn" onClick={handleSidebarShow}>
            <GiHamburgerMenu className="hamburger-icon" />
          </button>
        </div>
        {userData && (
          <button
            className="nav-my-pets-btn ms-4"
            onClick={handleMyPetsPageOpen}
          >
            <FaDog className="nav-my-pets-icon" />
          </button>
        )}
        {userData && (
          <button
            className="nav-saved-pets-btn ms-4 mt-1"
            onClick={handleSavedPetsPageOpen}
          >
            <AiFillHeart className="nav-saved-pets-icon" />
          </button>
        )}
        {userData && (
          <button
            className="nav-search-btn ms-4"
            onClick={handleSearchPageOpen}
          >
            <HiOutlineSearch className="nav-search-icon" />
          </button>
        )}
        {userData && (
          <button className="nav-logout-btn ms-4" onClick={handleLogoutClick}>
            <VscSignOut className="nav-logout-icon" />
          </button>
        )}
      </div>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          {!userData && (
            <button className="nav-login-btn me-3" onClick={handleModalOpen}>
              Login
            </button>
          )}
          {userData && (
            <Link
              to={`/profile-page/${userData.id}`}
              className="d-flex justify-content-center align-items-center nav-hello-user-headline text-decoration-none mb-0 me-3 p-2"
            >
              <BsPersonCircle className="me-2" />
              Hello {userData.firstName}!
            </Link>
          )}
          <Link
            to="/"
            className="d-flex justify-content-center align-items-center me-2 p-1 text-decoration-none"
          >
            <MdPets className="nav-main-logo-icon" />
          </Link>
        </div>
      </div>
      <LogInModal
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
    </div>
  );
}

export default NavBar;
