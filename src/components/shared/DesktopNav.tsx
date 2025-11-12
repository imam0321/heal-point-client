import Link from "next/link";
import { Button } from "../ui/button";
import LogoutButton from "./LogoutButton";

export type NavLink = {
  name: string;
  href: string;
};

export default function DesktopNav({
  navLinks,
  isLoggedIn,
}: {
  navLinks: NavLink[];
  isLoggedIn: boolean;
}) {
  return (
    <nav className="hidden md:flex items-center justify-between w-full">
      <div className="flex-1 flex justify-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-gray-600 hover:text-cyan-500 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        {isLoggedIn ? (
          <LogoutButton />
        ) : (
          <Button
            asChild
            variant="default"
            className="bg-blue-500 hover:bg-blue-600 text-white h-8 px-4"
          >
            <Link href="/login">Login</Link>
          </Button>
        )}

        <Button
          asChild
          variant="default"
          className="bg-green-500 hover:bg-green-600 text-white h-8 px-4"
        >
          <Link href="/doctors">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
}
