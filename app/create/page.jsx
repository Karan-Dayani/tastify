import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import RecipeForm from "../(components)/createForm";

const CreateRecipePage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/create");
  }

  return (
    <div className="py-8">
      <h1 className="text-secondary text-4xl text-center">Add Your Dish</h1>
      <div className=" w-screen flex justify-center p-5">
        <RecipeForm />
      </div>
    </div>
  );
};

export default CreateRecipePage;
