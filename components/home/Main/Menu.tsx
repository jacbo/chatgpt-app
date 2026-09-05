"use client"
import { useAppContext } from "@/components/AppContext"
import Button from "@/components/common/Button"
import { LuPanelLeft } from "react-icons/lu"

export default function Menu() {
    const {
        state:{displayNavigation},
        setState
    } = useAppContext()

    return (<Button className={`${displayNavigation ? "hidden " : ""} fixed left-2 top-2`}
            icon={LuPanelLeft}
            variant="outline"
            onClick={() => setState(v => ({ ...v, displayNavigation: true }))}
        />)
}