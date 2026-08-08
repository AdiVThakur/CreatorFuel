import mongoose from 'mongoose';

const connectDB = async () => {
  // Return early if already connected
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/creatorfuel`);
    console.log(`MongoDB Connected: ${conn.connection.host}`); // 👈 Fixed string interpolation template literal
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
}

export default connectDB;