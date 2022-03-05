import React, { useState, useContext } from "react";
import { Modal, Form } from "react-bootstrap";
import SignUpModal from "../SignUpModal/SignUpModal";
import "./login-modal.css";
import { loginUser } from "../../util/api";
import { appContext } from "../../context/appContext";

function LogInModal(props) {
  const [signupModalShow, setSignupModalShow] = useState(false);
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const { setIsAdmin, setUserData, setLoginModalShow, setIsLoginClicked } =
    useContext(appContext);

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setLogInEmail(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setLogInPassword(value);
  };

  const handleModalOpen = () => {
    setSignupModalShow((prev) => !prev);
    setLoginModalShow(false);
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      const loginUserData = {
        email: logInEmail,
        password: logInPassword,
      };
      const response = await loginUser(loginUserData);
      setUserData(response.data.user);
      setIsAdmin(response.data.user.isAdmin);
      setLoginModalShow(false);
      setIsLoginClicked((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group
            className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center"
            controlId="formBasicEmail"
          >
            <Form.Control
              className="login-input"
              type="email"
              onChange={handleEmailChange}
              placeholder="Enter email"
              plaintext
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center"
            controlId="formBasicPassword"
          >
            <Form.Control
              className="login-input"
              type="password"
              onChange={handlePasswordChange}
              placeholder="Password"
              plaintext
              autoComplete="off"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between align-items-center">
          <Form.Group className="d-flex mt-2 align-items-center">
            <Form.Label className="m-0">Don't have an account yet?</Form.Label>
            <button
              className="signup-btn"
              onClick={handleModalOpen}
              type="submit"
            >
              Sign Up Now
            </button>
          </Form.Group>
          <div className="modal-login-btn-container">
            <button
              type="submit"
              onClick={handleLoginClick}
              className="modal-login-btn"
            >
              Login
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <SignUpModal
        show={signupModalShow}
        onHide={() => handleModalOpen(false)}
        setSignupModalShow={setSignupModalShow}
      />
    </>
  );
}

export default LogInModal;
