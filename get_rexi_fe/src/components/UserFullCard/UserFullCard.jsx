import React, { useState } from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./user-full-card.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getFullUsersData } from "../../util/api";
import UserMoreInfo from "../UserMoreInfo/UserMoreInfo";

function UserFullCard(props) {
  const [usersFullData, setsUsersFullData] = useState([]);
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [isMoreInfoLoading, setIsMoreInfoLoading] = useState(false);

  const handleSeeMorInfoOpen = async (e) => {
    e.preventDefault();
    setOpenMoreInfo((prev) => !prev);
    setIsMoreInfoLoading((prev) => !prev);
    try {
      getFullUsersData(props.user.id).then((response) => {
        setsUsersFullData(response);
        setIsMoreInfoLoading((prev) => !prev);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSeeMorInfoClose = (e) => {
    e.preventDefault();
    setOpenMoreInfo((prev) => !prev);
  };

  return (
    <>
      <Card className="d-flex flex-row col-10 user-card-container border-0 mt-3 justify-content-between align-items-center px-3">
        <div>
          <span className="fs-4 p-0 me-2">
            <b>Full Name:</b> {props.user.firstName} {props.user.lastName}
          </span>{" "}
          <span className="fs-4 p-0 m-0 email-title">
            <b>Email:</b> {props.user.email}
          </span>
        </div>
        {!openMoreInfo && (
          <OverlayTrigger
            key="top"
            placement="top"
            overlay={<Tooltip>See more information</Tooltip>}
          >
            <button
              onClick={handleSeeMorInfoOpen}
              className="d-flex justify-content-center align-items-center user-card-more-data-btn"
            >
              <IoIosArrowDown className="user-card-more-data-icon" />
            </button>
          </OverlayTrigger>
        )}
        {openMoreInfo && (
          <button
            onClick={handleSeeMorInfoClose}
            className="d-flex justify-content-center align-items-center user-card-more-data-btn"
          >
            <IoIosArrowUp className="user-card-more-data-icon" />
          </button>
        )}
      </Card>
      {openMoreInfo && (
        <UserMoreInfo
          usersFullData={usersFullData}
          isLoading={isMoreInfoLoading}
        />
      )}
    </>
  );
}

export default UserFullCard;
