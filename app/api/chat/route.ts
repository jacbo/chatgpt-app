import { sleep } from "@/common/util";
import openai from "@/lib/openai";
import { NextRequest,NextResponse } from "next/server";

const encoder = new TextEncoder()

export async function POST(request: NextRequest) {
  const {messages,model} = await request.json()

  const stream = new ReadableStream({
        async start(controller) { 
            // const messageText = messages[messages.length - 1].content
            // for(let i = 0; i < messageText.length; i++){
            //     await sleep(50)
            //     controller.enqueue(encoder.encode(messageText[i]))
            //     console.log(messageText[i])
            // }

            const stream = await openai.chat.completions.create({
                model,
                messages:[{role: 'system', content: '你是一个人工只能助手，根据用户的回答做出简短的回应。'},...messages],
                temperature: 0.7,
                stream: true, // 开启流式传输
                max_completion_tokens: 1024,
                // reasoning:{"enabled":false}
            });

            for await (const chunk of stream) {
                if(chunk.choices[0]?.delta?.content){
                    controller.enqueue(chunk.choices[0]?.delta?.content)
                }
            }
            controller.close()
        }
    })
    return new Response(stream)
}