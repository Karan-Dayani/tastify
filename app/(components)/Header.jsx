"use client";
import Link from "next/link";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Oswald } from "next/font/google";
import { useSession } from "next-auth/react";
import Image from "next/image";
const oswald = Oswald({ subsets: ["latin"] });

const Header = () => {
  const { data: session } = useSession();
  return (
    <div
      className={`${oswald.className} h-20 bg-secondary text-primary flex items-center px-10`}
    >
      <div className="mr-auto text-4xl">
        <Link href="/">TASTIFY</Link>
      </div>
      <div>
        <ul className="flex items-center justify-between w-28 text-2xl">
          <li>
            <Link href="/create" className="hover:opacity-70">
              Create
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:opacity-70">
              {session ? (
                <Image
                  src={session?.user?.image}
                  alt="user-img"
                  width={40}
                  height={20}
                  className="w-9 rounded-full"
                />
              ) : (
                <AccountCircleIcon fontSize="large" />
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
