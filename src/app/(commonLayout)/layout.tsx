import PublicNavbar from "@/components/shared/PublicNavbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <PublicNavbar />
        <main className="grow">{children}</main>
      </div>
    </>
  );
}
