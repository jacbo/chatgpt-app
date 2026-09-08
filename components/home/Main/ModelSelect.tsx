import { useAppContext } from "@/components/AppContext"
import { ActionType } from "@/reducers/AppReducer"
import { PiLightningFill, PiShootingStarFill } from "react-icons/pi"

export default function ModelSelect() {
    const models = [
        { name: "GPT-3.5", id: "gpt-3.5-turbo",icon: PiLightningFill },
        { name: "GPT-4", id: "gpt-4",icon: PiShootingStarFill }
    ]

    const { state:{currentModel},dispatch} = useAppContext()

    return (<div className="flex bg-gray-200 dark:bg-gray-900 p-2 rounded-lg space-x-2">
        {
            models.map((model) => {
                const selected = model.id === currentModel
                return (
                    <button key={model.id}
                        onClick={()=>{
                            dispatch({
                                type: ActionType.UPDATE,
                                field: "currentModel",
                                value: model.id
                            })
                        }}
                        className={`transition-colors duration-300 group hover:text-gray-900 hover:dark:text-gray-100 flex justify-center items-center space-x-2 py-2.5 min-w-[148px] text-sm font-medium border rounded-lg
                        ${selected ? "border-gray-200 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100" 
                        : "border-transparent text-gray-500"}`}>
                        <span className={`group-hover:text-[#26cf8e] transition-colors duration-300 ${selected?"text-[#26cf8e]":""}`}>
                            <model.icon />
                        </span>
                        <span className="transition-colors duration-300">
                            {model.name}
                        </span>
                    </button>
                )
            })
        }
    </div>)
}