import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { getUser } from "@/lib/lucia";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  console.log({ user });

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="h-full">
      <div className="fixed w-full h-[80px] md:pl-56 inset-y-0 z-50">
        <Navbar user={user} />
      </div>
      <div className="hidden md:flex w-56 h-full flex-col fixed inset-y-0 z-50">
        <Sidebar user={user} />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
}
