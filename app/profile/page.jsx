import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Link from "next/link";

const ProfilePage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }

  console.log(session);

  return (
    <div>
      <h1>ProfilePage</h1>
      <p>Hello, {session?.user?.name}</p>
      <Link href="/api/auth/signout?callbackUrl=/">Log Out</Link>
    </div>
  );
};

export default ProfilePage;
