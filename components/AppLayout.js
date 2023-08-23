'use client';
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react";
import Nav from "./Nav";
import LoginForm from "./LoginForm";



export default function AppLayout({children}) {
  const [showNav, setShowNav] = useState(false);
  const {data: session } = useSession();
  if (!session) {
    return (
        <div className={'bg-backG w-screen h-screen flex items-center'}>
          <div className="text-center w-50 m-auto bg-white">
            <LoginForm />
          </div>
        </div>
    )
  }

  const updatePageState = (state) => {
    setShowNav(state)
  }
  
  return (
    <div className="bg-backG min-h-screen">
      <div className="block flex md:hidden items-center p-4">
      <button onClick={() => setShowNav(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      </button>
      <div className="flex grow justify-center mr-6">
        
      </div>
      </div>
      <div className=" flex">
      <Nav show={showNav} triggerUpdate={updatePageState} />
        <div className="flex-grow p-4">
            {children}
        </div>
    </div>
    </div>
    
  )
}
