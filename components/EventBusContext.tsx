"use client"

import { Action, initState, reducer,State } from "@/reducers/AppReducer";
import {Dispatch, ReactNode, createContext, useCallback, useContext, useMemo, useReducer, useState} from "react"


export type EventListener = (data: any) => void;

type EventBusContextProps = {
  subscribe: (eventName: string, listener: EventListener) => void;
  unsubscribe: (eventName: string, listener: EventListener) => void;
  publish: (eventName: string, data?: any) => void;
}

const EventBusContext = createContext<EventBusContextProps>(null!);

export function useEventBusContext(){
  return useContext(EventBusContext);
}

export default function EventBusContextProvider({children}:{children: ReactNode}){
    const [listeners, setListeners] = useState<Record<string, EventListener[]>>({});

    const subscribe = useCallback((eventName: string, listener: EventListener) => {
        setListeners(prev=>({
            ...prev,
            [eventName]: [
                ...(prev[eventName] || []),
                listener
            ]
        }))
    },[listeners])

    const unsubscribe = useCallback((eventName: string, listener: EventListener) => {
        setListeners(prev=>({
            ...prev,
            [eventName]: prev[eventName]?.filter(l=>l!==listener)
        }))
    },[listeners])

    const publish = useCallback((eventName: string, data: any) => {
        if(listeners[eventName]){
            listeners[eventName].forEach(listener => listener(data));
        }
    }, [listeners]);


    const contextValue = useMemo(() => ({subscribe, unsubscribe, publish}), [listeners]);
    return (
        <EventBusContext.Provider value={contextValue}>{children}</EventBusContext.Provider>
    )
}