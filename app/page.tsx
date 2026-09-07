"use client"
import Navigation from "@/components/home/Navigation";
import Main from "@/components/home/Main";
import { useAppContext } from "@/components/AppContext";

export default function Home() {

  const {state:{themeMode}} = useAppContext()

  return (
    <main className={"flex h-full "+themeMode}>
     <Navigation />
     <Main />
    </main>
  )
}
