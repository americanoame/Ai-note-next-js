import React from "react";
import Image from "next/image";
import Link from "next/link";

import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";
import ModeToggle from "./mode-toggle";
import LoOut from "@/components/shared/log-out";
import { getUser } from "@/auth/sever";


async function Header() {
  const user = await getUser();

  return (
    <header className="w-full">
       <div className="wrapper flex flex-between">
      <Link className="flex items-end gap-2" href="/">
        <Image
          src="/monkey.png"
          height={60}
          width={60}
          alt="logo"
          className="rounded-full"
          priority
        />

        <h1 className="flex flex-col pb-1 text-2xl font-semibold leading-6">
          {APP_NAME}
        </h1>
      </Link>

      <div className="hidden sm:flex gap-4 ml-auto items-center">
        {user ? (
          <LoOut />
        ) : (
          <>
            <div >
              <Link href="/sign-up" className="hidden sm:block">
                Sign Up
              </Link>
            </div>
            <div>
              <Link href="/login">Login</Link>
            </div>
            
          </>
        )}
        <ModeToggle />
      </div>
      <Menu />
      </div>
    </header>
  );
}

export default Header;
