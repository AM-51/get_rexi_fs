import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import "./search-form.css";
import { HiOutlineSearch } from "react-icons/hi";
import PetsList from "../PetsList/PetsList";
import { getPetsData } from "../../util/api";

function SearchForm() {
  const [isAdvancedSearchChecked, setIsAdvancedSearchChecked] = useState(false);
  const [petsData, setPetsData] = useState([]);
  const [searchDogType, setSearchDogType] = useState("");
  const [searchCatType, setSearchCatType] = useState("");
  const [searchHorseType, setSearchHorseType] = useState("");
  const [searchRabbitType, setSearchRabbitType] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchMinHeight, setSearchMinHeight] = useState(0);
  const [searchMaxHeight, setSearchMaxHeight] = useState(500);
  const [searchMinWeight, setSearchMinWeight] = useState(0);
  const [searchMaxWeight, setSearchMaxWeight] = useState(500);

  const handleIsAdvancedSearchCheckedChange = () =>
    setIsAdvancedSearchChecked((prev) => !prev);

  const handleDogTypeChange = (event) => {
    const { checked } = event.target;
    checked ? setSearchDogType("Dog") : setSearchDogType("");
  };

  const handleCatTypeChange = (event) => {
    const { checked } = event.target;
    checked ? setSearchCatType("_Cat") : setSearchCatType("");
  };

  const handleHorseTypeChange = (event) => {
    const { checked } = event.target;
    checked ? setSearchHorseType("_Horse") : setSearchHorseType("");
  };

  const handleRabbitTypeChange = (event) => {
    const { checked } = event.target;
    checked ? setSearchRabbitType("_Rabbit") : setSearchRabbitType("");
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setSearchName(value);
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setSearchStatus(value);
  };

  const handleMinHeightChange = (event) => {
    const { value } = event.target;
    setSearchMinHeight(value);
  };

  const handleMaxHeightChange = (event) => {
    const { value } = event.target;
    setSearchMaxHeight(value);
  };

  const handleMinWeightChange = (event) => {
    const { value } = event.target;
    setSearchMinWeight(value);
  };

  const handleMaxWeightChange = (event) => {
    const { value } = event.target;
    setSearchMaxWeight(value);
  };

  const handleSearchPetsClick = async (e) => {
    e.preventDefault();
    const petToSearch = {
      type: searchDogType + searchCatType + searchHorseType + searchRabbitType,
      status: searchStatus,
      name: searchName,
      minHeight: searchMinHeight,
      maxHeight: searchMaxHeight,
      minWeight: searchMinWeight,
      maxWeight: searchMaxWeight,
    };
    try {
      const response = await getPetsData(petToSearch);
      setPetsData(response.pets);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Form className="d-flex col-12 justify-content-center">
        <Card className="d-flex flex-column col-8 justify-content-center form-container p-4 search-container">
          <Form.Label>Select pets to filter</Form.Label>
          <div className="d-flex types-container">
            <Form.Check
              onChange={handleDogTypeChange}
              type="checkbox"
              label="Dog"
              id="checkbox"
              className="mt-1 me-4"
            />
            <Form.Check
              onChange={handleCatTypeChange}
              type="checkbox"
              label="Cat"
              id="checkbox"
              className="mt-1 me-4"
            />
            <Form.Check
              onChange={handleHorseTypeChange}
              type="checkbox"
              label="Horse"
              id="checkbox"
              className="mt-1 me-4"
            />
            <Form.Check
              onChange={handleRabbitTypeChange}
              type="checkbox"
              label="Rabbit"
              id="checkbox"
              className="mt-1 mb-4 me-4"
            />
          </div>
          <Form.Check
            type="checkbox"
            onChange={handleIsAdvancedSearchCheckedChange}
            label="Advanced search"
            id="checkbox"
            className="mt-4"
          />
          {isAdvancedSearchChecked && (
            <div className="d-flex flex-column">
              <Form.Select
                onChange={handleStatusChange}
                className="select-option border-0 border-bottom mt-3"
              >
                <option className="option-style" selected disabled>
                  Adoption Status
                </option>
                <option className="option-style">Available</option>
                <option className="option-style">Fostered</option>
              </Form.Select>
              <Form.Control
                onChange={handleNameChange}
                type="text"
                placeholder="Pet Name"
                className="input mt-3 border-0 border-bottom"
              />
              <div className="d-flex flex-column col-12">
                <div className="d-flex height-container">
                  <Form.Control
                    onChange={handleMinHeightChange}
                    type="number"
                    placeholder="Min Height in CM"
                    className="input mt-3 me-3 border-0 border-bottom"
                  />
                  <Form.Control
                    onChange={handleMaxHeightChange}
                    type="number"
                    placeholder="Max Height in CM"
                    className="input mt-3 border-0 border-bottom"
                  />
                </div>
                <div className="d-flex weight-container">
                  <Form.Control
                    onChange={handleMinWeightChange}
                    type="number"
                    placeholder="Min Weight in KG"
                    className="input mt-3 me-3 border-0 border-bottom"
                  />
                  <Form.Control
                    onChange={handleMaxWeightChange}
                    type="number"
                    placeholder="Max Weight in KG"
                    className="input mt-3 border-0 border-bottom"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="search-btn-container">
            <button onClick={handleSearchPetsClick} className="search-btn mt-4">
              <HiOutlineSearch />
            </button>
          </div>
        </Card>
      </Form>
      <PetsList petsData={petsData} />
    </>
  );
}

export default SearchForm;
