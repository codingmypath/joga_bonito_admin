'use client'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("All fields are necessary.")
            return;
        }

        try {
            const resUserExists = await fetch('api/userExists', {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email}),
            });
            const {user} = await resUserExists.json();

            if( user) {
                setError("User already exists");
                return;
            }

            const res = await fetch('api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            });
            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/")
            } else {
                console.log("User registration failed.")
            }
        } catch (error) {
            console.log("Error during registration: ", error)
        }
    }

    return (
        <div className="grid place-items-center h-screen">Register Form
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-highlight">
            <h1 className="text-xl font-bold my-4">Regiser</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input onChange={e => setName(e.target.value)} type="text" placeholder="Name" />
                <input onChange={e => setEmail(e.target.value)} type="text" placeholder="Email" />
                <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                <button className="bg-primary text-white font-bold cursor-pointer px-6">Register</button>
                { error && (

                    <div className="bg-red-500 text-white w-fit text-sm py-1 rounded-md mt-2">
                        {error}
                    </div>
                )}
                <Link className="text-sm mt-3 text-right" href={'/'}>
                    Already have an account? <span>Log in</span>
                </Link>
            </form>
        </div>
    </div>
    )
}