import React from "react";
import "./pet-page-skeleton.css";
import { Card } from "react-bootstrap";

function PetPageSkeleton() {
  return (
    <Card className="d-flex col-4 card-pet-page-container border-0 mt-5">
      <div className="pet-page-saved-btn-skeleton" />
      <div className="pet-page-image-skeleton col-12" />
      <div className="pet-page-name-skeleton mt-5 ms-3 rounded align-self-center" />
      <div className="pet-page-text-skeleton mt-5 ms-3 rounded" />
      <div className="pet-page-text-skeleton mt-4 ms-3 rounded" />
      <div className="pet-page-short-text-skeleton mt-4 ms-3 rounded" />
      <div className="pet-page-short-text-skeleton my-4 ms-3 rounded" />
      <div className="d-flex justify-content-around mt-4">
        <div className="pet-page-btn-skeleton mt-5 align-self-center" />
      </div>
    </Card>
  );
}

export default PetPageSkeleton;
