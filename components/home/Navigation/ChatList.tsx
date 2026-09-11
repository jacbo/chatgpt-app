import { groupByDate } from "@/common/util"
import { Chat } from "@/types/chat"
import { useEffect, useMemo, useRef, useState } from "react"
import { PiChatBold } from "react-icons/pi"
import ChatItem from "./ChatItem"
import { useEventBusContext } from "@/components/EventBusContext"
import { useAppContext } from "@/components/AppContext"
import { ActionType } from "@/reducers/AppReducer"


async function fetchChatList(page:number) {
    const response = await fetch("/api/chat/list?page="+page)
    if(!response.ok)
        throw new Error(response.statusText)
    const {data} = await response.json()
    return data.list
}

export default function ChatList() {

    const [chatList, setChatList] = useState<Chat[]>([])

    const {state:{selectedChat}, dispatch} = useAppContext()

    const pageRef = useRef<number>(1)

    async function loadData(){
        const list = await fetchChatList(pageRef.current)
        if(pageRef.current === 1){
            setChatList(list)
        }else{
            setChatList(prev=>[...prev,...list])
        }
    }

    const groupList = useMemo(()=>{
        return groupByDate(chatList)
    },[chatList])

    const {subscribe,unsubscribe} = useEventBusContext()

    useEffect(()=>{
        loadData()
    },[])

    useEffect(()=>{
        const listener = async ()=>{
            pageRef.current = 1
            loadData()
        }
        subscribe("fetchChatList",listener)
        return ()=>{
            unsubscribe("fetchChatList",listener)
        }
    },[])

    return (
        <div className="flex-1 mb-[48px] mt-2 flex flex-col overflow-y-auto select-none">
            {
                groupList.filter(([date,list])=>list?.length>0).map(([date,list])=>{
                    return (
                        <div key={date}>
                            <div className="sticky top-0 z-10 p-3 text-sm bg-gray-900 text-gray-500">
                                {date}
                            </div>
                            <ul>
                                {
                                    list.map(item=>{
                                        let isSelected = selectedChat?.id === item.id
                                        return (<ChatItem key={item.id} item={item} selected={isSelected} onSelect={(chat)=>{
                                            dispatch({type:ActionType.UPDATE,field:"selectedChat",value:chat})
                                        }} />)
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
}