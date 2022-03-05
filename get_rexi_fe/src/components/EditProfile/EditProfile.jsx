import React, { useState, useContext } from "react";
import { Card, Form } from "react-bootstrap";
import "./edit-profile.css";
import { updateUserData } from "../../util/api";
import { appContext } from "../../context/appContext";

function EditProfile(props) {
  const { userData, setUserData } = useContext(appContext);
  const [profileFirstName, setProfileFirstName] = useState(userData.firstName);
  const [profileLastName, setProfileLastName] = useState(userData.lastName);
  const [profileEmail, setProfileEmail] = useState(userData.email);
  const [profilePassword, setProfilePassword] = useState("");
  const [profileVerifyPassword, setProfileVerifyPassword] = useState("");
  const [profilePhoneNumber, setProfilePhoneNumber] = useState(
    userData.phoneNumber
  );
  const [profileBio, setProfileBio] = useState(userData.bio);

  const handleFirstNameChange = (event) => {
    const { value } = event.target;
    setProfileFirstName(value);
  };

  const handleLastNameChange = (event) => {
    const { value } = event.target;
    setProfileLastName(value);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setProfileEmail(value);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setProfilePassword(value);
  };

  const handleVerifyPasswordChange = (event) => {
    const { value } = event.target;
    setProfileVerifyPassword(value);
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    setProfilePhoneNumber(value);
  };

  const handleBioChange = (event) => {
    const { value } = event.target;
    setProfileBio(value);
  };

  const handleSaveChangesClick = async (e) => {
    e.preventDefault();
    const updateUser = {
      email: profileEmail,
      password: profileVerifyPassword,
      firstName: profileFirstName,
      lastName: profileLastName,
      phoneNumber: profilePhoneNumber,
      bio: profileBio,
      id: userData.id,
    };
    try {
      const response = await updateUserData(updateUser);
      setUserData(response.data.user);
      props.setIsEditProfileOn((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    props.setIsEditProfileOn((prev) => !prev);
  };

  return (
    <div className="d-flex col-12 justify-content-center align-items-center">
      <Card className="d-flex col-6 card-edit-profile-container border-0 mt-5 p-3">
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="edit-profile-input"
            type="text"
            onChange={handleFirstNameChange}
            placeholder="First Name"
            plaintext
            autoComplete="off"
            value={profileFirstName}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="edit-profile-input"
            type="text"
            onChange={handleLastNameChange}
            placeholder="Last Name"
            plaintext
            autoComplete="off"
            value={profileLastName}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="edit-profile-input"
            type="email"
            onChange={handleEmailChange}
            placeholder="Email"
            plaintext
            autoComplete="off"
            value={profileEmail}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="edit-profile-input"
            type="number"
            onChange={handlePhoneNumberChange}
            placeholder="Phone Number"
            plaintext
            autoComplete="off"
            value={profilePhoneNumber}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="edit-profile-input"
            type="password"
            onChange={handlePasswordChange}
            placeholder="Password"
            plaintext
            autoComplete="off"
            minLength={6}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="edit-profile-input"
            type="password"
            onChange={handleVerifyPasswordChange}
            placeholder="Verify Password"
            plaintext
            autoComplete="off"
            minLength={6}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            name="bio"
            as="textarea"
            onChange={handleBioChange}
            rows={5}
            placeholder="Add Bio..."
            className="edit-profile-input edit-profile-textarea rounded p-1"
            maxLength={300}
            plaintext
            value={profileBio}
          />
        </Form.Group>
        <div className="d-flex justify-content-between edit-profile-btn-container">
          <button
            type="submit"
            onClick={handleCancelClick}
            className="edit-profile-btn"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSaveChangesClick}
            className="edit-profile-btn"
          >
            Save Changes
          </button>
        </div>
      </Card>
    </div>
  );
}

export default EditProfile;
