import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { database } from "../../firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { v4 as uuidV4 } from "uuid";
import ReactDOM from "react-dom";
import { ProgressBar, Toast } from "react-bootstrap";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddFileButton({ currentFolder }) {
  /* Values for uploading the Files and getting the logged in user */
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const { currentUser } = useAuth();
  const storage = getStorage();

  /* Handling the uploading of Files to Firebase and creating the Database of the files*/
  function handleUpload(e) {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    const id = uuidV4();
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ]);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

    const storageRef = ref(storage, `/files/${currentUser.uid}/${filePath}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress };
            }

            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true };
            } else {
              return uploadFile;
            }
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((uploadFile) => {
            return uploadFile.id !== id;
          });
        });

        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          database.files
            .where("name", "==", file.name)
            .where("userId", "==", currentUser.uid)
            .where("folderId", "==", currentFolder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles[0];
              if (existingFile) {
                existingFile.ref.update({ url: url });
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  createAt: database.getCurrentTimeStamp(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                });
              }
            });
        });
      }
    );
  }

  /* Rendering the folder UI */
  return (
    <>
      <label className="btn btn-outline-success btn-sm m-0">
        <FontAwesomeIcon icon={faFileUpload} style={{ marginRight: "5px" }} />
        Add Files
        <input
          type="file"
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        ></input>
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map((file) => (
              <Toast
                key={file.id}
                onClose={() => {
                  setUploadingFiles((prevUploadingFiles) => {
                    return prevUploadingFiles.filter(
                      (uploadFile) => uploadFile.id !== file.id
                    );
                  });
                }}
              >
                <Toast.Header
                  closeButton={file.error}
                  className="text-truncate w-100 d-block"
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? "Error Uploading"
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
