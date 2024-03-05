import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const CreateRecipePage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/create");
  }

  return (
    <div>
      <h1>CreatePage</h1>
      <p>Hello, {session?.user?.name}</p>
    </div>
  );
};

export default CreateRecipePage;
