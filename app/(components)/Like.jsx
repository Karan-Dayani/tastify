"use client";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { disliked, liked } from "../api/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Like = ({ userLikes, likes, recipeId }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const likedOrNot = userLikes?.res?.liked.includes(recipeId);
  const handleLike = () => {
    const res = liked(session?.user?.email, recipeId);
    window.location.reload();
  };
  const handleDislike = () => {
    const res = disliked(session?.user?.email, recipeId);
    window.location.reload();
  };
  const handleAlert = () => {
    router.push(`/api/auth/signin?callbackUrl=/recipes/${recipeId}`);
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
            onClick={session ? handleLike : handleAlert}
          />
        )}{" "}
        {likes}
      </p>
    </>
  );
};

export default Like;
