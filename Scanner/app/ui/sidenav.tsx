"use client"
import NavLinks from '@/app/ui/nav-links';
import {LogOutIcon} from 'lucide-react'
import { useRouter } from 'next/navigation';
import Slogo from './Slogo';

export default function SideNav() {
  const router = useRouter();

  async function handleLogout() {
    const response = await fetch("/api/auth/logout", { method: "GET" });

    if (response.ok) {
      // Redirect user to login page after logging out
      router.push("/login");
    } else {
      console.error("Logout failed");
    }
  }
  return (
    <div className="flex h-full flex-col md:px-2 w-full bg-black">
      <div
        className="w-full flex justify-center pt-1 items-center"
      >
        {/* <h2 className='font-bold text-2xl w-fit py-2 text-white'>E-Validation</h2> */}
        <Slogo />
        <LogOutIcon onClick={handleLogout} className='text-white font-bold absolute top-3 right-5'></LogOutIcon>
      </div>
      <div className="flex grow flex-row justify-between sm:justify-start space-x-2 bg-black py-2">
        <NavLinks />
        {/* <div className="hidden h-auto  grow rounded-md bg-gray-50 md:block"></div> */}

      </div>
    </div>
  );
}
