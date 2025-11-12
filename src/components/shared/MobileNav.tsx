"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { NavLink } from "./DesktopNav";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import LogoutButton from "./LogoutButton";

export default function MobileNav({
  navLinks,
  isLoggedIn,
}: {
  navLinks: NavLink[];
  isLoggedIn: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        className="text-gray-700"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "absolute left-0 right-0 top-14 bg-white border-t shadow-md px-4 py-3 space-y-3"
            )}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-cyan-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              {isLoggedIn ? (
                <LogoutButton />
              ) : (
                <Button asChild className="bg-blue-500 hover:bg-blue-700 h-8">
                  <Link href="/login">Login</Link>
                </Button>
              )}
              <Button asChild className="bg-green-500 hover:bg-green-600 h-8">
                <Link href="/doctor">Get Started</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
