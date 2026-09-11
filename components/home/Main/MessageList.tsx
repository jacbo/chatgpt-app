import { useAppContext } from "@/components/AppContext";
import Button from "@/components/common/Button";
import Markdown from "@/components/common/Markdown";
import { ActionType } from "@/reducers/AppReducer";
// import messageList from "@/data/messages.json";
import { useEffect, useState } from "react";
import { PiRobotFill } from "react-icons/pi";


async function fetchMessageList(chatId:string) {
    const response = await fetch("/api/message/list?chatId="+chatId)
    if(!response.ok)
        throw new Error(response.statusText)
    const {data} = await response.json()
    return data.list
}

export default function MessageList() {

    const {state:{messageList,streamingId,selectedChat},dispatch} = useAppContext();

    useEffect(()=>{ 
        if(selectedChat){
            fetchMessageList(selectedChat.id).then(list=>dispatch({type:ActionType.UPDATE,field:"messageList",value:list}))
        }else{
            dispatch({type:ActionType.UPDATE,field:"messageList",value:[]})
        }
    },[selectedChat])

    return <div className="w-full pt-10 pb-48 dark:text-gray-300">
        <ul>
            {
                messageList.map((message) => (
                    <li key={message.id} className="p-2">
                        <div className={`w-full max-w-8xl mx-auto flex space-x-6 px-4 px-6 text-lg 
                            ${message.role === "user" ? "flex-row-reverse text-right" : ""}`}>
                            <div className="text-3xl leading-[1]">
                                {message.role==="user" ? "🙂":<PiRobotFill className="text-gray-900"/>}
                            </div>
                            <div className="">
                                <Markdown className={`border-0 rounded-lg bg-[#d8d5d5] dark:bg-gray-700`}>{`${message.content}${
                                    streamingId === message.id ? "▎" : ""
                                }`}</Markdown>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
}