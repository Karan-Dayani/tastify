import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserRecipes } from "../api/api";
import RecipeList from "../(components)/RecipeList";

const ProfilePage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }

  const userRecipes = await getUserRecipes(session?.user?.email);

  return (
    <div className="px-2 lg:px-9">
      <div className="flex justify-between items-center py-5">
        <p className="text-xl lg:text-3xl">Hello, {session?.user?.name}</p>
        <Link href="/api/auth/signout?callbackUrl=/" className="lg:text-xl">
          Log Out
        </Link>
      </div>
      <div className="py-5">
        <RecipeList recipes={userRecipes.recipes} />
      </div>
    </div>
  );
};

export default ProfilePage;
