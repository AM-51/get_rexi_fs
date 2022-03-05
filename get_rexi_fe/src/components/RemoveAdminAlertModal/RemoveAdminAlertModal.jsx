import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { removeAdmin } from "../../util/api";
import "./remove-admin-alert-modal.css";
import { appContext } from "../../context/appContext";

function RemoveAdminAlertModal(props) {
  const handleAlertModalClose = () => props.setShowModal((prev) => !prev);
  const { setIsAddRemoveAdminClicked } = useContext(appContext);

  const handleRemoveFromAdmin = async (e) => {
    e.preventDefault();
    const adminChange = {
      isAdmin: "No",
      id: props.userFullData.id,
    };
    try {
      await removeAdmin(adminChange);
      props.setShowModal((prev) => !prev);
      setIsAddRemoveAdminClicked((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal show={props.showModal} onHide={handleAlertModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Admin Privileges</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          Are you sure you want to remove {props.userFullData.firstName} admin
          privileges?
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <button
            className="remove-modal-btn border-0 rounded"
            onClick={handleAlertModalClose}
          >
            No, Go Back
          </button>
          <button
            className="remove-modal-btn border-0 rounded"
            onClick={handleRemoveFromAdmin}
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RemoveAdminAlertModal;
