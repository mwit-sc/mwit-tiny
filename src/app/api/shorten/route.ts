import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { nanoid } from "nanoid"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { url, customShortId } = await req.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { urls: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (user.role === "DEFAULT" && user.urls.length >= 25) {
      return NextResponse.json({ error: "You have reached the maximum number of shortened URLs" }, { status: 403 })
    }

    if (customShortId) {
      const existingUrl = await prisma.url.findUnique({
        where: { customShortId },
      })

      if (existingUrl) {
        return NextResponse.json({ error: "Custom short link already exists" }, { status: 400 })
      }
    }
    // const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 6);
    const shortId = customShortId || nanoid(6)
    const shortenedUrl = await prisma.url.create({
      data: {
        url,
        shortId: customShortId ? null : shortId,
        customShortId: customShortId || null,
        userId: session.user.id,
      },
    })

    return NextResponse.json(shortenedUrl)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id') || ""

    if (!id) {
      return NextResponse.json({ error: "URL ID is required" }, { status: 400 })
    }

    await prisma.url.delete({
      where: { id },
    })

    return NextResponse.json({ message: "URL deleted successfully" }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}