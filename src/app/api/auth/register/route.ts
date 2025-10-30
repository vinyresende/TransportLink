import bcrypt from "bcrypt"
import fac from "@/database/factory"

const KEY = process.env.ADMIN_KEY

async function handler(req: Request): Promise<Response> {
    try {
        if (req.headers.get("x-api-key") != KEY) return Response.json({
            ok: false,
            message: "Acesso não autorizado!"
        }, { status: 403 })

        const data = await req.json()

        if (data.username && data.email && data.password) {
            const exists: boolean = Boolean(await fac.getUserByEmail(data.email as string))

            if (exists) return Response.json({
                ok: false,
                message: "Já existe um usuário com este email!"
            }, { status: 409 })

            const hash: string = bcrypt.hashSync(data.password, 12)

            const payload: Record<string, string> = {
                username: data.username as string,
                email: data.email as string,
                password: hash as string
            }

            const res = await fac.createUser(payload)

            if (res.ok) {
                return Response.json({ ok: true }, { status: 201 })
            }
        }

        return Response.json({ ok: false, error: "Dados de cadastro faltando!" }, { status: 400 })
    } catch (error) {
        return Response.json({ ok: false, error: "Erro interno!" }, { status: 500 })
    }
}

export { handler as POST }
