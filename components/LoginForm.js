'use client'
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email, password, redirect: false,
            });
            if (res.error) {
                setError("Invalid Credentials");
                return;
            }
            router.replace("/")
        } catch(error) {
            console.log(error);
        }
    };
    return (
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-highlight">
                <h1 className="text-xl font-bold my-4">Log in</h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <p className="text-gray-500 text-sm">Demo Email: admin@jogabonito.com</p>
                    <p className="text-gray-500 text-sm">Demo Password: demo123</p>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    <button className="bg-primary text-white font-bold cursor-pointer px-6">Login</button>
                    {error && (
                        <div className="bg-red-500 text-white w-fit text-sm py-1 rounded-md mt-2">{error}</div>
                    )}
                    <button onClick={() => signIn('google')} className="bg-white p-2 rounded-lg m-6 border">Login with Google</button>
                    {/* <Link className="text-sm mt-3 text-right" href={'/register'}>
                        Don&apos;t have an account? <span>Register</span>
                    </Link> */}
                </form>
            </div>
    )
}