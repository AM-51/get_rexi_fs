import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import "./add-new-pet-modal.css";
import { addNewPet } from "../../util/api";
import { BsPlusCircleDotted } from "react-icons/bs";
import Dropzone from "../Dropzone/Dropzone";

function AddNewPetModal(props) {
  const [addNewPetStatus, setAddNewPetStatus] = useState("");
  const [addNewPetType, setAddNewPetType] = useState("");
  const [addNewPetName, setAddNewPetName] = useState("");
  const [addNewPetBreed, setAddNewPetBreed] = useState("");
  const [addNewPetColor, setAddNewPetColor] = useState("");
  const [addNewPetHeight, setAddNewPetHeight] = useState(0);
  const [addNewPetWeight, setAddNewPetWeight] = useState(0);
  const [addNewPetDietaryRestrictions, setAddNewPetDietaryRestrictions] =
    useState("");
  const [addNewPetBio, setAddNewPetBio] = useState("");
  const [addNewPetHypoallergenic, setAddNewPetHypoallergenic] = useState(
    Number(0)
  );
  const [addNewPetImage, setAddNewPetImage] = useState([]);
  const [dropzoneShow, setDropzoneShow] = useState(false);

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setAddNewPetStatus(value);
  };

  const handleTypeChange = (event) => {
    const { value } = event.target;
    setAddNewPetType(value);
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setAddNewPetName(value);
  };

  const handleBreedChange = (event) => {
    const { value } = event.target;
    setAddNewPetBreed(value);
  };

  const handleColorChange = (event) => {
    const { value } = event.target;
    setAddNewPetColor(value);
  };

  const handleBioChange = (event) => {
    const { value } = event.target;
    setAddNewPetBio(value);
  };

  const handleDietaryRestrictionsChange = (event) => {
    const { value } = event.target;
    setAddNewPetDietaryRestrictions(value);
  };

  const handleHeightChange = (event) => {
    const { value } = event.target;
    setAddNewPetHeight(Number(value));
  };

  const handleWeightChange = (event) => {
    const { value } = event.target;
    setAddNewPetWeight(Number(value));
  };

  const handleHypoallergenicChange = (event) => {
    const { value } = event.target;
    if (value === "Yes") setAddNewPetHypoallergenic(true);
    else setAddNewPetHypoallergenic(false);
  };

  const handleDropzoneShow = () => {
    setDropzoneShow(!dropzoneShow);
  };

  const handleNewPetAdd = async (e) => {
    e.preventDefault();
    let newPetFormData = new FormData();
    newPetFormData.append("status", addNewPetStatus);
    newPetFormData.append("type", addNewPetType);
    newPetFormData.append("name", addNewPetName);
    newPetFormData.append("breed", addNewPetBreed);
    newPetFormData.append("color", addNewPetColor);
    newPetFormData.append("height", addNewPetHeight);
    newPetFormData.append("weight", addNewPetWeight);
    newPetFormData.append("dietary", addNewPetDietaryRestrictions);
    newPetFormData.append("bio", addNewPetBio);
    newPetFormData.append("hypoallergenic", addNewPetHypoallergenic);
    newPetFormData.append("image", addNewPetImage, addNewPetImage.name);
    try {
      await addNewPet(newPetFormData);
    } catch (err) {
      console.log(err);
    } finally {
      props.closeModal();
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Pet
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select
          onChange={handleStatusChange}
          className="select-option-new-pet border mb-3"
        >
          <option className="option-style-new-pet" selected disabled>
            Adoption Status
          </option>
          <option className="option-style-new-pet">Available</option>
          <option className="option-style-new-pet">Fostered</option>
        </Form.Select>
        <Form.Select
          onChange={handleTypeChange}
          className="select-option-new-pet border mb-3"
        >
          <option
            className="option-style-new-pet"
            placeholder="hi"
            selected
            disabled
          >
            Type
          </option>
          <option className="option-style-new-pet">Dog</option>
          <option className="option-style-new-pet">Cat</option>
          <option className="option-style-new-pet">Horse</option>
          <option className="option-style-new-pet">Rabbit</option>
        </Form.Select>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="add-pet-input"
            type="text"
            onChange={handleNameChange}
            placeholder="Name"
            plaintext
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="add-pet-input"
            type="text"
            onChange={handleBreedChange}
            placeholder="Breed"
            plaintext
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="add-pet-input"
            type="text"
            onChange={handleColorChange}
            placeholder="Color"
            plaintext
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="add-pet-input"
            type="number"
            onChange={handleHeightChange}
            placeholder="Height"
            plaintext
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="add-pet-input"
            type="number"
            onChange={handleWeightChange}
            placeholder="Weight"
            plaintext
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="add-pet-input"
            type="text"
            onChange={handleDietaryRestrictionsChange}
            placeholder="Dietary Restrictions"
            plaintext
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="add-pet-input"
            type="text"
            onChange={handleBioChange}
            placeholder="Bio"
            plaintext
            autoComplete="off"
          />
        </Form.Group>
        <Form.Select
          onChange={handleHypoallergenicChange}
          className="select-option-new-pet border mb-3"
        >
          <option className="option-style-new-pet" selected disabled>
            Hypoallergenic
          </option>
          <option className="option-style-new-pet">Yes</option>
          <option className="option-style-new-pet">No</option>
        </Form.Select>
        <Form.Group className="d-flex align-items-center justify-content-center p-2">
          <Form.Label className="me-2 mb-0">Click to add an image</Form.Label>
          <button onClick={handleDropzoneShow} className="add-image-btn">
            <BsPlusCircleDotted className="add-image-icon" />
          </button>
        </Form.Group>
        {dropzoneShow && <Dropzone setAddNewPetImage={setAddNewPetImage} />}
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-add-pet-btn-container">
          <button
            type="submit"
            onClick={handleNewPetAdd}
            className="modal-add-pet-btn"
          >
            Add Pet
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default AddNewPetModal;
