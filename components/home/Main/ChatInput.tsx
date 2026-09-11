import { useAppContext } from "@/components/AppContext";
import Button from "@/components/common/Button";
import moment from "moment";
import { Message, MessageRequestBody } from "@/types/chat";
import { useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";
import { PiLightningFill, PiStopBold } from "react-icons/pi";
import TextareaAutoSize from "react-textarea-autosize"
import {v4 as uuidv4} from "uuid"
import { ActionType } from "@/reducers/AppReducer";

const decoder = new TextDecoder()

export default function ChatInput(){

    const [messageText,setMessageText] = useState("")
    
    const {state:{messageList,currentModel,streamingId},dispatch} = useAppContext()

    const stopRef = useRef(false);

    async function createOrUpdateMessage(message: Message){
        const response = await fetch("/api/message/update",{
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(message)
        })
        if(!response.ok){
            console.log(response.statusText)
            return
        }

        const {data} = await response.json()
        return data.message;
    }

    async function send() {
        let message: Message = {
            id: "",
            role: "user",
            content: messageText,
            chatId: ""
        }

        message = await createOrUpdateMessage(message);



        const messages = [...messageList,message]

        
        dispatch({
            type: ActionType.ADD_MESSAGE,
            message
        })
        await doSend(messages)
    }

    async function resend(){
        const messages = [...messageList]
        if(messages.length>0 && messages[messages.length-1].role==="assistant"){
            dispatch({
                type: ActionType.REMOVE_MESSAGE,
                message: messages[messages.length-1]
            })
        }
        messages.splice(0,messages.length-1,1)
        await doSend(messages)
    }

    async function doSend(messages:Message[]){

        
        setMessageText("")
        
        const body: MessageRequestBody = {messages,model:currentModel}
        const controller = new AbortController()
        const response = await fetch("/api/chat",{
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            signal: controller.signal,
            body: JSON.stringify(body)
        })
        if(!response.ok){
            console.log(response.statusText)
            return
        }

        if(!response.body){
            console.log('body error')
            return
        }

        const responseMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content: "",
            chatId: ""
        }

        dispatch({
            type: ActionType.ADD_MESSAGE,
            message: responseMessage
        })

        dispatch({
            type: ActionType.UPDATE,
            field: "streamingId",
            value: responseMessage.id
        })

        const reader = response.body.getReader()
        let content = ""
        let done = false;
        while(!done){
            if(stopRef.current){
                stopRef.current = false
                controller.abort()
                break
            }
            const result = await reader.read()
            done = result.done
            const chunk = decoder.decode(result.value,{stream:true})
            console.log(chunk)
            content += chunk
            dispatch({
                type: ActionType.UPDATE_MESSAGE,
                message: {...responseMessage,content}
            })
        }
        dispatch({
            type: ActionType.UPDATE,
            field: "streamingId",
            value: ""
        })
        
    }

    return <div className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 px-2
     dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]">
        {
            messageList.length !== 0 && (
                streamingId ? (
                    <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4">
                        <Button icon={PiStopBold} variant="primary" className="font-medium"
                            onClick={()=>{
                                stopRef.current=true
                            }}
                        >停止生成</Button>
                    </div>
                ):
                (
                    <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4">
                        <Button icon={MdRefresh} variant="primary" className="font-medium"
                        onClick={resend}
                        >重新生成</Button>
                    </div>
                )
            )
        }
        
        <div className="flex items-end w-full border border-black/10 dark:border-gray-800 bg-white dark:bg-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] py-4">
            <div className="mx-2 mb-3.5">
                <PiLightningFill />
            </div>
            <TextareaAutoSize 
                className="outline-none flex-1 max-h-64 mb-1.5 bg-transparent text-black dark:tex-white resize-none border-0"
                placeholder="请输入消息..."
                onChange={(e)=>{
                    setMessageText(e.target.value)
                }}
                value={messageText}
                rows={1}
            />
            <Button 
                disabled={messageText.trim() === "" || streamingId!==""}
                onClick={send}
                className="mx-3 !rounded-lg"
                icon={FiSend} variant="primary"></Button>
        </div>
        <footer className="text-center text-sm text-gray-700 dark:text-gray-300 px-2">
            {moment().format('YYYY年MM月DD日')}&nbsp; {" "}
            <a
                className="font-medium-py-[1px] border-b border-dotted border-black/60 hover:border-black/0 dark:border-gray-200 dark:hover:border-gray-200/0 animated-underline">
                快乐星球
            </a>
            .&nbsp;基于第三方提供的接口
        </footer>
    </div>
}