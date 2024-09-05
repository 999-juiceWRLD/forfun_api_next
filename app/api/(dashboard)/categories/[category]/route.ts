import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import User from "@/lib/models/user"
import Category from "@/lib/models/category"
import mongoose, { Types } from "mongoose"

interface Params {
    params: {
        category: string | number;
    }
}
// kendi kafana göre bir şeyler ekledin, adamın videosundan devam et. dakika 59.
export const UPDATE = async (request: Request, { params }: Params) => {
    try {
        
    } catch (err: any) {

    }
}

// nothing
export const PATCH = async (request: Request, { params }: Params) => {
    try {
        const { category } = params;
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId")!;
        console.log(category, userId);

        if (!Types.ObjectId.isValid(category)) {
            return new NextResponse(JSON.stringify("Not a valid category (user) id."), { status: 400 });
        }

        await connectDB();
        const user = await User.findById(category);
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "There's no such user." }), { status: 404 });
        }
        return new NextResponse(JSON.stringify({ message: "Successfully retrieved", category: category, data: user }), { status: 200 });

    } catch (error: any) {
        return new NextResponse("Error in uploading category, " + error.message, { status: 500 });
    }
}