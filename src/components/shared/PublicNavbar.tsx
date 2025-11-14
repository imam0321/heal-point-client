import Image from "next/image";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { getCookie } from "@/services/auth/tokenHandlers";

export default async function PublicNavbar() {
  const accessToken = await getCookie("accessToken");
  const isLoggedIn = accessToken ? true : false;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Find Doctors", href: "/find-doctors" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    ...(isLoggedIn ? [{ name: "Dashboard", href: "/dashboard" }] : []),
  ];

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
        {/*Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/heal-point-icon.svg"
            height={35}
            width={35}
            alt="Logo"
            priority
          />
          <span className="font-bold text-lg text-gray-800 text-nowrap">
            Heal Point
          </span>
        </Link>
        {/* desktop navbar  */}
        <DesktopNav navLinks={navLinks} isLoggedIn={isLoggedIn} />
        {/* Mobile navbar  */}
        <MobileNav navLinks={navLinks} isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
}
