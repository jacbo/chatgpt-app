import { MdOutlineTipsAndUpdates } from "react-icons/md";
import examples from "@/data/examples.json"
import Button from "@/components/common/Button";
import { useMemo, useState } from "react";

export default function Example() {
    const [showAll, setShowAll] = useState(false)
    const list = useMemo(() => {
        return showAll ? examples : examples.slice(0, 50)
    }, [showAll])
    return <>
        <div className="mt-20 mb-4 text-4xl">
            <MdOutlineTipsAndUpdates />
        </div>

        <ul className="flex justify-center flex-wrap gap-3.5 mb-10">
            {
                list.map((item) => (
                    <li key={item.act}>
                        <Button>{item.act}</Button>
                    </li>
                ))
            }
        </ul>
        {
            (
                <>
                    <p className="p-2">...</p>
                    <div className="flex items-center w-full space-x-2">
                        <hr className="flex-1 border-t border-dotted border-gray-200 dark:border-gray-700" />
                        <Button onClick={() => setShowAll(!showAll)}>{showAll ? "收起":"显示全部"}</Button>
                        <hr className="flex-1 border-t border-dotted border-gray-200 dark:border-gray-700" />
                    </div>
                </>
            )
        }
    </>
}