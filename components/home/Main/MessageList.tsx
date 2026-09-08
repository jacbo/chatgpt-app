import messageList from "@/data/messages.json";
import { PiRobotFill } from "react-icons/pi";

export default function MessageList() {
    return <div className="w-full pt-10 pb-48 dark:text-gray-300">
        <ul>
            {
                messageList.map((message) => (
                    <li key={message.id} className="p-2">
                        <div>
                            <div>
                                {message.role==="user" ? "🙂":<PiRobotFill className="text-gray-900"/>}
                            </div>
                            <div>{message.content}</div>
                        </div>
                    </li>
                ))
            }
        </ul>
    </div>
}