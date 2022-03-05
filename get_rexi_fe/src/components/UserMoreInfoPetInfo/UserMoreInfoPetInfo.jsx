import React from "react";
import "./user-more-info-pet-info.css";
import { useNavigate } from "react-router-dom";
import { BiExpand } from "react-icons/bi";

function UserMoreInfoPetInfo(props) {
  const navigate = useNavigate();

  const handlePetMoreInfoOpen = async () =>
    navigate(`/pet-page/${props.pet.id}`);

  const checkStatusForColor = () => {
    if (props.pet.status === "Fostered")
      return "status-small-circle text-dark bg-warning";
    if (props.pet.status === "Adopted") return "status-small-circle bg-danger";
  };

  return (
    <div className="d-flex col-12 justify-content-between border-bottom mb-2">
      <div className="d-flex col-10 align-items-center mb-2">
        <div className="status-small-circle-container">
          <div className={checkStatusForColor()}></div>
        </div>
        {props.pet.image ? (
          <img className="pet-small-image" src={props.pet.image} alt="Pet" />
        ) : (
          <img
            className="pet-small-image"
            src="/images/image_placeholder.png"
            alt="Placeholder"
          />
        )}
        <p className="fs-6 p-0 my-0 mx-2 name-row">
          <b>Name:</b> {props.pet.name}
        </p>
        <p className="fs-6 p-0 my-0 mx-2 type-row">
          <b>Type:</b> {props.pet.type}
        </p>
      </div>
      <div className="d-flex align-items-center">
        <button
          onClick={handlePetMoreInfoOpen}
          className="d-flex justify-content-center align-items-center more-info-btn"
        >
          <BiExpand className="more-info-icon" />
        </button>
      </div>
    </div>
  );
}

export default UserMoreInfoPetInfo;
