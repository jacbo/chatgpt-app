"use client"
import { useAppContext } from "@/components/AppContext";
import Menubar from "./Menubar";



export default function Navigation() {

    const {
        state: {displayNavigation}
    } = useAppContext();

    return <nav className={`${displayNavigation?"":"hidden"} h-full w-[260px] bg-gray-900 text-gray-300 p-2`}>
        <Menubar/>
    </nav>
}