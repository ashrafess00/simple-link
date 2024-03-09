
"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function page() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    
    function submitForm (e) {
        e.preventDefault();
        if (email === "")
            setEmailError(true);
        if (password === "")
            setPasswordError(true);

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
                    // value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                    />

                    <label>Password</label>
                    <input placeholder="Enter your password" type="password" className="border-2 border-black p-4"
                    // value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <input type="submit" value="Login" className="border-2 bg-violet-300 mt-5 cursor-pointer"/>
                </form>

                <p>Don't have an account?</p>
                <Link href="/register">Create account</Link>

            </main>
        </div>
    )
}

/* Add your details below to get back into the app */

