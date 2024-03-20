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
    const res = await fetch(
      `https://tastify-one.vercel.app/api/Recipes/${id}`,
      {
        cache: "no-store",
      }
    );
    return res.json();
  } catch (error) {
    console.log("Failed to get Recipe", error);
  }
};

export const getUser = async (mail) => {
  try {
    const res = await fetch(`https://tastify-one.vercel.app/api/User/${mail}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get User", error);
  }
};

export const disliked = async (mail, id) => {
  const res = await fetch(`http://localhost:3000/api/User/${mail}/${id}`, {
    method: "DELETE",
  });
  const res2 = await fetch(`http://localhost:3000/api/Recipes/${id}/minus`, {
    method: "POST",
  });
  if (res.ok && res2.ok) {
    return true;
  }
};

export const liked = async (mail, id) => {
  const res = await fetch(`http://localhost:3000/api/User/${mail}/${id}`, {
    method: "POST",
  });
  const res2 = await fetch(`http://localhost:3000/api/Recipes/${id}/plus`, {
    method: "POST",
  });
  if (res.ok && res2.ok) {
    return true;
  }
};
