'use client'
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Ji() {

    function shareLink() {
        navigator.clipboard.writeText(window.location.href);
    }

    return (
            <ul className="flex justify-between p-4 md:mt-4 bg-white mt-8 rounded-lg">
                <Link href="/dashboard" className="btn-secondary block">
                    Back to Editor
                </Link>
                <button onClick={shareLink} href="/dashboard" className="btn-primary block">
                    Share Link
                </button>
            </ul>
    )
}