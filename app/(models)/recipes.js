import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const recipeSchema = new Schema(
  {
    name: String,
    user: String,
    mail: String,
    ingredients: String,
    recipe: String,
    imageUrl: String,
    likes: Number,
  },
  { timestamps: true }
);

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export default Recipe;
