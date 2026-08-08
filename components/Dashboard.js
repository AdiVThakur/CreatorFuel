"use client"
import React, { useEffect, useState, useCallback } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Dashboard = () => {
    const { data: session, status, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({
        name: '',
        email: '',
        username: '',
        profilepic: '',
        coverpic: '',
        razorpayid: '',
        razorpaysecret: ''
    })

    const getData = useCallback(async () => {
        const identifier = session?.user?.email || session?.user?.name
        if (identifier) {
            let u = await fetchuser(identifier)
            if (u) {
                setform(u)
            }
        }
    }, [session])

    useEffect(() => {
        document.title = "Dashboard - Creator Fuel"

        if (status === "unauthenticated") {
            router.push('/login')
        } else if (status === "authenticated") {
            getData()
        }
    }, [status, router, getData])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        // Pass updated form data and current username to server action
        let res = await updateProfile(form, session?.user?.name)
        if (res?.error) {
            toast.error(res.error)
        } else {
            toast.success('Profile Updated Successfully!')
            update()
        }
    }

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-120px)] text-white">
                <p className="text-lg">Loading dashboard...</p>
            </div>
        )
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className='container mx-auto py-8 px-4 sm:px-6 min-h-[calc(100vh-120px)]'>
                <h1 className='text-center my-6 text-2xl sm:text-3xl font-bold text-white'>
                    Welcome to your Dashboard
                </h1>

                <form className="max-w-2xl mx-auto bg-slate-900/60 p-6 sm:p-8 rounded-xl border border-slate-800 shadow-xl" onSubmit={handleSubmit}>

                    <div className='my-4'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-200">Name</label>
                        <input value={form.name || ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2.5 text-gray-100 border border-slate-700 rounded-lg bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" />
                    </div>

                    <div className="my-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">Email</label>
                        <input value={form.email || ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2.5 text-gray-100 border border-slate-700 rounded-lg bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" />
                    </div>

                    <div className='my-4'>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-200">Username</label>
                        <input value={form.username || ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2.5 text-gray-100 border border-slate-700 rounded-lg bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" />
                    </div>

                    <div className="my-4">
                        <label htmlFor="profilepic" className="block mb-2 text-sm font-medium text-gray-200">Profile Picture URL</label>
                        <input value={form.profilepic || ""} onChange={handleChange} type="text" name='profilepic' id="profilepic" className="block w-full p-2.5 text-gray-100 border border-slate-700 rounded-lg bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" />
                    </div>

                    <div className="my-4">
                        <label htmlFor="coverpic" className="block mb-2 text-sm font-medium text-gray-200">Cover Picture URL</label>
                        <input value={form.coverpic || ""} onChange={handleChange} type="text" name='coverpic' id="coverpic" className="block w-full p-2.5 text-gray-100 border border-slate-700 rounded-lg bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" />
                    </div>

                    <div className="my-4">
                        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-200">Razorpay Id</label>
                        <input value={form.razorpayid || ""} onChange={handleChange} type="text" name='razorpayid' id="razorpayid" className="block w-full p-2.5 text-gray-100 border border-slate-700 rounded-lg bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" />
                    </div>

                    <div className="my-4">
                        <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-200">Razorpay Secret</label>
                        <input value={form.razorpaysecret || ""} onChange={handleChange} type="password" name='razorpaysecret' id="razorpaysecret" className="block w-full p-2.5 text-gray-100 border border-slate-700 rounded-lg bg-slate-800 text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" />
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="block w-full p-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium text-sm transition-colors">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Dashboard