import React, { useState } from "react";
import "./GoogleStorageFileUploader.scss"

function GoogleStorageFileUploader({setUrl, dstFolder, fileId}) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file.data);
    formData.append("dst-folder", dstFolder);
    formData.append("file-id", fileId);
    const response = await fetch("http://localhost:5001/upload-file-to-cloud-storage", {
      method: "POST",
      body: formData,
    });
    const responseWithBody = await response.json();
    if (response) setUrl(responseWithBody.publicUrl);
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(img);
  };
  
  return (<div className="file-uploader-layout">
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default GoogleStorageFileUploader;