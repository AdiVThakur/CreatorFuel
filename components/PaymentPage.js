"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

const PaymentPage = ({ username }) => {
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const router = useRouter()
    const [paymentform, setPaymentform] = useState({})
    const [currentuser, setCurrentuser] = useState({})
    const [payments, setPayments] = useState([])

    useEffect(() => {
        getData()
    }, [username, searchParams])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('Payment Successful')
            router.push(`/${username}`)
        }
    }, [searchParams, username, router])

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setCurrentuser(u || {})
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments || [])
    }

    const pay = async (amount) => {
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount")
            return
        }

        let a = await initiate(amount, username, paymentform);
        let orderId = a.order.id;

        var options = {
            "key": a.key || currentuser.razorpayid,
            "amount": amount,
            "currency": "INR",
            "name": "Send Fuel",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": {
                "name": paymentform.name || session?.user?.name || "Gaurav Kumar",
                "email": session?.user?.email || "gaurav.kumar@example.com",
                "contact": "+919876543210"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full relative'>
                <img className='object-cover w-full h-[220px] sm:h-[300px] md:h-[380px]' src={currentuser.coverpic} alt="" />
                <div className='absolute -bottom-12 sm:-bottom-14 left-1/2 -translate-x-1/2 border-2 border-white rounded-full size-20 sm:size-24 overflow-hidden'>
                    <img className='rounded-full object-cover size-20 sm:size-24' width={96} height={96} src={currentuser.profilepic || "/avatar.gif"} alt="" />
                </div>
            </div>
            <div className="info flex items-center justify-center my-12 sm:my-15 flex-col gap-2 px-4">
                <div className='font-bold text-lg text-center'>
                    @{username}
                </div>
                <div className='text-slate-400 text-center text-sm sm:text-base'>
                    Let's help {username} get energy!
                </div>
                <div className='text-slate-400 mb-5 text-center text-xs sm:text-sm px-2'>
                    ⚡ {payments.length} {payments.length === 1 ? 'spark' : 'sparks'} sent · ₹{payments.reduce((acc, p) => acc + (p.amount || 0), 0) / 100} raised to power {currentuser?.name || username}’s goal!
                </div>
                <div className="payment flex flex-col md:flex-row gap-4 sm:gap-6 w-full sm:w-[90%] md:w-[85%] lg:w-[80%]">
                    <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg p-4 sm:p-5">
                        <h2 className='text-lg sm:text-xl font-bold my-3'>Top 10 Supporters</h2>
                        <ul className='mx-2 sm:mx-5 text-sm sm:text-base'>
                            {payments.length === 0 &&
                                <li className='my-4'>No payments yet.</li>
                            }
                            {payments.map((p, i) => {
                                return (
                                    <li key={p._id || i} className='my-4 flex gap-2 items-center'>
                                        <img width={33} src="/avatar.gif" alt="user avatar" className='shrink-0' />
                                        <span className='break-words min-w-0'>
                                            {p.name} donated <span className='font-bold'>₹{p.amount / 100}</span> with message "{p.message}"
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg p-4 sm:p-5">
                        <h2 className='text-lg sm:text-xl font-bold my-3 sm:my-5'>Make a Payment</h2>
                        <div className='flex gap-2 flex-col'>
                            <div>
                                <input name="name" onChange={handleChange} value={paymentform.name || ""} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                            </div>
                            <input name="message" onChange={handleChange} value={paymentform.message || ""} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />

                            <input name="amount" onChange={handleChange} value={paymentform.amount || ""} type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                            <button
                                onClick={() => { pay(Number(paymentform.amount) * 100) }}
                                disabled={
                                    !paymentform.name || paymentform.name.length < 3 ||
                                    !paymentform.message || paymentform.message.length < 4 ||
                                    !paymentform.amount || Number(paymentform.amount) < 1
                                }
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-4 py-2.5 text-center leading-5 mx-0 sm:mx-1 rounded-lg disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                            >
                                Pay
                            </button>
                        </div>
                        <div className='grid grid-cols-3 gap-2 mt-5'>
                            <button disabled={
                                !paymentform.name || paymentform.name.length < 3 ||
                                !paymentform.message || paymentform.message.length < 4
                            } className='bg-slate-800 p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm text-center disabled:opacity-50' onClick={() => { pay(1000) }}>Pay ₹10</button>
                            <button disabled={
                                !paymentform.name || paymentform.name.length < 3 ||
                                !paymentform.message || paymentform.message.length < 4
                            } className='bg-slate-800 p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm text-center disabled:opacity-50' onClick={() => { pay(2000) }}>Pay ₹20</button>
                            <button disabled={
                                !paymentform.name || paymentform.name.length < 3 ||
                                !paymentform.message || paymentform.message.length < 4
                            } className='bg-slate-800 p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm text-center disabled:opacity-50' onClick={() => { pay(3000) }}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage