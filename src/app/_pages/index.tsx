import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (window.location.href !== 'https://mwit.ac.th/') {
      router.push('https://mwit.ac.th/')
    }
  }, [router])

  return (
    <main className="">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
        <h1 className="text-6xl font-bold text-center">
          Welcome to MWIT
        </h1>
      </div>
    </main>
  )
}