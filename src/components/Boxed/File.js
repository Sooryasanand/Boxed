import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import firebase from "firebase/compat/app";
import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();

export default function File({ file }) {
  const docRef = firebase.firestore().collection("files");
  const storageRef = ref(storage, `${file.url}`);

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
