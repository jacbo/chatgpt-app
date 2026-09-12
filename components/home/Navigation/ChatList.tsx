import { groupByDate } from "@/common/util"
import { Chat } from "@/types/chat"
import { useEffect, useMemo, useRef, useState } from "react"
import { PiChatBold } from "react-icons/pi"
import ChatItem from "./ChatItem"
import { useEventBusContext } from "@/components/EventBusContext"
import { useAppContext } from "@/components/AppContext"
import { ActionType } from "@/reducers/AppReducer"
import { log } from "node:console"


async function fetchChatList(page:number) {
    const response = await fetch("/api/chat/list?page="+page)
    if(!response.ok)
        throw new Error(response.statusText)
    const {data} = await response.json()
    return data
}

export default function ChatList() {

    const [chatList, setChatList] = useState<Chat[]>([])

    const {state:{selectedChat}, dispatch} = useAppContext()

    const pageRef = useRef<number>(1) // 下次访问是要请求的页数

    const loadMoreRef = useRef(null)

    const hasMoreRef = useRef(false)

    const loadingRef = useRef(false)

    async function loadData(){
        if(loadingRef.current) return
        loadingRef.current = true
        try {
            const data = await fetchChatList(pageRef.current)
            hasMoreRef.current = data.hasMore
            if(pageRef.current === 1){
                setChatList(data.list)
            }else{
                setChatList(prev=>[...prev,...data.list])
            }
            pageRef.current += 1
        }finally{
            loadingRef.current = false
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

    useEffect(()=>{
        let observer: IntersectionObserver | null = null
        let div = loadMoreRef.current
        if(div){
            observer = new IntersectionObserver((entries)=>{
                if(entries[0].isIntersecting && hasMoreRef.current){
                    console.log('visible')
                    loadData()
                }
            })
            observer.observe(div)
        }
        return ()=>{
            if(observer && div){
                observer.unobserve(div)
            }
        }
    })

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
            <div ref={loadMoreRef}>&nbsp;</div>
        </div>
        
    )
}