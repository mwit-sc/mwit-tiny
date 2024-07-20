import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('https://openhouse.mwit.ac.th/')
  }, [])
  return (
    <main className="">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
        <h1 className="text-6xl font-bold text-center">
          Redirecting...
        </h1>
      </div>
    </main>
  );
}
