import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import firebase from "firebase/compat/app";
import { getStorage, ref, deleteObject } from "firebase/storage";

/* Calling the storage from the Firebase */
const storage = getStorage();

export default function File({ file }) {
  /* Values of the database and storage*/
  const docRef = firebase.firestore().collection("files");
  const storageRef = ref(storage, `${file.url}`);

  /* Handling the delete function of the files */
  const handleDelete = () => {
    try {
      console.log(`${file.id}`);
      docRef.doc(`${file.id}`).delete();
      deleteObject(storageRef);
    } catch (e) {
      console.log(e);
    }
  };

  const Delete = (e) => {
    e.preventDefault();
    confirmAlert({
      title: "Delete File",
      message: "Do you want to delete this file?",
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

  /* Rendering a single file */
  return (
    <a
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-outline-dark text-truncate w-100"
      onContextMenu={Delete}
    >
      <FontAwesomeIcon icon={faFile} style={{ marginRight: "15px" }} />
      {file.name}
    </a>
  );
}
