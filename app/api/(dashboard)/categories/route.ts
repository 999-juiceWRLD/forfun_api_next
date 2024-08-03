import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import User from "@/lib/models/user"
import Category from "@/lib/models/category"
import { Types } from "mongoose"

export const GET = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const _id = searchParams.get("userId");
        
        if (!_id || !Types.ObjectId.isValid(_id)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing user ID"}), 
            { status: 400 })
        }

        await connectDB();
        const user = await User.findById(_id);
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found in database."}), 
            { status: 400 })
        }

        const categories = await Category.find({ user: new Types.ObjectId(_id) });
        return new NextResponse(JSON.stringify(categories), { status: 200 })
    } catch (err: any) {
        return new NextResponse("Error in fetching categories: " + err.message, { status: 500 })
    }
}

export const POST = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const _id = searchParams.get("userId");
        const { title } = await request.json();

        if (!_id || !Types.ObjectId.isValid(_id)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing user ID"}), 
            { status: 400 })
        }

        await connectDB();
        const user = await User.findById(_id);
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found in the database" }),
            { status: 404 })
        }

        const newCategory = new Category({
            title: title,
            user: new Types.ObjectId(_id)
        });
        await newCategory.save();
        
        return new NextResponse(JSON.stringify({ message: "Category has been created successfully", category: newCategory }), 
        { status: 200 })

    } catch (err: any) {
        return new NextResponse("Error in creating category: " + err.message, { status: 500 })
    }
}