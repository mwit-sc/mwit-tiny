import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import NextAuth, { Session, User } from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    hd: "mwit.ac.th",
                },
            },
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        session: async ({ session, user }: { session: Session, user: User}) => {
            if (session?.user) {
                session.user.id = user.id
            }
            return session
        },
    },
    pages: {
        'signIn': '/auth/signin',
        'error': '/auth/error',
    }
})