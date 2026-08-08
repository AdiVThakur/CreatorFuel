"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb"
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB();

    let user = await User.findOne({ 
        $or: [{ username: to_username }, { Username: to_username }] 
    }).lean();

    if (!user) {
        throw new Error("User not found");
    }

    const keyId = user.razorpayid;
    const keySecret = user.razorpaysecret;

    if (!keyId || !keySecret) {
        throw new Error("Razorpay credentials not set for this creator.");
    }

    const instance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
    });

    let options = {
        amount: Number.parseInt(amount), // Amount in paise
        currency: "INR",
    };

    let x = await instance.orders.create(options);

    await Payment.create({
        oid: x.id,
        amount: amount,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message
    });

    return {
        order: x,
        key: keyId
    };
};

export const fetchuser = async (username) => {
    await connectDB();

    let u = await User.findOne({ 
        $or: [{ username: username }, { email: username }, { Username: username }] 
    }).lean();

    if (!u) return null;

    // 1. Serialize first to strip Mongoose internal symbols
    let plainUser = JSON.parse(JSON.stringify(u));

    // 2. Safely add fallback property on plain object
    plainUser.username = plainUser.username || plainUser.Username || "";

    return plainUser;
};

export const fetchpayments = async (username) => {
    await connectDB();
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean();
    return JSON.parse(JSON.stringify(p));
};

export const updateProfile = async (data, oldusername) => {
    await connectDB();

    let ndata = data instanceof FormData ? Object.fromEntries(data) : { ...data };
    delete ndata._id;
    
    const targetUsername = ndata.username || ndata.Username;

    if (targetUsername && targetUsername !== oldusername) {
        let u = await User.findOne({ 
            $or: [{ username: targetUsername }, { Username: targetUsername }] 
        }).lean();
        
        if (u) {
            return { error: "Username already exists" };
        }
        await User.updateOne({ email: ndata.email }, ndata);
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username });
    }
    
    if (ndata.username) {
        ndata.Username = ndata.username;
    }

    await User.updateOne({ email: ndata.email }, ndata);
    return { success: true, message: "Profile updated successfully" };
};