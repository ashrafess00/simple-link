"use client";

import { useEffect, useRef, useState } from "react";


import CustomizeUrls from './CustomizeUrls';
import Profile from "./Profile";
import Phone from "../ui/Phone";
import { addUrls, deleteUrls, editUrls } from "../lib/manageUrlsCalls";
// import { singToken } from "../lib/verifyToken";
import Cookies from 'js-cookie';


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

        //
        if (tab) {
            const addedUrls = urls.filter(e => e.status === "added");
            const editedUrls = urls.filter(e => (e.status === "edited" && e._id));
            const deletedUrls = urls.filter(e => (e.status === "deleted" && e._id));

            try {
                await addUrls(addedUrls);
                await editUrls(editedUrls);
                await deleteUrls(deletedUrls);
                

                // await singToken();
            }
            catch(error) {
                console.log(error);
            }


        }
        //we are on profile
        else {
            const input = uploadInput.current;
            const formData = new FormData();


            // console.log(input);
            if (input.files) {
                const imgName = input.files[0].name;
                const img = input.files[0];
                formData.append(imgName, img);

                try {
                    const res = await fetch("/api/uploadImg", {
                        method: 'POST',
                        body: formData
                    });
    
                    if (!res.ok)
                        throw new Error("images wasn't uploaded");
                }
                catch(error) {
                    console.log(error);
                }
            }
        }
    }


    

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


        <main className="bg-grey-3 lg:flex p-6">
            <div className="hidden lg:block">
                <Phone />
            </div>
            {tab ?
            <CustomizeUrls urls={urls} setUrls={setUrls}/>
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
        </main>

        <section className="bg-white p-4 border-t-grey-1 border-t-2">
            <button onClick={saveData} className="bg-violet-1 w-full rounded-md p-4 text-white">Save</button>
        </section>
        </>
    )
}