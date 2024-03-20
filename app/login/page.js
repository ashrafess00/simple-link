
"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {


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
        try {
            const res = await fetch("/api/login", {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({email, password})
                                    });
            const { message } = await res.json();
            if (!res.ok)
                throw new Error(message);
            router.push('/dashboard');
        }
        catch(error) {

            setLoading(false);
            setPasswordError(error.message);
        }


    }

    return (
        <div className="md:grid grid-cols-1 place-items-center h-full pt-10 md:pt-0">
            <main className="md:p-10 rounded-lg max-w-screen-md w-full mx-auto">
                <header className="mx-auto max-w-xs w-3/4 mb-10">
                    <Image src="images/logo-devlinks-large.svg"
                        width={500}
                        height={500}
                        alt="logo"
                        className="w-full"
                        />
                </header>
                <div className="p-10 md:bg-white w-full">
                    <h3 className="font-bold text-2xl mb-2">Login</h3>
                    <p className="text-grey-1 mb-8">Add your details below to get back into the app</p>
                    <form className="flex flex-col text-grey-1" onSubmit={submitForm}>
                        <label className='text-sm mb-2'>Email address</label>
                        <div className="w-full relative mb-8">
                            <div className="">
                                <input placeholder="e.g.alex@email.com"
                                type="text"
                                className={`input-email input w-full  ${emailError && "input-error"}`}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setEmailError("");
                                    setPasswordError("");
                                }}
                            />
                            </div>
                            {emailError
                            && <span className="text-sm font-thin text-red absolute right-4 inset-y-0 text-center flex items-center">{emailError}</span>}
                        </div>

                        <label className='text-sm mb-2'>Password</label>
                        <div className="w-full relative mb-8">
                            <input placeholder="Enter your password"
                                type="password"
                                className={`input-password input w-full  ${passwordError && "input-error"}`}
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
                        <p className="text-center text-grey-1">Don&apos;t have an account?</p>
                        <Link className="text-center  text-violet-1 hover:text-violet-2 transition duration-2 block" href="/register">Create account</Link>
                    </div>

                </div>




            </main>
        </div>
    )
}

/* Add your details below to get back into the app */

