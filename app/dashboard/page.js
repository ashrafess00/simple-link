"use client";

import { useEffect, useState } from "react";


import CustomizeUrls from './CustomizeUrls';
import Profile from "./Profile";
import Phone from "../ui/Phone";

export default function page() {

    const [userData, setUserData] = useState({});
    const [urls, setUrls] = useState([]);
    const [tab, setTab] = useState(false);

    useEffect(() => {
        fetch ("/api/users")
        .then(res => {
            if (!res.ok)
                throw new Error('there is an error');
            return res.json();
        })
        .then(data => {
        {
            setUrls(data.userUrls);
        }
        })
        .catch(error => {
            console.log('lerrorat')
        })
    }, [])

    

    

    return (
        <>
        <nav className="flex justify-between">
            <div>logo</div>
            <div className="flex">
                <div onClick={() => setTab(true)}>icon1</div>
                <div onClick={() => setTab(false)}>icon2</div>
            </div>
            
            <div>view</div>
        </nav>


        <main className="bg-grey-3 lg:flex">
            <div className="hidden lg:block">
                <Phone />
            </div>
            {tab ?
            <CustomizeUrls urls={urls} setUrls={setUrls}/>
            : <Profile />
            }
        </main>
        </>
    )
}