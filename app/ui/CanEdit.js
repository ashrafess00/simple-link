'use client'
import Link from "next/link";
import { useState } from "react";

export default function CanEdit() {

    const [linkCopied, setLinkCopied] = useState(false);


    function shareLink() {
        navigator.clipboard.writeText(window.location.href);
        setLinkCopied(true);
        setTimeout(() => {
            setLinkCopied(false);
        }, 2000)
    }

    return (
        <>
            <ul className="flex justify-between p-4 md:mt-4 bg-white mt-8 rounded-lg">
                <Link href="/dashboard" className="btn-secondary block">
                    Back to Editor
                </Link>
                <button onClick={shareLink} href="/dashboard" className="btn-primary block">
                    Share Link
                </button>
            </ul>
            {
                linkCopied &&
                <p className="absolute rounded-full opacity-80 -translate-x-2/4 left-2/4 bottom-4 bg-dark text-white py-2 px-4">The link has been copied to your clipboard!</p>
            }
        </>
    )
}