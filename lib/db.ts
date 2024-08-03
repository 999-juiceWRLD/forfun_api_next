import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

export const connectDB = async () => {
    const connectionState = mongoose.connection.readyState;
    
    if (connectionState === 1) {
        console.log("Already connected.");
        return;
    }
    
    if (connectionState === 2) {
        console.log("Connecting");
        return;
    }

    try {
        mongoose.connect(MONGODB_URI!, {
            dbName: "some_api_db",
            bufferCommands: true
        });
        console.log("Connected.");
    } catch (err: any) {
        console.log("Erreur:", err);
        throw new Error("Nouvelle Erreur:", err);
    }

}