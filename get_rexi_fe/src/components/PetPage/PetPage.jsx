import React, { useState, useEffect, useContext } from "react";
import { Card, Badge, Tooltip, OverlayTrigger } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GiReturnArrow } from "react-icons/gi";
import { FiEdit3 } from "react-icons/fi";
import "./pet-page.css";
import {
  getPetByID,
  fosterPet,
  adoptPet,
  returnPet,
  addPetToSavedPets,
  removePetFromSavedPets,
  savedPets,
  controller,
} from "../../util/api";
import { useParams } from "react-router-dom";
import { appContext } from "../../context/appContext";
import PetPageSkeleton from "../SkelatonLoaders/PetPageSkeleton/PetPageSkeleton";
import EditPetModal from "../EditPetModal/EditPetModal";

function PetPage() {
  const { userData, setLoginModalShow } = useContext(appContext);
  const [isSavedPetPage, setIsSavedPetPage] = useState(false);
  const [petData, setPetData] = useState([]);
  const [petStatus, setPetStatus] = useState("");

  const [isOwner, setIsOwner] = useState(false);
  const [isFostered, setIsFostered] = useState(false);
  const [isAdopted, setIsAdopted] = useState(false);

  const [isPetPageLoading, setIsPetPageLoading] = useState(false);
  const [showAddToSavedPet, setShowAddToSavedPet] = useState(false);
  const [editPetModalShow, setEditPetModalShow] = useState(false);

  const petId = useParams();

  useEffect(() => {
    setIsPetPageLoading((prev) => !prev);
    getPetByID(petId).then((response) => {
      setPetData(response);
      setPetStatus(response?.status);
      setIsOwner(userData?.id === response.ownerId);
      setIsFostered(response.status === "Fostered");
      setIsAdopted(response.status === "Adopted");
      setIsPetPageLoading((prev) => !prev);
    });
    return () => {
      controller.abort();
    };
  }, [editPetModalShow]);

  useEffect(() => {
    if (!userData) {
      setIsSavedPetPage(false);
    } else {
      savedPets().then((response) => {
        checkIfPetSaved(response.savedPet);
      });
    }
    return () => {
      controller.abort();
    };
  }, []);

  const checkIfPetSaved = (savedPetsArray) => {
    savedPetsArray.forEach((pet) => {
      if (pet.petId === petId.petId && pet.userId === userData?.id)
        return setIsSavedPetPage(true);
    });
  };

  const handleFosterPetClick = async (e) => {
    e.preventDefault();
    const fosterPetData = {
      ownerId: userData.id,
      petId: petId.petId,
      status: "Fostered",
    };
    try {
      await fosterPet(fosterPetData);
      setIsFostered((prev) => !prev);
      setIsOwner((prev) => !prev);
      setPetStatus("Fostered");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdoptPetClick = async (e) => {
    e.preventDefault();
    const adoptPetData = {
      ownerId: userData.id,
      petId: petId.petId,
      status: "Adopted",
    };
    try {
      await adoptPet(adoptPetData);
      setIsAdopted((prev) => !prev);
      setIsOwner(true);
      setPetStatus("Adopted");
    } catch (err) {
      console.log(err);
    }
  };

  const handleReturnPetClick = async (e) => {
    e.preventDefault();
    const returnPetData = {
      ownerId: null,
      petId: petId.petId,
      status: "Available",
    };
    try {
      await returnPet(returnPetData);
      setIsFostered(false);
      setIsAdopted(false);
      setIsOwner(false);
      setPetStatus("Available");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSavedPetsAdd = async (e) => {
    e.preventDefault();
    if (!userData) {
      setLoginModalShow((prev) => !prev);
    } else {
      const petToSave = {
        userId: userData.id,
        userName: userData.firstName + " " + userData.lastName,
        petId: petId.petId,
        petName: petData.name,
      };
      setShowAddToSavedPet((prev) => !prev);
      try {
        await addPetToSavedPets(petToSave);
        setIsSavedPetPage((prev) => !prev);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => {
          setShowAddToSavedPet((prev) => !prev);
        }, 2500);
      }
    }
  };

  const handleSavedPetsRemove = async (e) => {
    e.preventDefault();
    const petToRemove = {
      userId: userData.id,
      petId: petId.petId,
    };
    try {
      await removePetFromSavedPets(petToRemove);
      setIsSavedPetPage((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditPetModalOpen = () => setEditPetModalShow((prev) => !prev);

  const checkStatusForColor = () => {
    if (petStatus === "Fostered")
      return "pet-status-badge text-dark bg-warning";
    if (petStatus === "Adopted") return "pet-status-badge bg-danger";
    else return "pet-status-badge page-badge-bg-success text-dark";
  };

  return (
    <div className="d-flex col-12 justify-content-around align-items-center">
      {isPetPageLoading && <PetPageSkeleton />}
      {!isPetPageLoading && (
        <Card className="d-flex card-pet-page-container border-0 mt-5">
          <Badge className={checkStatusForColor()}>
            {petStatus || petData.status}
          </Badge>{" "}
          {!isAdopted && !isSavedPetPage && (
            <button
              onClick={handleSavedPetsAdd}
              className="d-flex justify-content-center align-items-center pet-page-save-btn"
            >
              <AiOutlineHeart className="pet-page-save-icon" />
            </button>
          )}
          {!isAdopted && isSavedPetPage && (
            <button
              onClick={handleSavedPetsRemove}
              className="d-flex justify-content-center align-items-center pet-page-save-btn"
            >
              <AiFillHeart className="pet-page-save-icon" />
            </button>
          )}
          <div className="card-pet-page-image">
            {petData.image ? (
              <img
                className="pet-page-image-placeholder col-12"
                src={petData.image}
                alt="Pet"
              />
            ) : (
              <img
                className="pet-page-image-placeholder col-12"
                src="/images/image_placeholder.png"
                alt="Placeholder"
              />
            )}
          </div>
          {showAddToSavedPet && (
            <p className="d-flex justify-content-center col-12 added-to-saved-pets">
              <small>Added To Saved Pets</small>
            </p>
          )}
          <div className="d-flex justify-content-center align-items-center">
            <p className="d-flex justify-content-center mt-3 fs-3">
              {petData.name}
            </p>
            {!!userData?.isAdmin && (
              <button
                onClick={handleEditPetModalOpen}
                className="d-flex justify-content-center align-items-center pet-page-edit-pet-btn ms-3"
              >
                <FiEdit3 className="pet-page-edit-pet-icon" />
              </button>
            )}
          </div>
          <div className="d-flex col-12 flex-column align-items-start px-4">
            <p className="d-flex justify-content-center fs-5">
              This {petData.type} is of the breed of {petData.breed}.{" "}
              {petData.name} is {petData.height} cm tall and weights{" "}
              {petData.weight} kg.
            </p>
            <p className="d-flex justify-content-center fs-5">
              Color: {petData.color}.
            </p>
            <p className="d-flex justify-content-center fs-5">
              Hypoallergenic: {petData.hypoallergenic ? "Yes" : "No"}.
            </p>
            <p className="d-flex justify-content-center fs-5">
              Bio: {petData.bio}.
            </p>
            <p className="d-flex justify-content-center fs-5">
              Dietary Restrictions: {petData.dietary}.
            </p>
          </div>
          <div className="d-flex col-12 align-items-center mt-2">
            {userData && !isAdopted && (
              <button onClick={handleAdoptPetClick} className="adopt-now-btn">
                Adopt Now
              </button>
            )}
            {isOwner && (
              <OverlayTrigger
                key="top"
                placement="top"
                overlay={<Tooltip>Return Pet</Tooltip>}
              >
                <button
                  onClick={handleReturnPetClick}
                  className="d-flex justify-content-center flex-grow-1 mb-2 align-items-center pet-page-return-btn"
                >
                  <GiReturnArrow className="pet-page-return-icon" />
                </button>
              </OverlayTrigger>
            )}
            {userData && !isFostered && !isAdopted && (
              <button onClick={handleFosterPetClick} className="foster-now-btn">
                Foster Now
              </button>
            )}
          </div>
        </Card>
      )}
      <EditPetModal
        petId={petId}
        petData={petData}
        modalShow={setEditPetModalShow}
        show={editPetModalShow}
        onHide={() => setEditPetModalShow(false)}
      />
    </div>
  );
}

export default PetPage;
