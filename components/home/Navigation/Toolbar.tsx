import { useAppContext } from "@/components/AppContext";
import Button from "@/components/common/Button";
import { ActionType } from "@/reducers/AppReducer";
import { HiPlus } from "react-icons/hi";
import { LuPanelLeft } from "react-icons/lu";
import { MdDarkMode, MdInfo, MdLightMode   } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa6";


export default function Toolbar() {

    const {
        state:{
            themeMode
        },
        dispatch
    } = useAppContext();

    let icon = themeMode === "dark" ? MdDarkMode : FaRegLightbulb ;

    return <div className="absolute bottom-0 left-0 right-0 bg-gray-800 flex p-2 justify-between">
        <Button
        icon={icon}
        variant="text"
        onClick={() =>  dispatch({type: ActionType.UPDATE, field: "themeMode", value: themeMode === "dark" ? "light" : "dark"})}
        />
        <Button 
            icon={MdInfo}
            variant="text"
        />
    </div>
}