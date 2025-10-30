'use client'

import Form from "@/components/form-kit/context"
import EmailField from "@/components/form-kit/fields/email-field"
import PasswordField from "@/components/form-kit/fields/password-field"

import { useRouter } from "next/navigation"
import { signIn, SignInResponse } from "next-auth/react"
import { FieldValue } from "@/components/form-kit/types"
import { useNotificationContext } from "@/components/notifications/context"

export default function LoginForm() {
    const router = useRouter()

    const { sendNotification } = useNotificationContext()

    const onSubmit = async (formData: Record<string, FieldValue>): Promise<void> => {
        const credentials: Record<string, string> = {
            email: formData.email! as string,
            password: formData.password! as string
        }

        const res: SignInResponse | undefined = await signIn(
            'credentials',
            {
                ...credentials,
                redirect: false
            }
        )

        if (res?.ok) { return router.push("/") }

        if (res?.error) { return sendNotification({ message: res.error, type: "Error" }) }

        return sendNotification({ message: "Erro ao logar. Tente novamente mais tarde!", type: "Error" })
    }

    return (
        <Form
            onSubmit={onSubmit}
            className="bg-white min-lg:min-w-96 flex flex-col shadow-xl rounded-xl p-10 py-12 gap-5"
        >
            <h1 className="text-3xl text-center font-semibold mb-5">Login</h1>

            <EmailField
                name="email"
                label="Email"
                placeholder="ex: exemplo@email.com"
                required
            />

            <PasswordField
                name="password"
                label="Senha"
                placeholder="********"
                required
            />

            <button
                className="bg-contrast-1 text-gray-300 cursor-pointer rounded-sm py-2"
            >
                Login
            </button>
        </Form>
    )
}