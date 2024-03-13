import React from "react";
import { getRecipes } from "./api/api";
import RecipeCards from "./(components)/RecipeCards";

const HomePage = async () => {
  const { recipes } = await getRecipes();
  return (
    <div className="">
      <div>
        {/* <h1 className="text-9xl text-center">Hallo Everynian!</h1> */}
      </div>
      <div>
        <RecipeCards recipes={recipes} />
      </div>
    </div>
  );
};

export default HomePage;
