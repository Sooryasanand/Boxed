import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import firebase from "firebase/compat/app";

export default function Folder({ folder }) {
  /* Values of the database and storage*/
  const docRef = firebase.firestore().collection("folders");

  /* Handling the delete function of the folders */
  const handleDelete = () => {
    try {
      console.log(`${folder.id}`);
      docRef.doc(`${folder.id}`).delete();
    } catch (e) {
      console.log(e);
    }
  };

  const Delete = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Delete Folder",
      message: "Do you want to delete this folder?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleDelete();
          },
        },
        {
          label: "No",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  /* Rendering a single folder which can be opened */
  return (
    <Button
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
      variant="outline-dark"
      className="text-truncate w-100"
      as={Link}
      onContextMenu={Delete}
    >
      <FontAwesomeIcon icon={faFolder} style={{ marginRight: "15px" }} />
      {folder.name}
    </Button>
  );
}
