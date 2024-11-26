"use client";

import Image from "next/image";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiLogin, HiLogout } from "react-icons/hi";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const image = session?.user?.image;

  return (
    <div className="flex items-center justify-between p-3 md:p-4 ring-[2px] ring-[#ff3366]">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={130}
          height={130}
          priority
          as="image"
          className="w-[120px] md:w-[130px] xl:w-[140px] 2xl:w-auto h-auto"
        />
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="/create-post">
          <button
            className="btn capitalize bg-zinc-800 text-white hover:bg-zinc-700
         hover:text-white rounded-full font-medium px-5 hidden md:block"
          >
            create post
          </button>
        </Link>
        <Link href="/create-post" className="md:hidden">
          <HiOutlinePencilSquare />
        </Link>
        {session ? (
          <button
            className="btn btn-ghost capitalize border-[1px] rounded-full hover:bg-gray-100 border-gray-100 px-5 hidden md:block"
            onClick={() => signOut()}
          >
            sign out
          </button>
        ) : (
          <button
            className="btn btn-ghost capitalize border-[1px] rounded-full hover:bg-gray-100 border-gray-100 px-5 hidden md:block"
            onClick={() => signIn("google")}
          >
            sign in
          </button>
        )}
        <div className="md:hidden">
          {session ? (
            <HiLogout onClick={() => signOut()} />
          ) : (
            <HiLogin onClick={() => signIn("google")} />
          )}
        </div>
        {session && (
          <Link href="/profile">
            <Image
              src={image ? image : "/images/user.png"}
              alt="profile image"
              width={40}
              height={40}
              className="lg:w-[50px] lg:h-[50px] cursor-pointer"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
