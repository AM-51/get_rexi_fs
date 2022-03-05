import React from "react";
import "./all-users-skeleton.css";

function AllUsersSkeleton() {
  return (
    <div className="d-flex col-10 all-users-container border-0 rounded">
      <div className="d-flex col-5 flex-column me-5 mt-4">
        <div className="all-users-name-skeleton ms-3 rounded" />
        <div className="all-users-short-text-skeleton mt-4 ms-3 rounded" />
        <div className="all-users-short-text-skeleton mt-4 ms-3 rounded" />
        <div className="all-users-short-text-skeleton my-4 ms-3 rounded" />
      </div>
      <div className="d-flex col-5 flex-column right-side-wrapper mt-4">
        <div className="all-users-name-skeleton ms-3 rounded" />
        <div className="d-flex align-items-center ms-3 mt-3">
          <div className="all-users-saved-btn-skeleton" />
          <div className="all-users-short-text-skeleton ms-3 rounded" />
        </div>
        <div className="d-flex align-items-center ms-3 mt-3">
          <div className="all-users-saved-btn-skeleton" />
          <div className="all-users-short-text-skeleton ms-3 rounded" />
        </div>
      </div>
    </div>
  );
}

export default AllUsersSkeleton;
