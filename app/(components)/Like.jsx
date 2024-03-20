"use client";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { disliked, liked } from "../api/api";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Like = ({ userLikes, likes, recipeId }) => {
  const { data: session } = useSession();
  const likedOrNot = userLikes?.res?.liked.includes(recipeId);
  const handleLike = () => {
    const res = liked(session?.user?.email, recipeId);
    window.location.reload();
  };
  const handleDislike = () => {
    const res = disliked(session?.user?.email, recipeId);
    window.location.reload();
  };
  return (
    <>
      <p className="text-lg lg:text-xl text-end lg:text-start">
        {likedOrNot ? (
          <FavoriteIcon
            className="text-red-500 cursor-pointer"
            onClick={handleDislike}
          />
        ) : (
          <FavoriteBorderIcon
            className="text-red-500 cursor-pointer"
            onClick={handleLike}
          />
        )}{" "}
        {likes}
      </p>
    </>
  );
};

export default Like;
