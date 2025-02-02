import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { UAParser } from "ua-parser-js"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortId: string }> }
) {
  const headersList = await headers()
  const userAgent = headersList.get("user-agent") || ""
  const parser = new UAParser(userAgent)
  const aparams = await params

  const url = await prisma.url.findFirst({
    where: {
      OR: [
        { shortId: aparams.shortId },
        { customShortId: aparams.shortId },
      ],
    },
  })

  if (!url) {
    redirect("/404")
  }

  // Record the click
  await prisma.url.update({
    where: { id: url.id },
    data: {
      clicks: {
        increment: 1,
      }
    },
  })

  redirect(url.url)
}