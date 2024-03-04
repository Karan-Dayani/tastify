import Link from "next/link";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Oswald } from "next/font/google";
const oswald = Oswald({ subsets: ["latin"] });

const Header = () => {
  return (
    <div
      className={`${oswald.className} h-20 bg-bg-primary text-text flex items-center px-10`}
    >
      <div className="mr-auto text-4xl">
        <Link href="/">TASTIFY</Link>
      </div>
      <div>
        <ul className="flex items-baseline justify-between w-28 text-2xl">
          <li>
            <Link href="/create" className="hover:opacity-70">
              Create
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:opacity-70">
              <AccountCircleIcon />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
