import { getRecipe, getUser } from "@/app/api/api";
import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Like from "@/app/(components)/Like";
import User from "@/app/(models)/user";

const RecipeDetail = async ({ params }) => {
  const id = params.id;
  let recipe = await getRecipe(id);
  recipe = recipe.res;

  const ingredients = recipe.ingredients.split("\n").filter(Boolean);
  const process = recipe.recipe.split("\n").filter(Boolean);

  const session = await getServerSession(options);

  const userLikes = await getUser(session?.user?.email);
  if (!userLikes.res) {
    const emptyUser = new User({
      userMail: session?.user?.email,
      liked: [],
    });

    emptyUser.save();
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 lg:gap-24 flex-col lg:flex-row pb-4">
        <Image
          src={recipe.imageUrl}
          width={1000}
          height={1000}
          alt="image"
          className="w-96 rounded-md"
        />
        <div className="text-center lg:text-start">
          <h1 className="text-3xl lg:text-5xl mb-2">{recipe.name}</h1>
          <p className="text-lg lg:text-xl mb-4">Posted by {recipe.user}</p>

          <Like
            userLikes={userLikes}
            likes={recipe.likes}
            recipeId={recipe._id}
          />
        </div>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <h1 className="text-4xl">Ingredients</h1>
        <ul className="list-disc grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 text-lg">
          {ingredients.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <h1 className="text-4xl">Process</h1>
        <ol className="list-decimal flex flex-col gap-4 text-lg">
          {process.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;
