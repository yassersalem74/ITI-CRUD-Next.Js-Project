import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import domain from "@/utils/config";
import createPostPic from "/public/edit.png";

export default function PostId({ post }) {
  const router = useRouter(); // Initialize useRouter hook
  const [title, setTitle] = useState(post?.title || ""); // Added a check for post
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || ""); // Added a check for post
  const [details, setDetails] = useState(post?.details || ""); // Added a check for post
  const [image, setImage] = useState(""); // Updated state to store base64 encoded image
  async function updatePost() {
    const postUpdate = {
      title,
      imageUrl,
      details,
    };
    try {
      await axios.put(`${domain}/posts/${post._id}`, postUpdate);
      console.log("Post updated successfully");
      alert("Post updated successfully");
      // Redirect to posts route after successful update
      router.push("/posts");
    } catch (error) {
      console.error(error);
      alert("Error updating post");
    }
  }

  // Function to handle file input change and convert selected image to base64
  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // Convert the selected image to base64
      const imageData = reader.result;
      // Update the state variables
      setImageUrl(imageData); // Update imageUrl with the new image data
      setImage(imageData); // Update image state variable with the new image data
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="center-form">
      <div className="custom-container">
        <div className="custom-brand-logo">
          <Image
            src={createPostPic}
            alt="alt"
            width={100}
            height={100}
            priority={true}
          />
        </div>
        <div className="custom-brand-title text-center">Edit Post</div>
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
            className="custom-input"
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
        <button
          type="button"
          className="custom-button mt-3"
          onClick={updatePost}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await axios.get(`${domain}/posts/${context.query.id}`);
    return {
      props: {
        post: response.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
