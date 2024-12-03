import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { UrlShortener } from "@/components/url-shortener"
import { UrlCard } from "@/components/url-card"

export default async function Home() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/api/auth/signin")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      urls: {
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { clicks: true } } }
      }
    }
  })

  if (!user) {
    redirect("/api/auth/signin")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">URL Shortener</h1>
        <UrlShortener />
        <h2 className="text-2xl font-semibold mt-12 mb-6">Your Short Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.urls.map((url) => (
            <UrlCard key={url.id} url={url} />
          ))}
        </div>
      </main>
    </div>
  )
}
