import PaymentPage from '@/components/PaymentPage'
import React from 'react'
import { notFound } from "next/navigation"
import connectDB from '@/db/connectDb'
import User from '@/models/User'

const Username = async ({ params }) => {
    // 1. Next.js 15 requires awaiting params
    const { username } = await params;

    await connectDB();

    // 2. Use .lean() to get a plain JS object instead of a Mongoose Document
    const u = await User.findOne({
        $or: [
            { username: username },
            { Username: username }
        ]
    }).lean();

    // 3. Trigger 404 if user does not exist
    if (!u) {
        return notFound();
    }

    return (
        <>
            <PaymentPage username={username} />
        </>
    );
};

export default Username;

export async function generateMetadata({params}){
    const { username } = await params;
    return {
        title:`Support ${username} - Creator Fuel`
    }
}