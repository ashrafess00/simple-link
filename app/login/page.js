
"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getJwt } from "../lib/getJwt";

export default function page() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const router = useRouter();


    const [loading, setLoading] = useState(false);

    async function submitForm (e) {
        e.preventDefault();
        if (email === "")
            return setEmailError("Can't be empty");
        if (password === "")
            return setPasswordError("Can't be empty");

        setLoading(true);
        fetch("/api/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        .then(res => {
            if (!res.ok)
                throw new Error("there is an error");
            
        })
        .then(() => {
            router.push('/dashboard');
        })
        .catch(error => {
            setLoading(false);
            setPasswordError("Please check again")
        })

    }

    return (
        <div className="p-8 h-dvh md:flex md:justify-center md:items-center md:flex-col">
            <header className="flex flex-row">
                <Image src="images/logo-devlinks-large.svg"
                    width={500}
                    height={500}
                    alt="logo"
                    className="w-1/2 md:w-3/4 md:mx-auto"
                    />
                <div></div>
            </header>
            <main className="md:p-20 md:rounded-lg mt-20 md:mt-8 max-w-screen-md mx-auto  md:bg-white h-fit">
                <h3 className="font-bold text-2xl mb-2">Login</h3>
                <p className="text-grey-1 mb-8">Add your details below to get back into the app</p>

                <form className="flex flex-col text-grey-1" onSubmit={submitForm}>
                    <label className='text-sm mb-2'>Email address</label>
                    <div className="w-full relative mb-8">
                        <input placeholder="e.g.alex@email.com"
                            type="text"
                            className={`input w-full  ${emailError && "input-error"}`}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setEmailError("");
                                setPasswordError("");
                            }}
                        />
                        {emailError
                        && <span className="text-sm font-thin text-red absolute right-4 inset-y-0 text-center flex items-center">{emailError}</span>}
                    </div>

                    <label className='text-sm mb-2'>Password</label>
                    <div className="w-full relative mb-8">
                        <input placeholder="Enter your password"
                            type="password"
                            className={`input w-full  ${passwordError && "input-error"}`}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError("");
                                setEmailError("");
                            }}
                        />
                        {passwordError
                        && <span className="text-sm font-thin text-red absolute right-4 inset-y-0 text-center flex items-center">{passwordError}</span>}
                    </div>

                    <input type="submit"
                        value={loading ? "Login ..." : "login"}
                        className={`my-6 ${loading ? "btn-primary btn-disabled" : "btn-primary"}`}/>
                </form>

                <div className="md:flex justify-center gap-1">
                    <p className="text-center text-grey-1">Don't have an account?</p>
                    <Link className="text-center  text-violet-1 hover:text-violet-2 transition duration-2 block" href="/register">Create account</Link>
                </div>

            </main>
        </div>
    )
}

/* Add your details below to get back into the app */

