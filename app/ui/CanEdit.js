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
            <ul className="flex flex-1 justify-around gap-4 md:mt-4 bg-white mt-8 rounded-lg text-center md:justify-between p-4">
                <Link href="/dashboard" className="btn-secondary block ml-4 flex-1 p-2 max-w-32">
                    Back to Editor
                </Link>
                <button onClick={shareLink} href="/dashboard" className="btn-primary  block mr-4 text-xs flex-1 p-2 max-w-32">
                    Share Link
                </button>
            </ul>
            {
                linkCopied &&
                <p className="absolute w-full md:w-fit rounded-full opacity-80 -translate-x-2/4 left-2/4 bottom-4 bg-dark text-white py-2 px-4">The link has been copied to your clipboard!</p>
            }
        </>
    )
}