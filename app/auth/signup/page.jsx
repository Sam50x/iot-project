'use client'

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabase"

const SignupPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)

    const handleSubmit = async () => {
        if (!email || !password) {
            setError('Please fill all fields')
            return
        }
        if (password.length < 6) {
            setError('Password needs to be longer than 6 characters')
            return
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            return
        }

        router.push("/distance")
    }

    return (
        <div className="font-sans flex flex-col items-center justify-center w-full h-full">
            <h1 className="font-bold text-3xl text-gray-light mb-6">Create account!</h1>
            <div className="flex flex-col justify-center items-center gap-4">
                <input
                    type="email"
                    className="bg-gray-light text-black-main py-2 px-4 rounded-lg"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    className="bg-gray-light text-black-main py-2 px-4 rounded-lg"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                />
            </div>
            {error && <h1 className="mt-2 text-red">{error}</h1>}
            <button className="mt-4 px-4 py-2 font-bold rounded bg-green-500 text-black-main cursor-pointer" onClick={handleSubmit}>Sign Up</button>
            <h1 className="mt-2 text-gray-light">Already have an account <Link href={'/auth/signin'} className="font-bold">Sign in now</Link></h1>
        </div>
    )
}

export default SignupPage