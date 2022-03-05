import React, { useEffect, useState } from "react";
import PetsList from "../PetsList/PetsList";
import { useParams } from "react-router-dom";
import { getPetByUserID, controller } from "../../util/api";

function MyPetsPage() {
  const [isMyPetsEmpty, setIsMyPetsEmpty] = useState(false);
  const [myPetsData, setMyPetsData] = useState([]);

  const userId = useParams();

  useEffect(async () => {
    try {
      const response = await getPetByUserID(userId);
      setMyPetsData(response?.pets);
      setIsMyPetsEmpty(response?.pets === 0);
    } catch (err) {
      console.log(err);
    }
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="d-flex flex-column col-12 align-items-center v-50 mt-5">
        <p className="display-5">My Pets</p>
        {isMyPetsEmpty && <p>You currently don't own or foster any pets.</p>}
      </div>
      {myPetsData && <PetsList petsData={myPetsData} />}
    </div>
  );
}

export default MyPetsPage;
