import Recipe from "@/app/(models)/recipes";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await Recipe.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Successfully removed recipe" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error: ", error }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const res = await Recipe.findOne({ _id: id });
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: ", error }, { status: 500 });
  }
}
