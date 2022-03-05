import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { addAdmin } from "../../util/api";
import "./add-admin-alert-modal.css";
import { appContext } from "../../context/appContext";

function AddAdminAlertModal(props) {
  const handleAlertModalClose = () => props.setShowModal((prev) => !prev);
  const { setIsAddRemoveAdminClicked } = useContext(appContext);

  const handleAddToAdmin = async (e) => {
    e.preventDefault();
    const adminChange = {
      isAdmin: "Yes",
      id: props.userFullData.id,
    };
    try {
      await addAdmin(adminChange);
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
          <Modal.Title>Promote to Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          Are you sure you want to promote {props.userFullData.firstName} to be
          an admin?
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <button
            className="add-modal-btn border-0 rounded"
            onClick={handleAlertModalClose}
          >
            No, Go Back
          </button>
          <button
            className="add-modal-btn border-0 rounded"
            onClick={handleAddToAdmin}
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddAdminAlertModal;
