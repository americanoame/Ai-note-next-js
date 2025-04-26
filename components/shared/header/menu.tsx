import { EllipsisVertical } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import ModeToggle from "./mode-toggle";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import LoOut from "@/components/shared/log-out";

const Menu = () => {
  const user = 1;

  return (
    <>
      <div className="flex justify-end gap-3">
        <nav className="md:hidden">
          <Sheet>
            <SheetTrigger className="align-middle">
              <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className="flex flex-col items-start">
              <SheetTitle></SheetTitle>

              <nav className="flex flex-col gap-10 p-4 text-[16px]">
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

                <div className="flex flex-col gap-4">
                  {user ? (
                    <LoOut />
                  ) : (
                    <>
                      <div>
                        <Link href="/login">Login</Link>
                      </div>
                      <div>
                        <Link href="/sign-up">Sign Up</Link>
                      </div>
                    </>
                  )}
                </div>

                <ModeToggle />
              </nav>

              <SheetDescription></SheetDescription>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </>
  );
};

export default Menu;
