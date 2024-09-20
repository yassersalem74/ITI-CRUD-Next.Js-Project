import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import domain from "@/utils/config";
import createPostPic from "/public/edit.png";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(""); // Updated state to store base64 encoded image
  const [details, setDetails] = useState("");
  const router = useRouter();

  async function addPost() {
    const post = {
      title,
      imageUrl: image, // Send base64 encoded image string to the backend
      details,
    };
    try {
      await axios.post(`${domain}/posts`, post);
      console.log("Post added successfully");
      alert("Post added successfully");
      router.push("/posts");
    } catch (error) {
      console.log(error);
      alert("Error adding post");
    }
  }

  // Function to handle file input change and convert selected image to base64
  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // Convert the selected image to base64 and update the state
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="center-form">
      <div className="custom-container">
        <div className="custom-brand-logo">
          <Image src={createPostPic} alt="alt" width={100} height={100}  priority={true}/>
        </div>
        <div className="custom-brand-title text-center">Create Post</div>
        <div className="custom-inputs">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="custom-input"
          />
          <label>Upload Image</label>
          <input
            type="file" // Use file input type for image upload
            onChange={handleImageChange} // Handle file input change
            className="custom-input file-custom"
          />
          <label>Details</label>
          <textarea
            rows="3"
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="custom-input custom-area"
          ></textarea>
        </div>
        <button type="button" className="custom-button mt-3" onClick={addPost}>
          Create
        </button>
      </div>
    </div>
  );
}
