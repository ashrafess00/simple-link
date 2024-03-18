"use client";

import { useEffect, useRef, useState } from "react";


import CustomizeUrls from './CustomizeUrls';
import Profile from "./Profile";
import Phone from "../ui/Phone";
import { addUrls, deleteUrls, editUrls, saveAvatar, saveUserProfile } from "../lib/manageUrlsCalls";
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

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [email2Error, setEmail2Error] = useState(false);

    const [options, setOptions] = useState(listMenu);
    const [userId, setUserId] = useState("");

    const [saved, setSaved] = useState(false);
    const [savedError, setSavedError] = useState(false);

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
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail2(data.email2);
            setUserId(data.userId);

        }
        })
        .catch(error => {

        })
    }, []);






    async function saveData(e) {
        if (tab) {
            try {
                await addUrls(urls);
                setSaved(true);
                setTimeout(() => {
                    setSaved(false);
                }, 2000);
            }
            catch(error) {
                setSavedError(true);
                setTimeout(() => {
                    setSavedError(false);
                }, 2000);
            }
        }
        //we are on profile
        else {
            if (firstName === "")
                return setFirstNameError(true);
            if (lastName === "")
                return setLastNameError(true);

            try {
                await saveUserProfile([firstName, lastName, email2]);
                await saveAvatar(uploadInput);
                setSaved(true);
                setTimeout(() => {
                    setSaved(false);
                }, 2000);
            }
            catch(error) {
                setSavedError(true);
                setTimeout(() => {
                    setSavedError(false);
                }, 2000);
            }
            
        }
    }


    

    return (
        <div className="p-4 ">

        <Navbar tab={tab} setTab={setTab} userId={userId} />


        <main className="relative py-4 lg:min-h-[90vh] lg:max-h-[90vh] overflow-auto lg:flex justify-start gap-4 max-w-screen-2xl mx-auto">
            <Phone 
                    urls={urls}
                    avatar={avatar}
                    firstName={firstName}
                    lastName={lastName}
                    email2={email2}
                    img={img}
                    setImg={setImg}
                    />

            <div className="max-h-full overflow-auto flex flex-col lg:w-2/3  bg-grey-3  text-grey-1 w-full">
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
                firstName={firstName}
                lastName={lastName}
                email2={email2}
                />
            }
        <section className="lg:flex lg:flex-row-reverse justify-between items-center mt-auto lg:text-end bottom-0 inset-x-0  bg-white p-4 border-t-grey-1 border-t-2">
            <button onClick={saveData} className="w-full lg:w-fit btn-primary">Save</button>
            {
                saved 
                ? <p className="text-[green]">saved successfully !!!</p>
                : savedError
                ? <p className="text-red text-sm font-thin">couldn't save your data, please try again!!!</p>
                : <div></div>
            }
        </section>
            </div>
        </main>

        </div>
    )
}