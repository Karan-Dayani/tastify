import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecipeCards = ({ recipes }) => {
  return (
    <div className="p-8 flex justify-center">
      <div className="flex flex-wrap justify-center gap-5 lg:gap-48">
        {recipes?.map((recipe, i) => (
          <div key={i}>
            <Link href={`recipes/${recipe._id}`}>
              <div className="flex flex-col gap-2">
                {recipe.imageUrl && (
                  <Image
                    src={recipe.imageUrl}
                    className="w-72 rounded-md h-52 object-cover"
                    width={1000}
                    height={1000}
                    alt="image"
                  />
                )}
                <div>
                  <h1 className="text-xl font-bold">{recipe.name}</h1>
                  <p className="text-base">Posted by {recipe.user}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCards;
