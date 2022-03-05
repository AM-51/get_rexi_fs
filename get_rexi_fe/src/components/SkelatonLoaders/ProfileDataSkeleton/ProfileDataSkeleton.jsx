import React from "react";
import "./profile-data-skeleton.css";
import { Card } from "react-bootstrap";

function ProfileDataSkeleton() {
  return (
    <Card className="d-flex col-6 card-profile-data-container border-0 mt-5 p-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column w-100">
          <div className="profile-data-name-skeleton rounded" />
          <div className="profile-data-text-skeleton mt-4 rounded" />
          <div className="profile-data-text-skeleton my-4 rounded" />
        </div>
        <div className="d-flex justify-content-end w-100">
          <div className="profile-data-icon-skeleton rounded" />
        </div>
      </div>
      <div className="profile-data-bio-skeleton col-12 rounded mt-5" />
    </Card>
  );
}

export default ProfileDataSkeleton;
