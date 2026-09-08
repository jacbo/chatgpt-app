import ChatInput from "./ChatInput";
import Menu from "./Menu";
import MessageList from "./MessageList";
import Welcome from "./Welcome";

export default function Main() {
    return <div className="flex-1 relative">
        <main className="w-full h-full overflow-y-auto bg-white text-gray-900 dark:bg-gray-600 dark:text-gray-100 pb-16">
            <Menu />
            {/* <Welcome /> */}
            <MessageList />
            <ChatInput />
        </main>
    </div>
}