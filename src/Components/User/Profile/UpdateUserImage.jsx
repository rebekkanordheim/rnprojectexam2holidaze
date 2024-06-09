import React, { useState } from "react";
import "../../Layout/App.css";
import { USER_API_UPDATE } from "../../../Common/constants";

function UpdateAvatar() {
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Set the selected image file
  };

  const updateAvatar = async (imageUrl) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile); // Append the image file to the form data

      const response = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.location; // Return the URL of the uploaded image
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await updateAvatar();
      localStorage.setItem("avatarImageUrl", imageUrl);
      setSuccessMessage("Image uploaded successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="formContainer">
      <h2>Update your profile image:</h2>
      <form onSubmit={handleSubmit} className="avatarform" encType="multipart/form-data">
        <input
          type="file"
          onChange={handleImageChange}
          className="avatar-input"
          required
        />
        <button type="submit" className="avatar-btn">
          Upload Image
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default UpdateAvatar;
