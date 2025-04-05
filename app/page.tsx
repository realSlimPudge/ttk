import Header from "@/header"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto max-w-screen-lg px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Главная страница</h1>
        <p className="text-lg">Добро пожаловать на наш сайт!</p>
      </main>
    </div>
  )
}

