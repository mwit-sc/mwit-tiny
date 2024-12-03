import { Role } from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
        role: Role
        id: string
    } & DefaultSession["user"]
  }
}