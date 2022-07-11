import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddFolderButton({ currentFolder }) {
  /* Values of the logged in user and others */
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();

  /* Opening the menu of Folders when clicked on the button */
  function openModal() {
    setOpen(true);
  }

  /* Closing the menu of Folders when clicked on the button */
  function closeModal() {
    setOpen(false);
  }

  /* Handling the creation of Folders and uploading to Firebase Database */
  function handleSubmit(e) {
    e.preventDefault();

    if (currentFolder == null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrentTimeStamp(),
    });
    setName("");
    closeModal();
  }

  /* Rendering the menu of Folders */
  return (
    <>
      <Button
        onClick={openModal}
        variant="outline-success"
        size="sm"
        style={{ marginLeft: "10px" }}
      >
        <FontAwesomeIcon icon={faFolder} style={{ marginRight: "5px" }} />
        Add Folder
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
