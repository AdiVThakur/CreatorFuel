"use client"
import React, { useState } from 'react'
import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setShowdropdown] = useState(false)

    return (
        <nav className='bg-gray-900 text-white flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-3 sm:py-0 min-h-[56px] gap-3 sm:gap-0 relative z-50'>
            {/* Logo container - centered on mobile, aligned left on sm and up */}
            <div className='w-full sm:w-auto flex justify-center sm:justify-start'>
                <Link href={"/"} className="logo font-bold text-lg flex justify-center items-center gap-2">
                    <img src="icon.png" width={40} alt="CreatorFuel Logo" />
                    <span>CreatorFuel</span>
                </Link>
            </div>

            <div className='relative flex items-center justify-center gap-2 w-full sm:w-auto'>
                {session && (
                    <>
                        <button 
                            onClick={() => setShowdropdown(!showdropdown)} 
                            onBlur={() => {
                                setTimeout(() => {
                                    setShowdropdown(false)
                                }, 100);
                            }} 
                            id="dropdownDefaultButton" 
                            data-dropdown-toggle="dropdown" 
                            className="inline-flex items-center justify-between sm:justify-center text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium leading-5 rounded-lg text-xs sm:text-sm px-3 sm:px-4 py-2 focus:outline-none max-w-[200px] sm:max-w-[280px] truncate" 
                            type="button"
                        >
                            <span className="truncate">Welcome {session.user?.email}</span>
                            <svg className="w-4 h-4 ms-1.5 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Responsive Dropdown Menu */}
                        <div id="dropdown" className={`z-20 ${showdropdown ? "" : "hidden"} absolute top-12 right-0 bg-slate-800 text-white border border-slate-700 rounded-lg shadow-lg w-44`}>
                            <ul className="p-2 text-sm text-gray-200 font-medium" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <Link href="/dashboard" className="inline-flex items-center w-full p-2 hover:bg-slate-700 hover:text-white rounded">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href={`/${session.user.name}`} className="inline-flex items-center w-full p-2 hover:bg-slate-700 hover:text-white rounded">Your Page</Link>
                                </li>
                                <li>
                                    <button onClick={() => { signOut() }} className="inline-flex items-center w-full p-2 hover:bg-slate-700 hover:text-white rounded text-left">Sign out</button>
                                </li>
                            </ul>
                        </div>
                    </>
                )}

                {session && (
                    <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-xs sm:text-sm px-3 sm:px-4 py-2 text-center rounded-lg whitespace-nowrap" onClick={() => { signOut() }}>
                        Logout
                    </button>
                )}
                
                {!session && (
                    <Link href={"/login"}>
                        <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-xs sm:text-sm px-4 py-2 text-center rounded-lg whitespace-nowrap">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar