import Recipe from "@/app/(models)/recipes";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { mail } = params;
  try {
    const recipes = await Recipe.find({ mail: mail });
    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: ", error }, { status: 500 });
  }
}
