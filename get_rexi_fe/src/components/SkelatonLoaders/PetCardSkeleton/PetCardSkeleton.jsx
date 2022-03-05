import React from "react";
import "./pet-card-skeleton.css";
import { Card } from "react-bootstrap";

function PetCardSkeleton() {
  return (
    <Card className="d-flex card-pet-container border-0 my-5">
      <div className="pet-card-image-skeleton col-12" />
      <div className="pet-card-name-skeleton rounded mt-3 align-self-center" />
      <div className="d-flex justify-content-around p-3">
        <div className="pet-card-btn-skeleton rounded align-self-center" />
        <div className="pet-card-btn-skeleton rounded align-self-center" />
      </div>
    </Card>
  );
}

export default PetCardSkeleton;
