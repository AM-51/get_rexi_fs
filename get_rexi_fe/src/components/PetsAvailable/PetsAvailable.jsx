import React, { useEffect, useState } from "react";
import PetCard from "../PetCard/PetCard";
import { getAvailablePetsData, controller } from "../../util/api";
import { v4 as uuidv4 } from "uuid";

function PetsAvailable() {
  const [availablePetsData, setAvailablePetsData] = useState([]);

  useEffect(() => {
    getAvailablePetsData().then((data) => {
      setAvailablePetsData(data?.pets);
    });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="col-12 mt-5 justify-content-center">
      <div className="d-flex align-items-top justify-content-center">
        <div className="d-flex display-6 col-6 justify-content-center">
          Pets Available for Adoption
        </div>
      </div>
      <div className="d-flex col-12 justify-content-around mt-3 flex-wrap">
        <div className="d-flex col-12 justify-content-evenly flex-wrap">
          {availablePetsData &&
            availablePetsData.map((pet) => (
              <PetCard key={uuidv4()} pet={pet} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default PetsAvailable;
