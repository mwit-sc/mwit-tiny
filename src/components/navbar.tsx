"use client"

import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
  user: User
}

export function Navbar({ user }: NavbarProps) {
  return (
    <nav className="border-b shadow-sm">
      <div className="container flex h-16 items-center px-4 mx-auto">
        <motion.a
          className="text-lg font-bold text-center"
          style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          animate={{
            backgroundImage: [
              'linear-gradient(45deg, #4169E1, #FF69B4)',
              'linear-gradient(45deg, #FF69B4, #4169E1)',
              'linear-gradient(45deg, #4169E1, #FF69B4)',
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          Tiny MWIT
        </motion.a>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image || undefined} alt={user.name || ""} />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}