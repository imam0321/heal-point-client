"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"


export default function PublicNavbar() {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
        scrolled ? "bg-background/95 border-b shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="./heal-point-icon.svg" height={40} width={40} alt="heal point icon"/>
          <span className="text-lg md:text-xl font-semibold text-primary">
            Heal Point
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {["Find Doctors", "Features", "How It Works", "Contact"].map((item, index) => {
            const hrefs = ["#doctors", "#features", "#how-it-works", "#contact"]
            return (
              <a
                key={index}
                href={hrefs[index]}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            )
          })}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="outline" size="sm">Login</Button>
          </Link>
          <Link href="/login">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-60 sm:w-[280px]">
              <nav className="mt-6 flex flex-col gap-4">
                {["Find Doctors", "Features", "How It Works", "Contact"].map((item, index) => {
                  const hrefs = ["#doctors", "#features", "#how-it-works", "#contact"]
                  return (
                    <a
                      key={index}
                      href={hrefs[index]}
                      className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  )
                })}
                <div className="mt-6 flex flex-col gap-2">
                  <Link href="/auth">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
