'use client';
import AppLayout from "@../../components/AppLayout"
import {useSession} from "next-auth/react";
import Image from "next/image";


export default function Home() {
  const {data: session} = useSession();
  console.log({session});
  return <AppLayout>
    <div className="text-blue-900 flex justify-between">
      <h2>Hello, <b>{session?.user?.name}</b></h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
        <Image src={session?.user?.image} alt="image" className="w-6 h-6" /> 
        <span className="px-2">
          {session?.user?.name}
        </span>
      </div>
  
    </div>
  </AppLayout>
}
