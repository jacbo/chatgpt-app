import Example from "./Example";
import ModelSelect from "./ModelSelect";

export default function Welcome() {
    return <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <ModelSelect />
        <h1 className="mt-20 text-4xl font-bold">
            ChatGPT免费使用1天 - GPT9 & GPT9.5 Turbo
        </h1>
        
        <Example />
    </div>
}