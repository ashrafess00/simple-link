"use client";

import { useEffect, useRef, useState } from "react";


import CustomizeUrls from './CustomizeUrls';
import Profile from "./Profile";
import Phone from "../ui/Phone";
import { addUrls, deleteUrls, editUrls } from "../lib/manageUrlsCalls";
// import { singToken } from "../lib/verifyToken";
import Cookies from 'js-cookie';
import { listMenu } from "../utils/listMenu";
import Navbar from "../ui/Navbar";


export default function page() {

    const [userData, setUserData] = useState({});
    const [avatar, setAvatar] = useState();
    const [urls, setUrls] = useState([]);
    const [tab, setTab] = useState(true);

    const [img, setImg] = useState("");
    const [uploadInput, setUploadInput] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email2, setEmail2] = useState("");
    const [options, setOptions] = useState(listMenu);

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
            setAvatar(data.avatar);
        }
        })
        .catch(error => {
            console.log('lerrorat')
        })
    }, []);






    async function saveData(e) {
        if (tab) {
            try {
                await addUrls(urls);
            }
            catch(error) {
                console.log(error);
            }
        }
        //we are on profile
        else {
            // const input = uploadInput.current;
            // const formData = new FormData();

            // if (input.files) {
            //     const imgName = input.files[0].name;
            //     const img = input.files[0];
            //     formData.append(imgName, img);

            //     try {
            //         const res = await fetch("/api/uploadImg", {
            //             method: 'POST',
            //             body: formData
            //         });
    
            //         if (!res.ok)
            //             throw new Error("images wasn't uploaded");
            //     }
            //     catch(error) {
            //         console.log(error);
            //     }
            // }
            console.log(firstName, lastName, email2);
        }
    }


    

    return (
        <>

        <Navbar tab={tab} setTab={setTab} />


        <main className="max-h-[70rem] lg:flex justify-start gap-4 max-w-screen-2xl mx-auto relative">
            <Phone urls={urls} avatar={avatar}/>

            <div className="flex flex-col lg:w-2/3  bg-grey-3 text-grey-1 w-full">
            {tab ?
            <CustomizeUrls 
                urls={urls}
                setUrls={setUrls}
                options={options}
                setOptions={setOptions}
            />
            : <Profile
                avatar={avatar}
                img={img}
                setImg={setImg}
                uploadInput={uploadInput}
                setUploadInput={setUploadInput}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setEmail2={setEmail2}
                
                />
            }
        <section className="mt-auto md:text-end sticky bottom-0 inset-x-0  bg-white p-4 border-t-grey-1 border-t-2">
            <button onClick={saveData} className="w-full lg:w-fit btn-primary">Save</button>
        </section>
            </div>
        </main>

        </>
    )
}