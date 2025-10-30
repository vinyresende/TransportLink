import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        id: number
        username: string
        email: string
    }

    interface Session {
        user: User
    }

    interface Profile {
        id: number
        username: string
        email: string
    }
}
