import React, { useState, useContext, useEffect } from "react";
import { Card, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiExpand } from "react-icons/bi";
import "./pet-card.css";
import { useNavigate } from "react-router-dom";
import { appContext } from "../../context/appContext";
import {
  addPetToSavedPets,
  removePetFromSavedPets,
  savedPets,
  controller,
} from "../../util/api";
import PetCardSkeleton from "../SkelatonLoaders/PetCardSkeleton/PetCardSkeleton";

function PetCard(props) {
  const { userData, setLoginModalShow, isLoginClicked } =
    useContext(appContext);
  const [isSavedPetCard, setIsSavedPetCard] = useState(false);
  const [showAddToSavedPetCard, setShowAddToSavedPetCard] = useState(false);
  const [isPetCardLoading, setIsPetCardLoading] = useState(false);

  const navigate = useNavigate();

  const handlePetPageOpen = async () => navigate(`/pet-page/${props.pet.id}`);

  useEffect(() => {
    if (!userData) {
      setIsSavedPetCard(false);
    } else {
      setIsPetCardLoading((prev) => !prev);
      savedPets().then((response) => {
        checkIfPetSaved(response?.savedPet);
      });
      setIsPetCardLoading((prev) => !prev);
    }
    return () => {
      controller.abort();
    };
  }, [isLoginClicked]);

  const checkIfPetSaved = (savedPetsArray) => {
    savedPetsArray.forEach((pet) => {
      if (pet.petId === props.pet.id && pet.userId === userData?.id)
        return setIsSavedPetCard(true);
    });
  };

  const handleSavedPetsAdd = async (e) => {
    e.preventDefault();
    if (!userData) {
      setLoginModalShow((prev) => !prev);
    } else {
      const petToSave = {
        userId: userData.id,
        userName: userData.firstName + " " + userData.lastName,
        petId: props.pet.id,
        petName: props.pet.name,
      };
      try {
        await addPetToSavedPets(petToSave);
        setShowAddToSavedPetCard((prev) => !prev);
        setIsSavedPetCard((prev) => !prev);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => {
          setShowAddToSavedPetCard((prev) => !prev);
        }, 2500);
      }
    }
  };

  const handleSavedPetsRemove = async (e) => {
    e.preventDefault();
    const petToRemove = {
      userId: userData.id,
      petId: props.pet.id,
    };
    try {
      await removePetFromSavedPets(petToRemove);
      setIsSavedPetCard((prev) => !prev);
      props.removePet(props.pet.id);
    } catch (err) {
      console.log(err);
    }
  };

  const checkStatusForColor = () => {
    if (props.pet.status === "Fostered")
      return "pet-status-badge text-dark bg-warning";
    if (props.pet.status === "Adopted") return "pet-status-badge bg-danger";
    else return "pet-status-badge text-dark badge-bg-success";
  };

  return (
    <>
      {isPetCardLoading && <PetCardSkeleton />}
      {!isPetCardLoading && (
        <Card className="d-flex card-pet-container border-0 my-5">
          <Badge className={checkStatusForColor()}>{props.pet.status}</Badge>{" "}
          <div className="d-flex justify-content-center align-items-center card-pet-image">
            {props.pet.image ? (
              <img
                className="image-placeholder"
                src={props.pet.image}
                alt="Pet Image"
              />
            ) : (
              <img
                className="image-placeholder"
                src="/images/image_placeholder.png"
                alt="Image Placeholder"
              />
            )}
          </div>
          {showAddToSavedPetCard && (
            <p className="d-flex justify-content-center col-12 added-to-saved-pets-card">
              <small>Added To Saved Pets</small>
            </p>
          )}
          <div className="d-flex justify-content-center">{props.pet.name}</div>
          <div className="d-flex justify-content-around align-items-center flex-grow-1 p-2">
            {!isSavedPetCard && (
              <button
                onClick={handleSavedPetsAdd}
                className="d-flex justify-content-center align-items-center save-btn"
              >
                <AiOutlineHeart className="save-icon" />
              </button>
            )}
            {isSavedPetCard && (
              <button
                onClick={handleSavedPetsRemove}
                className="d-flex justify-content-center align-items-center save-btn"
              >
                <AiFillHeart className="save-icon" />
              </button>
            )}
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={<Tooltip>See More Details</Tooltip>}
            >
              <button
                onClick={handlePetPageOpen}
                className="d-flex justify-content-center align-items-center more-btn"
              >
                <BiExpand className="more-icon" />
              </button>
            </OverlayTrigger>
          </div>
        </Card>
      )}
    </>
  );
}

export default PetCard;
