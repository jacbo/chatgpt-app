import { groupByDate } from "@/common/util"
import { Chat } from "@/types/chat"
import { useMemo, useState } from "react"
import { PiChatBold } from "react-icons/pi"
import ChatItem from "./ChatItem"

export default function ChatList() {

    const [chatList, setChatList] = useState<Chat[]>([
        {
            id: "1",
            name: "React 入门实战教程",
            updateTime: Date.now()
        },
        {
            id: "2",
            name: "如何使用Next.js创建React项目",
            updateTime: Date.now() -1000*60*60*24
        },
        {
            id: "3",
            name: "执行小课",
            updateTime: Date.now()-1000*60*60*24*180
        },
        {
            id: "4",
            name: "React 官方文档",
            updateTime: Date.now()-1000*60*60*24*180
        },
        {
            id: "5",
            name: "React 官方文档",
            updateTime: Date.now()-1000*60*60*24*180
        },
        {
            id: "6",
            name: "React 官方文档",
            updateTime: Date.now()-1000*60*60*24*180
        },
        {
            id: "7",
            name: "React 官方文档",
            updateTime: Date.now()-1000*60*60*24*18
        },
        {
            id: "8",
            name: "React 官方文档",
            updateTime: Date.now()-1000*60*60*24*18
        },
        {
            id: "9",
            name: "TypeScript 类型体操入门",
            updateTime: Date.now()-1000*60*60*24*7
        },
        {
            id: "10",
            name: "Tailwind CSS 实用技巧",
            updateTime: Date.now()-1000*60*60*24*6
        },
        {
            id: "11",
            name: "Node.js 接口开发实践",
            updateTime: Date.now()-1000*60*60*24*5
        },
        {
            id: "12",
            name: "数据库设计与优化",
            updateTime: Date.now()-1000*60*60*24*4
        },
        {
            id: "13",
            name: "Next.js 服务端渲染",
            updateTime: Date.now()-1000*60*60*24*3
        },
        {
            id: "14",
            name: "前端性能优化指南",
            updateTime: Date.now()-1000*60*60*24*2
        },
        {
            id: "15",
            name: "JavaScript 异步编程",
            updateTime: Date.now()-1000*60*60*24*9
        },
        {
            id: "16",
            name: "CSS 布局基础",
            updateTime: Date.now()-1000*60*60*24*9
        },
        {
            id: "17",
            name: "Git 工作流与协作",
            updateTime: Date.now()-1000*60*60*24*9
        },
        {
            id: "18",
            name: "RESTful API 设计",
            updateTime: Date.now()-1000*60*60*24*9
        },
        {
            id: "19",
            name: "React Hooks 深入理解",
            updateTime: Date.now()-1000*60*60*24*9
        },
        {
            id: "20",
            name: "组件化开发实践",
            updateTime: Date.now()-1000*60*60*24*9
        },
        {
            id: "21",
            name: "Web 安全基础知识",
            updateTime: Date.now()-1000*60*60*24*9
        },
        {
            id: "22",
            name: "Docker 入门教程",
            updateTime: Date.now()-1000*60*60*24*9
        },
        {
            id: "23",
            name: "前端工程化配置",
            updateTime: Date.now()-1000*60*60*24*9
        },
        {
            id: "24",
            name: "Markdown 编辑器开发",
            updateTime: Date.now()-1000*60*60*24*9
        },
        {
            id: "25",
            name: "响应式设计案例",
            updateTime: Date.now()-1000*60*30*24*9
        },
        {
            id: "26",
            name: "状态管理方案对比",
            updateTime: Date.now()-1000*60*20
        },
        {
            id: "27",
            name: "单元测试实战",
            updateTime: Date.now()-1000*60*15*24*9
        },
        {
            id: "28",
            name: "前端面试题整理",
            updateTime: Date.now()-1000*60*10*24*9
        },
        {
            id: "29",
            name: "项目部署与上线",
            updateTime: Date.now()-1000*60*5
        },
        {
            id: "30",
            name: "个人学习计划",
            updateTime: Date.now()
        }
        
    ])

    const [selectedChat, setSelectedChat] = useState<Chat | null>(chatList[0])

    const groupList = useMemo(()=>{
        return groupByDate(chatList)
    },[chatList])

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
                                            setSelectedChat(chat)
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