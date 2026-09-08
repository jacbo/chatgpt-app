import Button from "@/components/common/Button";
import Markdown from "@/components/common/Markdown";
import messageList from "@/data/messages.json";
import { useState } from "react";
import { PiRobotFill } from "react-icons/pi";

export default function MessageList() {
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
                                <Markdown className={`border-0 rounded-lg bg-[#d8d5d5] dark:bg-[#d8d5d5]`}>{message.content}</Markdown>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
}