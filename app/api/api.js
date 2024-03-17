export const getRecipes = async () => {
  try {
    const res = await fetch("https://tastify-one.vercel.app/api/Recipes", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get Recipes", error);
  }
};

export const getUserRecipes = async (mail) => {
  try {
    const res = await fetch(
      `https://tastify-one.vercel.app/api/UserRecipes/${mail}`,
      {
        cache: "no-store",
      }
    );
    return res.json();
  } catch (error) {
    console.log("Failed to get Recipes", error);
  }
};

export const getRecipe = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Recipes/${id}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get Recipe", error);
  }
};
