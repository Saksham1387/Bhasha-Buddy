import Image from "next/image";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";

export const Header = () => {
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="flex items-center gap-x-3">
          <Link href="/" passHref>
            <Image
              src="/mascot-1.webp"
              height={50}
              width={50}
              alt="Mascot"
              className="rounded-full"
            />
          </Link>
          <h1 className="text-2xl font-extrabold text-purple-400 tracking-wide">
            BhashaBuddy
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-x-3 ml-[400px]">
          <Link href="/aboutUs" passHref>
            <Button
              variant="sidebar"
              className="dark:text-white dark:hover:bg-slate-800"
            >
              About Us
            </Button>
          </Link>
          <div className="ml-5">
            <ModeToggle></ModeToggle>
          </div>
        </div>
      </div>
    </header>
  );
};
