"use client";

import { useEffect, useState } from "react";

import CustomizeUrls from './CustomizeUrls';
import Profile from "./Profile";
import Phone from "../ui/Phone";
import { addUrls, saveAvatar, saveUserProfile } from "../lib/manageUrlsCalls";
import { listMenu } from "../utils/listMenu";
import Navbar from "../ui/Navbar";
import { logOut, verifyAndGetUserData } from "../actions";


export default function Dashboard() {

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
    const [options, setOptions] = useState(listMenu);
    const [userId, setUserId] = useState("");
    const [saved, setSaved] = useState(false);
    const [savedError, setSavedError] = useState(false);
    const [linksError, setLinksError] = useState([false]);

    useEffect(() => {
        verifyAndGetUserData()
        .then(userData => {
            setUrls(userData.userUrls);
            setAvatar(userData.avatar);
            setFirstName(userData.firstName || "");
            setLastName(userData.lastName || "");
            setEmail2(userData.email2 || "");
            setUserId(userData.userId);
        })
        .catch((error) => {
            logOut();
        })
    }, []);



    function linksAreValid() {
        const res = linksError.filter(e => e == true);
        if (res.length == 0)
            return false;
        else
            return true;
    }



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


        <main className=" relative py-4 lg:min-h-[90vh]  overflow-auto lg:grid grid-cols-3 justify-start gap-4 max-w-screen-2xl mx-auto">
            <Phone 
                    urls={urls}
                    avatar={avatar}
                    firstName={firstName}
                    lastName={lastName}
                    email2={email2}
                    img={img}
                    setImg={setImg}
                    />

            <div className="w-full max-h-full overflow-auto flex flex-col col-span-2   bg-grey-3  text-grey-1  ">
            {tab ?
            <CustomizeUrls 
                urls={urls}
                setUrls={setUrls}
                options={options}
                setOptions={setOptions}
                linksError={linksError}
                setLinksError={setLinksError}
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
                firstNameError={firstNameError}
                lastNameError={lastNameError}
                setFirstNameError={setFirstNameError}
                setLastNameError={setLastNameError}
                />
            }
        <section className="lg:flex lg:flex-row-reverse justify-between items-center mt-auto lg:text-end bottom-0 inset-x-0  bg-white p-4 border-t-grey-1 border-t-2">
            <button onClick={saveData} className={`w-full lg:w-fit btn-primary ${linksAreValid() && "btn-disabled"}`}>Save</button>
            {
                saved 
                ? <p className="text-[green]">saved successfully !!!</p>
                : savedError
                ? <p className="text-red text-sm font-thin">couldn&apos;t save your data, please try again!!!</p>
                : <div></div>
            }
        </section>
            </div>
        </main>

        </div>
    )
}