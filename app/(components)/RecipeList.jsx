"use client";
import Image from "next/image";
import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

const formatDate = (createdAt) => {
  if (!createdAt) return "";
  const date = new Date(createdAt);
  return date.toLocaleDateString("en-US");
};

const RecipeList = ({ recipes }) => {
  const router = useRouter();
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

  const handleDelete = async (id, imgUrl) => {
    const res = await fetch(`http://localhost:3000/api/Recipes/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.refresh();
    }
    const storageRef = firebase.storage().refFromURL(imgUrl);
    storageRef.delete();
  };

  return (
    <div>
      <h1 className="text-2xl">Your Recipes</h1>
      <div>
        {recipes?.map((recipe, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex gap-5 lg:gap-9 items-center py-5">
              <div>
                <Image
                  src={recipe.imageUrl}
                  height={150}
                  width={150}
                  alt="image"
                  className="rounded-sm w-28 h-20 object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl text-secondary">{recipe.name}</h1>
                <p className="text-md text-secondary">
                  Date: {formatDate(recipe.createdAt)}
                </p>
              </div>
            </div>
            <div>
              <button onClick={() => handleDelete(recipe._id, recipe.imageUrl)}>
                <DeleteIcon className="cursor-pointer text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
