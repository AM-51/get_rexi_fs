import React, { useEffect, useState } from "react";
import PetsList from "../PetsList/PetsList";
import { getAllPetsData, controller } from "../../util/api";

function AllPets() {
  const [allPetsData, setAllPetsData] = useState([]);

  useEffect(async () => {
    try {
      const response = await getAllPetsData();
      setAllPetsData(response.pets);
    } catch (err) {
      console.log(err);
    }
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <div className="d-flex flex-column col-12 align-items-center v-50 mt-5">
        <p className="display-5">All Pets</p>
        {allPetsData && <PetsList petsData={allPetsData} />}
      </div>
    </>
  );
}

export default AllPets;
