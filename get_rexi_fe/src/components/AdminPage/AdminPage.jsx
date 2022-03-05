import React, { useState } from "react";
import "./admin-page.css";
import { IconContext } from "react-icons";
import { VscListUnordered } from "react-icons/vsc";
import { SiDatadog } from "react-icons/si";
import { GiRabbit, GiSittingDog, GiCat } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import AddNewPetModal from "../AddNewPetModal/AddNewPetModal";

function AdminPage() {
  const [addNewPetModalShow, setAddNewPetModalShow] = useState(false);

  const navigate = useNavigate();

  const handleAllUsersPageOpen = () => navigate("/all-users-page");

  const handleAllPetsPageOpen = () => navigate("/all-pets-page");

  const handleModalState = () => setAddNewPetModalShow((prev) => !prev);

  return (
    <div className="d-flex align-items-center justify-content-evenly col-12 admin-page-container mt-5">
      <div>
        <button onClick={handleModalState} className="add-new-pet-btn">
          <p className="fs-5 dashboard-text-light">Add new PET</p>
          <IconContext.Provider value={{ color: "#fae5df" }}>
            <SiDatadog className="list-icon" />
          </IconContext.Provider>
        </button>
      </div>
      <div>
        <button onClick={handleAllUsersPageOpen} className="show-all-users-btn">
          <p className="fs-5 dashboard-text-dark">All USERS</p>
          <IconContext.Provider value={{ color: "#3a3b83" }}>
            <VscListUnordered className="list-icon" />
          </IconContext.Provider>
        </button>
      </div>
      <div>
        <button onClick={handleAllPetsPageOpen} className="all-pets-card-btn">
          <p className="fs-5 dashboard-text-dark">All PETS</p>
          <IconContext.Provider value={{ color: "#3a3b83" }}>
            <div className="d-flex justify-content-center">
              <div className="d-flex col-5 align-items-center justify-content-evenly list-multi-icon-container">
                <GiRabbit className="list-multi-icon" />
                <GiCat className="list-multi-icon" />
                <GiSittingDog className="list-multi-icon" />
              </div>
            </div>
          </IconContext.Provider>
        </button>
      </div>
      <AddNewPetModal
        closeModal={handleModalState}
        show={addNewPetModalShow}
        onHide={() => setAddNewPetModalShow(false)}
      />
    </div>
  );
}

export default AdminPage;
