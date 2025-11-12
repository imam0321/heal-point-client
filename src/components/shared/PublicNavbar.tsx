import Image from "next/image";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Link from "next/link";

export default function PublicNavbar() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Find Doctors", href: "/find-doctors" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
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
          <span className="font-bold text-lg text-gray-800">HealPoint</span>
        </Link>
        {/* desktop navbar  */}
        <DesktopNav navLinks={navLinks} />
        {/* Mobile navbar  */}
        <MobileNav navLinks={navLinks} />
      </div>
    </header>
  );
}
