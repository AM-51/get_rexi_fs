import React from "react";
import { useDropzone } from "react-dropzone";
import "./dropzone.css";

function Dropzone(props) {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "image/jpeg, image/png",
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container">
      <div className="dropzone-container col-12 p-2 rounded">
        <div {...getRootProps({ className: "dropzone" })}>
          <input
            {...getInputProps(props.setAddNewPetImage(acceptedFiles[0]))}
          />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(Only *.jpeg and *.png images will be accepted)</em>
        </div>
        <aside className="files-container mt-2 p-1">
          <h4 className="files-title mb-2">Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
          <h4 className="files-title">Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>
      </div>
    </section>
  );
}

export default Dropzone;
