import Navigation from "@/components/home/Navigation";
import Main from "@/components/home/Main";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navigation />
      <Main />
    </main>
  )
}
