import User from "@/app/(models)/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { mail } = params;
    const res = await User.findOne({ userMail: mail });
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: ", error }, { status: 500 });
  }
}
