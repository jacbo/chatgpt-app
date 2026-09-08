import { Chat } from "@/types/chat"
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { PiChatBold } from "react-icons/pi";

type Props = {
    item: Chat;
    selected: boolean;
    onSelect: (item: Chat) => void;
}

export default function ChatItem({ item, selected, onSelect }: Props) {
    const [editing, setEditing] = useState<boolean>(false)
    return (<li
        onClick={() => {
            onSelect(item)
        }}
        className={`relative group flex items-center space-x-3 cursor-pointer p-2 m-1 hover:bg-gray-800 rounded-md
                                                ${selected ? "bg-gray-800 pr-[3.5em]" : ""}`}>
        <div>
            <PiChatBold />
        </div>
        <div className="relative flex-1 whitespace-nowrap overflow-hidden">
            {item.name}
            <span className={`absolute right-0 inset-y-0 w-8 bg-gradient-to-l group-hover:from-gray-800
                                                        ${selected ? " from-gray-800" : "from-gray-900"}
                                                        `}></span>
        </div>
        {selected && (<div className="absolute right-1 flex  ">
            <button className="p-1 hover:text-white">
                <AiOutlineEdit />
            </button>
            <button className="p-1 hover:text-white">
                <MdDeleteOutline />
            </button>
        </div>)}
        
    </li>)
}