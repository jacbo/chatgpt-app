import { Chat } from "@/types/chat";
import moment from "moment";


export function groupByDate(chatList: Chat[]) :[string,Chat[]][] {
    chatList.sort((a,b) => b.updateTime - a.updateTime);
    let today:Chat[] = [],sevenDays:Chat[] = [],month:Chat[] = [],early:Chat[] = [];

    chatList.forEach(chat => {
        const now = moment();
        let date = moment(chat.updateTime);
        if(date.isSame(now, 'day')){
            today.push(chat);
        }else if(now.subtract(7, 'days').isBefore(date)){
            sevenDays.push(chat);
        }else if(now.subtract(30, 'days').isBefore(date)){
            month.push(chat);
        }else{
            early.push(chat);
        }
    })
    return [['今天',today], ['最近七天',sevenDays], ['最近一个月',month], ['更早',early]];
}