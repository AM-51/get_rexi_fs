import React from "react";
import PetsAvailable from "../PetsAvailable/PetsAvailable";
import "./home.css";
import { MdPets } from "react-icons/md";

function Home() {
  return (
    <>
      <div className="d-flex col-12 mt-5">
        <div className="d-flex flex-column col-8 align-items-center card-container p-5 home-main-header">
          <p className="d-flex display-5 align-items-center">
            Welcome to GetRexi
            <MdPets className="ms-2 home-main-logo" />
          </p>

          <p className="fs-5 about-p col-10">
            We envision a future where every pet has a loving home. We’re making
            it easier than ever to find the perfect new addition to your family.
          </p>
        </div>
        <img
          src="/images/family_home.jpg"
          alt="Home pic"
          className="home-main-img col-4"
        />
      </div>
      <PetsAvailable />
    </>
  );
}

export default Home;
