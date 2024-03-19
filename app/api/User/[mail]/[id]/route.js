import User from "@/app/(models)/user";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const mail = params.mail;
    const id = params.id;
    const data = await User.findOneAndUpdate(
      { userMail: mail },
      { $pull: { liked: id } }
    );
    res.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Error: ", error }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    const mail = params.mail;
    const id = params.id;
    const data = await User.findOneAndUpdate(
      { userMail: mail },
      { $push: { liked: id } }
    );
    res.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Error: ", error }, { status: 500 });
  }
}
