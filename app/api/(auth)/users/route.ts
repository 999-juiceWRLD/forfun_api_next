import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import User from "@/lib/models/user"
import { Types } from "mongoose"

const ObjectID = require("mongoose").Types.ObjectId;

export const GET = async () => {
    try {
        await connectDB();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (err: any) {
        return new NextResponse("Error in fetching users " + err.message, { status: 500 });
    }
}

export const POST = async (request: Request) => {
    try {
        await connectDB();
        const body = await request.json();
        const { email, username, password } = body;
        const newUser = new User({ email, username, password });
        await newUser.save();

        return new NextResponse(JSON.stringify({ message: "User is created", data: newUser }), { status: 200 });

    } catch (err: any) {
        return new NextResponse("Error creating this user " + err.message, { status: 500 })
    }
}

export const PATCH = async (request: Request) => {
    try {
        await connectDB();
        const body = await request.json();
        const { _id, username } = body;

        // this only stands for when you don't enter "_id" or "username" in JSON in Postman!
        if (!_id || !username) {
            return new NextResponse(
                JSON.stringify({ message: "ID or username not found." }),
                { status: 400 }
            )
        }

        if (!Types.ObjectId.isValid(_id)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid user id." }),
                { status: 400 }
            )
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: new ObjectID(_id) },
            { username: username },
            { new: true }
        );

        if (!updatedUser) {
            return new NextResponse(JSON.stringify({ message: "User is not found" }), { status: 400 })
        }

        return new NextResponse(JSON.stringify({ message: "User is updated", user: updatedUser }), { status: 200 })
    } catch (err: any) {
        return new NextResponse("Error in updating user " + err.message, { status: 500 })
    }
}

export const DELETE = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const _id = searchParams.get("userId")!; // put ! because this is string | null, where null can't be put into ObjectId.isValid()
        
        // checks for if the `?userId=<ID>` is entered into URL or not
        if (!_id) {
            return new NextResponse(JSON.stringify({ message: "`userId` query is not entered." }), { status: 400 })
        }

        if (!Types.ObjectId.isValid(_id)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid user id." }),
                { status: 400 }
            )
        }

        await connectDB();
        const deleteUsers = await User.findByIdAndDelete(new Types.ObjectId(_id));
        if (!deleteUsers) {
            return new NextResponse(JSON.stringify({ message: "User is not found in database" }), { status: 400 })
        } else {
            return new NextResponse(JSON.stringify({ message: "The user has been deleted." }), { status: 200 })
        }
    } catch (err: any) {
        return new NextResponse("Error deleting all the users " + err.message, { status: 500 })
    }
}