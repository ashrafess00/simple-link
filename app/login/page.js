
"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getJwt } from "../lib/getJwt";

export default function page() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const router = useRouter();
    async function submitForm (e) {
        e.preventDefault();
        if (email === "") {
            setEmailError(true);
            return;
        }
        if (password === "") {
            setPasswordError(true);
            return;
        }

        fetch("/api/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        .then(res => {
            if (!res.ok)
                throw new Error("there is an error");
            router.push('/testpage');
        })
        .catch(error => {
            console.log(error);
        })

    }

    return (
        <div className="p-8">
            <header className="flex flex-row ">
                <Image src="images/logo-devlinks-large.svg"
                    width={500}
                    height={500}
                    alt="logo"
                    className="w-1/2"
                    />
                <div></div>
            </header>
            <main className="mt-20">
                <h3 className="font-bold text-lg">Login</h3>
                <p>Add your details below to get back into the app</p>

                <form className="flex flex-col" onSubmit={submitForm}>
                    <label>Email address</label>
                    <input placeholder="e.g.alex@email.com" type="text" className="border-2 border-black p-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                    />

                    <label>Password</label>
                    <input placeholder="Enter your password" type="password" className="border-2 border-black p-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <input type="submit" value="Login" className="border-2 bg-violet-300 mt-5 cursor-pointer"/>
                </form>

                <p className="btn_default p-1 border-2">Don't have an account?</p>
                <Link href="/register">Create account</Link>

            </main>
        </div>
    )
}

/* Add your details below to get back into the app */

