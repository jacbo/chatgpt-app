import { ComponentPropsWithoutRef } from "react";
import { IconType } from "react-icons";

type ButtonProps = {
    icon?: IconType
    variant?: "default" | "outline" | "text"
} & ComponentPropsWithoutRef<'button'>

export default function Button({children, className="", icon:Icon,variant="default", ...props}:ButtonProps) {
  let localClassName = "";
  if(variant === "default") {
    localClassName = "text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900"
  } else if(variant === "outline") {
    localClassName = "border border-gray-300 dark:border-gray-600 text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
  } else if(variant === "text") {
    localClassName = "text-black dark:text-gray-300 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
  }
  return (
    <button className={`  inline-flex ${className} items-center min-w-[38px] min-h-[38px] rounded px-3 py-1.5
      ${localClassName}`}
    {...props}>
      {Icon && <Icon className={`text-lg ${children ? "mr-2" : ""}`} />}
      {children}
    </button>
  )
}