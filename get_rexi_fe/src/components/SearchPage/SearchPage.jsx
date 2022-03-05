import React from "react";
import SearchForm from "../SearchForm/SearchForm";

function SearchPage() {
  return (
    <>
      <div className="d-flex flex-column flex-grow-1 col-12 align-items-center v-50 mt-5">
        <p className="display-5">Search for a Pet</p>
      </div>
      <SearchForm />
    </>
  );
}

export default SearchPage;
