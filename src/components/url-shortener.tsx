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
      className="w-full max-w-md space-y-4"
    >
      <form onSubmit={shortenUrl} className="space-y-4">
        <Input
          type="url"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Custom short link (optional)"
          value={customShortId}
          onChange={(e) => setCustomShortId(e.target.value)}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Shortening..." : "Shorten URL"}
        </Button>
      </form>
    </motion.div>
  )
}

