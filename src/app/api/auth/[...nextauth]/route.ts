import bcrypt from "bcrypt"
import fac from "@/database/factory"
import NextAuth, { AuthOptions, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import DatabaseUser from "@/database/models/User"

import { Response } from "@/types/server"

const authOptions: AuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                if (credentials?.email && credentials?.password) {
                    const res: Response<{ user: DatabaseUser | null }> = await fac.getUserByEmail(credentials!.email)

                    if (res.data?.user) {
                        const isValid: boolean = bcrypt.compareSync(credentials.password, res.data.user.password)

                        if (isValid) return { ...res.data.user, password: undefined }
                    } else if (res.error) {
                        throw new Error("Erro ao realizar login. Tente novamente mais tarde!")
                    }
                }

                throw new Error("Usuário ou senha incorretos!")
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.user = user
            }

            return token
        },
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user as User
            }

            return session
        }
    },
    pages: {
        signIn: "/auth/login"
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
