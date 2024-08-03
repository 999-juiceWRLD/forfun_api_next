import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import User from "@/lib/models/user"
import { Types } from "mongoose"

// api/user/[id]/route.ts

interface Params {
    params: {
        id: string | number;
    }
}

export const GET = async (request: Request, { params }: Params) => {
    try {
        await connectDB();
        const { id } = params;
        // console.log(params);

        if (!Types.ObjectId.isValid(id)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid user id." }),
                { status: 400 }
            )
        }    
        
        const user = await User.findById(id);
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "There's no such user in database" }), { status: 400 });
        } else {
            return new NextResponse(JSON.stringify({ message: "Successfully retrieved", data: user }), { status: 200 });
        }
        
    } catch (err: any) {
        return new NextResponse("Error in doing this " + err.message, { status: 500 });
    }
}

export const DELETE = async (request: Request, { params }: Params) => {
    try {
        await connectDB();
        // not _id but id because the nextjs thinks the parameter is [id]. change the folder name to [_id] to use _id
        const { id } = params;
        // console.log(params);

        if (!Types.ObjectId.isValid(id)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid user id." }),
                { status: 400 }
            )
        }

        // const user = await User.findById(id);
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "There's no such user in database" }), { status: 400 });
        } else {
            return new NextResponse(JSON.stringify({ message: "User deleted successfully" }), { status: 200 });
        }

    } catch (err: any) {
        return new NextResponse("Error in doing this " + err.message, { status: 500 });
    }
}
