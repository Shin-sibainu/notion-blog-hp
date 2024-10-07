import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="container py-6 px-2">
      <div className="flex items-center justify-between">
        <div className="sm:flex items-center space-x-7 hidden">
          <Link
            href={"/"}
            className="font-bold text-xl flex items-center gap-2"
          >
            <Image
              src={"/notionpress-logo-mod.png"}
              width={30}
              height={30}
              alt="NotionPress_Logo"
            />
            <span>NotionPress</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            href={""}
            className="hover:text-muted-foreground/70 sm:text-sm pt-1"
          >
            　特徴
          </Link>
          <Link
            href={""}
            className="hover:text-muted-foreground/70 sm:text-sm pt-1"
          >
            テンプレート
          </Link>
          <Link
            href={""}
            className="hover:text-muted-foreground/70 sm:text-sm pt-1"
          >
            ブログの始め方
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
