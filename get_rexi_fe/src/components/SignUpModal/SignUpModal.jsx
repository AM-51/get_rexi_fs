import React, { useState, useContext } from "react";
import { Modal, Form } from "react-bootstrap";
import "./signup-modal.css";
import { createNewUser } from "../../util/api";
import { appContext } from "../../context/appContext";

function SignUpModal(props) {
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState(0);
  const [signupPassword, setSignupPassword] = useState("");
  const [signupVerifyPassword, setSignupVerifyPassword] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const { setUserData, setIsLoginClicked } = useContext(appContext);

  const handleFirstNameChange = (event) => {
    const { value } = event.target;
    setSignupFirstName(value);
  };

  const handleLastNameChange = (event) => {
    const { value } = event.target;
    setSignupLastName(value);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setSignupEmail(value);
  };

  const handlePhoneChange = (event) => {
    const { value } = event.target;
    setSignupPhone(Number(value));
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setSignupPassword(value);
  };

  const handleVerifyPasswordChange = (event) => {
    const { value } = event.target;
    if (value === signupPassword) setSignupVerifyPassword(value);
  };

  const handleNewUserAdd = async (e) => {
    e.preventDefault();
    const newUser = {
      email: signupEmail,
      password: signupVerifyPassword,
      firstName: signupFirstName,
      lastName: signupLastName,
      phoneNumber: signupPhone,
    };
    try {
      const response = await createNewUser(newUser);
      setUserData(response.data.user);
      props.setSignupModalShow(false);
      setIsLoginClicked((prev) => !prev);
    } catch (err) {
      if (signupPassword.length < 6) {
        setPasswordLengthError(true);
        throw new Error("password must be at least 6 characters");
      } else setPasswordLengthError(false);
      if (signupVerifyPassword !== signupPassword) {
        setPasswordMatchError(true);
        throw new Error("password dose not match!");
      } else setPasswordMatchError(false);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="signup-input"
            type="text"
            onChange={handleFirstNameChange}
            placeholder="First Name"
            plaintext
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="signup-input"
            type="text"
            onChange={handleLastNameChange}
            placeholder="Last Name"
            plaintext
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="signup-input"
            type="email"
            onChange={handleEmailChange}
            placeholder="Email"
            plaintext
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="signup-input"
            type="number"
            onChange={handlePhoneChange}
            placeholder="Phone Number"
            plaintext
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="signup-input"
            type="password"
            onChange={handlePasswordChange}
            placeholder="Password"
            plaintext
            autoComplete="off"
            minLength={6}
          />
        </Form.Group>
        {passwordLengthError && (
          <p className="mb-3 p-0">
            <small className="text-danger">
              *password must be at least 6 characters
            </small>
          </p>
        )}
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="signup-input"
            type="password"
            onChange={handleVerifyPasswordChange}
            placeholder="Verify Password"
            plaintext
            autoComplete="off"
            minLength={6}
          />
        </Form.Group>
        {passwordMatchError && (
          <p className="mb-3 p-0">
            <small className="text-danger">*password dose not match!</small>
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-signup-btn-container">
          <button
            type="submit"
            onClick={handleNewUserAdd}
            className="modal-signup-btn"
          >
            Sign Up
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default SignUpModal;
