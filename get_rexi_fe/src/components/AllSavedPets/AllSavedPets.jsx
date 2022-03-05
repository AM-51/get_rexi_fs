import React, { useEffect, useState, useContext } from "react";
import { appContext } from "../../context/appContext";
import PetsList from "../PetsList/PetsList";
import { savedPetsByUser, controller } from "../../util/api";

function AllSavedPets() {
  const { userData } = useContext(appContext);
  const [isPageEmpty, setIsPageEmpty] = useState(false);
  const [savedPetsDataByUser, setSavedPetsDataByUser] = useState([]);

  useEffect(() => {
    savedPetsByUser(userData?.id).then((response) => {
      setSavedPetsDataByUser(response?.pets);
      setIsPageEmpty(response?.pets === 0);
    });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="d-flex flex-column col-12 align-items-center v-50 mt-5">
        <p className="display-5">My Saved Pets</p>
        {isPageEmpty && <p>You currently don't saved any pets.</p>}
      </div>
      {savedPetsDataByUser && (
        <PetsList
          petsData={savedPetsDataByUser}
          setPetsData={setSavedPetsDataByUser}
        />
      )}
    </div>
  );
}

export default AllSavedPets;
