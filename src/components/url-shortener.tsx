"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function UrlShortener() {
  const [url, setUrl] = useState("")
  const [customShortId, setCustomShortId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const shortenUrl = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, customShortId }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "URL Shortened!",
          description: `Your shortened URL: tiny.mwit.link/${data.customShortId || data.shortId}`,
        })
        setUrl("")
        setCustomShortId("")
        router.refresh()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to shorten URL",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-lg"
    >
      <motion.h2
        className="text-2xl font-bold mb-4 text-center text-black"
      >
        Shorten Your URL
      </motion.h2>
      <form onSubmit={shortenUrl} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Input
            type="url"
            placeholder="Enter your URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#4169E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent transition-all duration-300"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Input
            type="text"
            placeholder="Custom short link (optional)"
            value={customShortId}
            onChange={(e) => setCustomShortId(e.target.value)}
            className="w-full px-4 py-2 border border-[#4169E1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:border-transparent transition-all duration-300"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            type="submit"
            className="w-full bg-[#4169E1] text-white rounded-full text-md font-bold shadow-lg hover:bg-[#4169E1]/90 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Shortening..." : "Shorten URL"}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}