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

    let plainUser = JSON.parse(JSON.stringify(u));
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

    // Standardize handle values
    const newUsername = ndata.username || ndata.Username;
    if (newUsername) {
        ndata.username = newUsername;
        ndata.Username = newUsername;
    }

    // If username is changing, check for collision with another user
    if (newUsername && oldusername && newUsername !== oldusername) {
        let existingUser = await User.findOne({ 
            $or: [{ username: newUsername }, { Username: newUsername }],
            email: { $ne: ndata.email } // Ensure we aren't colliding with our own email
        }).lean();
        
        if (existingUser) {
            return { error: "Username already exists" };
        }

        // Update past payments to reflect the new creator handle
        await Payment.updateMany({ to_user: oldusername }, { to_user: newUsername });
    }

    // Single database update
    await User.updateOne({ email: ndata.email }, { $set: ndata });
    return { success: true, message: "Profile updated successfully" };
};
