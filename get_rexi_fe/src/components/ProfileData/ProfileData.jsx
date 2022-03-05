import React, { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import "./profile-data.css";
import { useParams } from "react-router-dom";
import { getUserByID, controller } from "../../util/api";
import { FaIdCardAlt } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";

import { appContext } from "../../context/appContext";
import ProfileDataSkeleton from "../SkelatonLoaders/ProfileDataSkeleton/ProfileDataSkeleton";

function ProfileData(props) {
  const { userData, setUserData } = useContext(appContext);
  const [isProfileDataLoading, setIsProfileDataLoading] = useState(false);

  const userId = useParams();

  useEffect(async () => {
    try {
      setIsProfileDataLoading((prev) => !prev);
      const response = await getUserByID(userId);
      setUserData(response);
      setIsProfileDataLoading((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
    return () => {
      controller.abort();
    };
  }, []);

  const handleEditProfileOpen = (e) => {
    e.preventDefault();
    props.setIsEditProfileOn((prev) => !prev);
  };

  return (
    <div className="d-flex col-12 justify-content-center align-items-center">
      {isProfileDataLoading && <ProfileDataSkeleton />}
      {!isProfileDataLoading && (
        <Card className="d-flex col-6 card-profile-data-container border-0 mt-5 p-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column justify-content-evenly">
              <p className="d-flex fs-4 align-items-center">
                {userData.firstName} {userData.lastName}
                <button
                  onClick={handleEditProfileOpen}
                  type="submit"
                  className="d-flex edit-btn"
                >
                  <FiEdit3 className="edit-icon" />
                </button>
              </p>
              <p className="d-flex fs-5">Email: {userData.email}</p>
              <p className="d-flex fs-5">
                Phone Number: {userData.phoneNumber}
              </p>
            </div>
            <div className="d-flex">
              <FaIdCardAlt className="profile-icon-container" />
            </div>
          </div>
          <div className="d-flex col-12 flex-column profile-bio-container border-0 mt-5 p-3">
            <p className="d-flex fs-5">Tell us about your self...</p>
            <div className="d-flex fs-5">{userData.bio}</div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default ProfileData;
