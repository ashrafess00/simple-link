'use client'

import { resendVerificationLink } from "@/app/lib/sendVerificationLink"
import Link from "next/link";
import { useState } from "react";

export default function Page({params}) {

    const [sent, setSent] = useState(false);
    
    async function resend() {
        await resendVerificationLink(params.userId);

        setSent(true);
        setTimeout(() => {
            setSent(false);
        }, 2000)
    }

    return (
        <>
            <div className="text-center text-2xl h-full  grid place-items-center">
                <div>
                    <h1 className="text-2xl font-bold mb-5">Verification was sent to your email</h1>
                    <p>you didn&apos;t receive the Verification link? <button onClick={resend} className="cusor-pointer text-violet-1">send again</button> </p>
                    <p className={`invisible ${sent && '!visible'} mt-5 text-lg font-thin text-white bg-dark bg-opacity-60 w-fit mx-auto p-2 px-6 rounded-full`}>Email verification was resent</p>
                    <Link href="/login" className="btn-secondary">Login</Link>
                </div>
            </div>
        </>
    )
}
