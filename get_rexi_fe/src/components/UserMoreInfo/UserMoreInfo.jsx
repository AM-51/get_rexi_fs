import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./user-more-info.css";
import UserMoreInfoPetInfo from "../UserMoreInfoPetInfo/UserMoreInfoPetInfo";
import AllUsersSkeleton from "../SkelatonLoaders/AllUsersSkeleton/AllUsersSkeleton";
import { BsShieldLock, BsShieldX } from "react-icons/bs";
import RemoveAdminAlertModal from "../RemoveAdminAlertModal/RemoveAdminAlertModal";
import AddAdminAlertModal from "../AddAdminAlertModal/AddAdminAlertModal";
import { v4 as uuidv4 } from "uuid";

function UserMoreInfo(props) {
  const [showRemoveAlertModal, setShowRemoveAlertModal] = useState(false);
  const [showAddAlertModal, setShowAddAlertModal] = useState(false);

  const handleRemoveAlertModalShow = () =>
    setShowRemoveAlertModal((prev) => !prev);

  const handleAddAlertModalShow = () => setShowAddAlertModal((prev) => !prev);

  return (
    <>
      {props.isLoading && <AllUsersSkeleton />}
      {!props.isLoading && (
        <Card className="d-flex flex-row col-10 user-more-info-container border-0 m-0 justify-content-between p-4">
          <div className="d-flex col-7 more-info-wrapper flex-column">
            <p className="fs-5 p-0 me-2">
              <b>Additional Info</b>
            </p>
            <p className="fs-6 p-0 me-2 email-row">
              <b>Email:</b> {props.usersFullData.email}
            </p>
            <p className="fs-6 p-0 me-2">
              <b>Phone Number:</b> {props.usersFullData.phoneNumber}
            </p>
            <p className="fs-6 p-0 me-2">
              <b>Bio:</b> {props.usersFullData.bio}
            </p>
            <div className="d-flex lg-col-8 sm-col-12 admin-row-container">
              <p className="fs-6 p-0 me-2">
                <b>Is Admin:</b>{" "}
                {props.usersFullData.isAdmin === 0 ? "No" : "Yes"}
              </p>
              {!props.usersFullData.isAdmin && (
                <button
                  onClick={handleAddAlertModalShow}
                  className="d-flex add-admin-btn rounded border-0 align-items-center justify-content-between"
                >
                  <div className="btn-txt">Promote to Admin</div>
                  <BsShieldLock className="admin-icon" />
                </button>
              )}
              {!!props.usersFullData.isAdmin && (
                <button
                  onClick={handleRemoveAlertModalShow}
                  className="d-flex remove-admin-btn rounded border-0 align-items-center justify-content-between"
                >
                  <div className="btn-txt">Remove Admin Privileges</div>
                  <BsShieldX className="admin-icon" />
                </button>
              )}
            </div>
          </div>
          <div className="d-flex col-5 flex-column more-info-wrapper">
            <p className="fs-5 p-0">
              <b>Pets Owned</b>
            </p>
            {props.usersFullData.ownedPets &&
              props.usersFullData.ownedPets.map((pet) => (
                <UserMoreInfoPetInfo key={uuidv4()} pet={pet} />
              ))}
          </div>
        </Card>
      )}
      <RemoveAdminAlertModal
        showModal={showRemoveAlertModal}
        setShowModal={setShowRemoveAlertModal}
        userFullData={props.usersFullData}
      />
      <AddAdminAlertModal
        showModal={showAddAlertModal}
        setShowModal={setShowAddAlertModal}
        userFullData={props.usersFullData}
      />
    </>
  );
}

export default UserMoreInfo;
