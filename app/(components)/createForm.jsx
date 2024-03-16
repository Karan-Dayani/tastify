"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const RecipeForm = () => {
  const [image, setImage] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.name) {
      redirect("/");
    }
  });

  //* formdata setup
  const emptyFormData = {
    name: "",
    user: `${session?.user?.name}`,
    mail: `${session?.user?.email}`,
    ingredients: "",
    recipe: "",
    imageUrl: "",
    likes: 0,
  };
  const [formData, setFormData] = useState(emptyFormData);

  const handleFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log(formData);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api/Recipes", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create recipe");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log("Error Posting");
    }
  };

  //* FireBase Config
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "unified-firefly-322314.firebaseapp.com",
    projectId: "unified-firefly-322314",
    storageBucket: "unified-firefly-322314.appspot.com",
    messagingSenderId: "407213938594",
    appId: "1:407213938594:web:e56db0e4c9fca5680304fb",
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  //* Firebase image upload and remove functions
  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      fileRef.put(selectedFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          setImage(downloadURL);
          setFormData((prev) => ({
            ...prev,
            imageUrl: downloadURL,
          }));
          console.log(downloadURL);
        });
      });
    } else {
      alert("No file selected");
    }
  };
  const handleImageRemove = () => {
    const storageRef = firebase.storage().refFromURL(image);
    storageRef
      .delete()
      .then(() => {
        setImage("");
        setFormData((prev) => ({
          ...prev,
          imageUrl: "",
        }));
      })
      .catch((error) => {
        console.error("Error removing image:", error);
      });
  };

  return (
    <div className="w-4/5 flex justify-between flex-col text-center lg:flex-row lg:text-left gap-4">
      <div className="w-full lg:w-3/5">
        <form action="" method="post" className="flex flex-col gap-5 lg:gap-10">
          <div className="flex flex-col gap-2">
            <label className="text-2xl">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleFormChange}
              className="w-full border border-secondary rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-2xl">Ingredients</label>
            <textarea
              type="text"
              name="ingredients"
              onChange={handleFormChange}
              className="w-full h-40 border border-secondary rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-2xl">Recipe</label>
            <textarea
              type="text"
              name="recipe"
              onChange={handleFormChange}
              className="w-full h-40 border border-secondary rounded-md"
            />
          </div>
        </form>
      </div>
      <div className="flex flex-col items-center lg:items-end gap-4 lg:w-2/5">
        {image ? (
          // <button onClick={handleImageRemove}>Remove</button>
          <div className="w-full text-end">
            <CloseOutlinedIcon
              onClick={handleImageRemove}
              className="cursor-pointer"
            />
          </div>
        ) : (
          <>
            <label className="text-2xl">Upload Image</label>
            <input
              type="file"
              name="file-input"
              id="file-input"
              onChange={handleImageUpload}
              className="block w-full lg:w-4/5 border border-secondary shadow-sm rounded-md text-md focus:border-secondary file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
            />
          </>
          // {/* <input
          //   type="file"
          //   name="image"
          //   onChange={handleImageUpload}
          //   className="bg-secondary"
          // /> */}
        )}
        {image && (
          <Image
            src={image}
            height={400}
            width={400}
            alt="image"
            className=""
          />
        )}
        <div className="w-full text-center lg:text-end">
          <button
            onClick={handlePost}
            className="bg-secondary text-primary w-fit px-3 py-1 rounded-md hover:bg-opacity-80"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
