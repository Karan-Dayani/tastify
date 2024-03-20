import Recipe from "@/app/(models)/recipes";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const id = params.id;
    const op = params.op;
    if (op === "plus") {
      await Recipe.findOneAndUpdate({ _id: id }, { $inc: { likes: 1 } });
    } else if (op === "minus") {
      await Recipe.findOneAndUpdate({ _id: id }, { $inc: { likes: -1 } });
    }
    return NextResponse.json(
      { message: "Successfully Updated recipe" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error: ", error }, { status: 500 });
  }
}
