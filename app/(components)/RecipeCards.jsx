import Image from "next/image";
import Link from "next/link";
import React from "react";

const RecipeCards = ({ recipes }) => {
  return (
    <div className="p-8 flex justify-center">
      <div className="flex flex-wrap justify-center gap-48">
        {recipes?.map((recipe, i) => (
          <div key={i}>
            <Link href="#">
              <div>
                {recipe.imageUrl && (
                  <Image
                    src={recipe.imageUrl}
                    className="w-72 rounded-md"
                    width={1000}
                    height={1000}
                    alt="image"
                  />
                )}
                <h1 className="text-xl font-bold">{recipe.name}</h1>
                <p className="text-base">Created by {recipe.user}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCards;
