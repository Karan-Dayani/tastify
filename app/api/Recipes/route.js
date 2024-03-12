import Recipe from "@/app/(models)/recipes";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const recipeData = body.formData;
    Recipe.create(recipeData);
    return NextResponse.json(
      { message: "Successfully posted your recipe" },
      { statue: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error: ", error }, { statue: 500 });
  }
}
