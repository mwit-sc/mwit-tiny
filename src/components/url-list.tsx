"use client"

import { motion } from "framer-motion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface UrlListProps {
  urls: {
    id: string
    url: string
    shortId: string | null
    customShortId: string | null
    createdAt: Date
    _count: {
      clicks: number
    }
  }[]
}

export function UrlList({ urls }: UrlListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Original URL</TableHead>
            <TableHead>Short URL</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {urls.map((url) => (
            <TableRow key={url.id}>
              <TableCell className="font-medium">{url.url}</TableCell>
              <TableCell>
                <a
                  href={`https://tiny.mwit.link/${url.customShortId || url.shortId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  tiny.mwit.link/{url.customShortId || url.shortId}
                </a>
              </TableCell>
              <TableCell>{url._count.clicks}</TableCell>
              <TableCell>
                {new Date(url.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  )
}