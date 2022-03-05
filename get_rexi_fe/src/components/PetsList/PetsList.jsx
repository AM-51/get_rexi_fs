import React from "react";
import PetCard from "../PetCard/PetCard";
import { v4 as uuidv4 } from "uuid";

function PetsList(props) {
  const removePet = (id) => {
    props.setPetsData((prevSavedPets) =>
      prevSavedPets.filter((pet) => pet.id !== id)
    );
  };

  return (
    <div className="d-flex col-12 justify-content-center">
      <div className="d-flex col-8 justify-content-evenly flex-wrap">
        {props.petsData &&
          props.petsData.map((pet) => (
            <PetCard key={uuidv4()} pet={pet} removePet={removePet} />
          ))}
      </div>
    </div>
  );
}

export default PetsList;
