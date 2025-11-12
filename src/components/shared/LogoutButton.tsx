"use client";

import { useState } from "react";
import { logoutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../ui/alert-dialog";

export default function LogoutButton() {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <>
      <Button
        className="bg-red-500 hover:bg-red-600 text-white h-8 px-4"
        onClick={() => setOpen(true)}
      >
        Logout
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-cyan-500 hover:bg-cyan-600"
              onClick={handleLogout}
            >
              OK
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
