import React from "react";
import { Container } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Folder from "./Folder";
import File from "./File";
import FolderBreadcrumbs from "./FolderBreadcrumbs";

export default function Dashboard() {
  /* Values saved to be used in the app like the folderId and others */
  const { folderId } = useParams();
  const { folder, childFolders, childFiles } = useFolder(folderId);

  /* Rendering folders and files of the application */
  return (
    <>
      <Navbar />
      <Container fluid>
        <div
          className="d-flex align align-items-center"
          style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
        >
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) => (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
