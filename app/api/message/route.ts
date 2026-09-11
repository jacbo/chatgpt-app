import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const body = await request.json()
    const {id,...data} = body
    if(!data.chatId){
        const chat = await prisma.chat.create({
            data:{
                title: "新对话"
            }
        })
        data.chatId = chat.id
    }
    let message
    if(id){
        message = await prisma.message.update({
            where:{
                id
            },
            data
        })
    }else{
        message = await prisma.message.create({
            data
        })
    }

    return NextResponse.json({
        code: 0,
        data: {message}
    })
}

export async function DELETE(request: NextRequest) { 
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    if(!id){
        return NextResponse.json({
            code: 1,
            message: 'id is required'
        })
    }
    await prisma.message.delete({
        where:{
            id
        }
    })
    return NextResponse.json({
        code: 0,
        message: 'success'
    })
}