import React, { useContext } from "react";
import "./sidebar.css";
import { Offcanvas, Nav, Navbar } from "react-bootstrap";
import { appContext } from "../../context/appContext";
import { MdPets } from "react-icons/md";
import { RiHome2Fill } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";
import { BsPersonLinesFill } from "react-icons/bs";
import { FaDog } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { MdDashboardCustomize } from "react-icons/md";
import { Link } from "react-router-dom";

function Sidebar(props) {
  const { userData, isAdmin } = useContext(appContext);

  const handleSidebarClose = () => props.setSidebarShow(false);

  return (
    <>
      <Offcanvas
        show={props.sidebarShow}
        onHide={handleSidebarClose}
        className="sidebar-container"
      >
        <Offcanvas.Header closeButton>
          <div className="d-flex align-items-center">
            <Offcanvas.Title>
              <Link
                to="/"
                className="d-flex m-0 p-0 text-decoration-none"
                onClick={() => props.setSidebarShow(false)}
              >
                <MdPets className="title-icon" />
                <p className="title-text fs-4 ms-2 mb-0 align-items-center">
                  GetRexi
                </p>
              </Link>
            </Offcanvas.Title>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Navbar className="col-12">
            <Nav className="d-flex flex-column col-12 me-auto">
              <div className="d-flex col-12 align-items-center">
                <Link
                  className="border-bottom fs-5 link text-decoration-none m-0 p-0"
                  to="/"
                  onClick={() => props.setSidebarShow(false)}
                >
                  <RiHome2Fill className="me-2 home-icon" />
                  Home
                </Link>
              </div>
              <div className="d-flex col-12 align-items-center mt-4">
                <Link
                  className="border-bottom fs-5 link text-decoration-none"
                  to="/search-page"
                  onClick={() => props.setSidebarShow(false)}
                >
                  <HiOutlineSearch className="me-2 search-icon" />
                  Search
                </Link>
              </div>
              {userData && (
                <div className="d-flex col-12 align-items-center mt-4">
                  <Link
                    className="border-bottom fs-5 link text-decoration-none"
                    to={`/profile-page/${userData.id}`}
                    onClick={() => props.setSidebarShow(false)}
                  >
                    <BsPersonLinesFill className="me-2 profile-icon" />
                    Profile
                  </Link>
                </div>
              )}
              {userData && (
                <div className="d-flex col-12 align-items-center mt-4">
                  <Link
                    className="border-bottom fs-5 link text-decoration-none"
                    to={`/my-pets-page/${userData.id}`}
                    onClick={() => props.setSidebarShow(false)}
                  >
                    <FaDog className="me-2 my-pets-sidebar-icon" />
                    My Pets
                  </Link>
                </div>
              )}
              {userData && (
                <div className="d-flex col-12 align-items-center my-4">
                  <Link
                    className="border-bottom fs-5 link text-decoration-none"
                    to={`/saved-pets-page/${userData.id}`}
                    onClick={() => props.setSidebarShow(false)}
                  >
                    <AiFillHeart className="me-2 saved-pets-sidebar-icon" />
                    Saved Pets
                  </Link>
                </div>
              )}
              {!!isAdmin && (
                <div className="d-flex col-12 align-items-center mt-5">
                  <Link
                    className="border-bottom fs-5 link text-decoration-none"
                    to="/admin-page"
                    onClick={() => props.setSidebarShow(false)}
                  >
                    <MdDashboardCustomize className="me-2 saved-pets-sidebar-icon" />
                    Admin Dashboard
                  </Link>
                </div>
              )}
            </Nav>
          </Navbar>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
