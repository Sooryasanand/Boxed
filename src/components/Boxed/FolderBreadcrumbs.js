import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function FolderBreadCrumbs({ currentFolder }) {
  /* Values saved to be used in the app like the path */
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];

  /* Rendering the breadcrumbs of the application */
  return (
    <Breadcrumb
      className="flex-grow-1"
      listProps={{ className: "bg-white pl-0 m-0" }}
    >
      {path.map((folder, index) => (
        <Breadcrumb.Item
          key={folder.id}
          linkAs={Link}
          linkProps={{
            to: {
              pathname: folder.id ? `/folder/${folder.id}` : "/",
              state: { folder: { ...folder, path: path.slice(1, index) } },
            },
          }}
          className="text-truncate d-inline-block"
          style={{ maxWidth: "150px", textDecoration: "none" }}
        >
          {folder.name}
        </Breadcrumb.Item>
      ))}
      {currentFolder && (
        <Breadcrumb.Item
          className="text-truncate d-inline-block"
          style={{ maxWidth: "200px", textDecoration: "none" }}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}
