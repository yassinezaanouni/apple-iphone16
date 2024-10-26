"use client";
import Image from "next/image";
import { navLists } from "@/constants";

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex items-center justify-between">
      <nav className="flex w-full items-center justify-between screen-max-width">
        <Image
          src={"/assets/images/apple.svg"}
          alt="apple"
          width={13}
          height={18}
        />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((item) => (
            <div
              key={item}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <Image
            src={"/assets/images/search.svg"}
            alt="search"
            width={18}
            height={18}
          />
          <Image
            src={"/assets/images/bag.svg"}
            alt="bag"
            width={18}
            height={18}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
