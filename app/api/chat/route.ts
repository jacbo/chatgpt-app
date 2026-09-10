import { sleep } from "@/common/util";
import { NextRequest,NextResponse } from "next/server";

const encoder = new TextEncoder()

export async function POST(request: NextRequest) {
  const {messages} = await request.json()

  const stream = new ReadableStream({
        async start(controller) { 
            const messageText = messages[messages.length - 1].content
            for(let i = 0; i < messageText.length; i++){
                await sleep(50)
                controller.enqueue(encoder.encode(messageText[i]))
                console.log(messageText[i])
            }
            controller.close()
        }
    })
    return new Response(stream)
}