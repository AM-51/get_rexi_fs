import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import "./edit-pet-modal.css";
import { updatePetData } from "../../util/api";
import { BsPlusCircleDotted } from "react-icons/bs";
import Dropzone from "../Dropzone/Dropzone";

function EditPetModal(props) {
  const [editPetStatus, setEditPetStatus] = useState(props.petData.status);
  const [editPetType, setEditPetType] = useState(props.petData.type);
  const [editPetName, setEditPetName] = useState(props.petData.name);
  const [editPetBreed, setEditPetBreed] = useState(props.petData.breed);
  const [editPetColor, setEditPetColor] = useState(props.petData.color);
  const [editPetHeight, setEditPetHeight] = useState(props.petData.height);
  const [editPetWeight, setEditPetWeight] = useState(props.petData.weight);
  const [editPetDietaryRestrictions, setEditPetDietaryRestrictions] = useState(
    props.petData.dietary
  );
  const [editPetBio, setEditPetBio] = useState(props.petData.bio);
  const [editPetHypoallergenic, setEditPetHypoallergenic] = useState(
    props.petData.hypoallergenic
  );
  const [editPetImage, setEditPetImage] = useState(props.petData.image);
  const [editDropzoneShow, setEditDropzoneShow] = useState(false);

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setEditPetStatus(value);
  };

  const handleTypeChange = (event) => {
    const { value } = event.target;
    setEditPetType(value);
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setEditPetName(value);
  };

  const handleBreedChange = (event) => {
    const { value } = event.target;
    setEditPetBreed(value);
  };

  const handleColorChange = (event) => {
    const { value } = event.target;
    setEditPetColor(value);
  };

  const handleBioChange = (event) => {
    const { value } = event.target;
    setEditPetBio(value);
  };

  const handleDietaryRestrictionsChange = (event) => {
    const { value } = event.target;
    setEditPetDietaryRestrictions(value);
  };

  const handleHeightChange = (event) => {
    const { value } = event.target;
    setEditPetHeight(Number(value));
  };

  const handleWeightChange = (event) => {
    const { value } = event.target;
    setEditPetWeight(Number(value));
  };

  const handleHypoallergenicChange = (event) => {
    const { value } = event.target;
    if (value === "Yes") setEditPetHypoallergenic(true);
    else setEditPetHypoallergenic(false);
  };

  const handleDropzoneShow = () => {
    setEditDropzoneShow(!editDropzoneShow);
  };

  const handleNewPetAdd = async (e) => {
    e.preventDefault();
    const petId = props.petId;
    let editPetFormData = new FormData();
    editPetFormData.append("status", editPetStatus);
    editPetFormData.append("type", editPetType);
    editPetFormData.append("name", editPetName);
    editPetFormData.append("breed", editPetBreed);
    editPetFormData.append("color", editPetColor);
    editPetFormData.append("height", editPetHeight);
    editPetFormData.append("weight", editPetWeight);
    editPetFormData.append("dietary", editPetDietaryRestrictions);
    editPetFormData.append("bio", editPetBio);
    editPetFormData.append("hypoallergenic", editPetHypoallergenic);
    editPetFormData.append("image", editPetImage, editPetImage.name);
    try {
      await updatePetData(editPetFormData, petId);
    } catch (err) {
      console.log(err);
    } finally {
      props.modalShow(false);
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
        <Modal.Title id="contained-modal-title-vcenter">Edit Pet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Select
          onChange={handleStatusChange}
          className="select-option-edit-pet border mb-3"
        >
          <option className="option-style-edit-pet" selected disabled>
            Adoption Status
          </option>
          <option className="option-style-edit-pet">Available</option>
          <option className="option-style-edit-pet">Fostered</option>
        </Form.Select>
        <Form.Select
          onChange={handleTypeChange}
          className="select-option-edit-pet border mb-3"
        >
          <option
            className="option-style-edit-pet"
            placeholder="hi"
            selected
            disabled
          >
            Type
          </option>
          <option className="option-style-edit-pet">Dog</option>
          <option className="option-style-edit-pet">Cat</option>
          <option className="option-style-edit-pet">Horse</option>
          <option className="option-style-edit-pet">Rabbit</option>
        </Form.Select>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="edit-pet-input"
            type="text"
            onChange={handleNameChange}
            placeholder="Name"
            plaintext
            autoComplete="off"
            value={editPetName}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="edit-pet-input"
            type="text"
            onChange={handleBreedChange}
            placeholder="Breed"
            plaintext
            autoComplete="off"
            value={editPetBreed}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="edit-pet-input"
            type="text"
            onChange={handleColorChange}
            placeholder="Color"
            plaintext
            autoComplete="off"
            value={editPetColor}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="edit-pet-input"
            type="number"
            onChange={handleHeightChange}
            placeholder="Height"
            plaintext
            autoComplete="off"
            value={editPetHeight}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="edit-pet-input"
            type="number"
            onChange={handleWeightChange}
            placeholder="Weight"
            plaintext
            autoComplete="off"
            value={editPetWeight}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="edit-pet-input"
            type="text"
            onChange={handleDietaryRestrictionsChange}
            placeholder="Dietary Restrictions"
            plaintext
            autoComplete="off"
            value={editPetDietaryRestrictions}
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex border rounded p-2 justify-content-between align-items-center">
          <Form.Control
            className="edit-pet-input"
            type="text"
            onChange={handleBioChange}
            placeholder="Bio"
            plaintext
            autoComplete="off"
            value={editPetBio}
          />
        </Form.Group>
        <Form.Select
          onChange={handleHypoallergenicChange}
          className="select-option-edit-pet border mb-3"
        >
          <option className="option-style-edit-pet" selected disabled>
            Hypoallergenic
          </option>
          <option className="option-style-edit-pet">Yes</option>
          <option className="option-style-edit-pet">No</option>
        </Form.Select>
        <Form.Group className="d-flex align-items-center justify-content-center p-2">
          <Form.Label className="me-2 mb-0">Click to add an image</Form.Label>
          <button onClick={handleDropzoneShow} className="edit-image-btn">
            <BsPlusCircleDotted className="edit-image-icon" />
          </button>
        </Form.Group>
        {editDropzoneShow && <Dropzone setAddNewPetImage={setEditPetImage} />}
      </Modal.Body>
      <Modal.Footer>
        <div className="modal-edit-pet-btn-container">
          <button
            type="submit"
            onClick={handleNewPetAdd}
            className="modal-edit-pet-btn"
          >
            Save Changes
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default EditPetModal;
