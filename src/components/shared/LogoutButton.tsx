"use client";
import { logoutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <Button className="bg-red-400" onClick={handleLogout}>
      Logout
    </Button>
  );
}
