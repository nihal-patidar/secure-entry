import SideNav from "@/app/ui/sidenav";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      {/* <div className="flex flex-col">
                <SideNav />
            </div> */}
      <Navbar />
      {/* Main Content Area */}
      <div className="flex flex-col items-center w-full h-full">{children}</div>
    </div>
  );
}
