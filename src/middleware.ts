import { getToken } from "next-auth/jwt"
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"

const onlyWithAuth: string[] = ["/", "/rotas", "/passageiros"]
const onlyWithoutAuth: string[] = ["/auth"]

const SECRET = process.env.NEXTAUTH_SECRET

async function isAuthenticated(req: NextRequest): Promise<boolean> {
    const token = await getToken({ req, secret: SECRET })

    if (token) return true

    return false
}

export default async function middleware(req: NextRequest) {
    const baseURL: string = `/${req.nextUrl.pathname.split("/")[1]}`
    const authenticated: boolean = await isAuthenticated(req)    

    if (onlyWithoutAuth.includes(baseURL) && authenticated) {
        const url: URL = new URL('/', req.url)
        return NextResponse.redirect(url)
    } else if (onlyWithAuth.includes(baseURL) && !authenticated) {
        const url: URL = new URL('/auth/login', req.url)
        return NextResponse.redirect(url)
    }
}

export const config: MiddlewareConfig = { matcher: ["/", "/rotas/:path*", "/passageiros/:path*", "/auth/:path*"] }