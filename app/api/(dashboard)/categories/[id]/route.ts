import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import User from "@/lib/models/user"
import Category from "@/lib/models/category"
import { Types } from "mongoose"

interface Params {
    params: {
        id: string | number;
    }
}
// kendi kafana göre bir şeyler ekledin, adamın videosundan devam et. dakika 59.
export const UPDATE = async (request: Request, { params }: Params) => {
    try {

    } catch (err: any) {

    }
}