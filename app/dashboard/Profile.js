import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { isImageBig } from "../lib/handleImageUpload";
export default function Profile({avatar, img, setImg, input, setUploadInput, setFirstName, setLastName, setEmail2}) {

    useEffect(() => {
        if (avatar) {
            setImg("/api/" + avatar);
        }
        console.log("avatar: ", avatar);
    }, [avatar])


    const ref = useRef(null);

    function onChange(e) {
        setUploadInput(ref);

        const input = ref.current;
        const file = input.files[0];


        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async (e) => {

            isImageBig(e.target.result)
            .then(res => {
                // console.log(res);
                setImg(e.target.result);
            })
            .catch(error => {
                console.log("hi error: ", error);
            })
            
        }

        


    }

    return (
        <div className="bg-white p-6 p-t-8">
            <div className="mb-6">
                <h2 className="font-bold text-2xl text-dark mb-2">Profile Details</h2>
                <p className="text-grey-1">Add your details to create a personal touch to your profile.</p>
            </div>

            <form>
                <div className="bg-grey-3 p-4 rounded-md mb-5">
                    <label className="block text-md mb-3 text-grey-1 font-thin">Profile picture</label>
                    <div className="relative rounded-2xl group-hover/item:visible w-48 h-48 bg-violet-3 flex justify-center items-center flex-col ">
                        <input onChange={onChange} className="w-full h-full absolute inset-x-0 opacity-0 z-30 cursor-pointer bg-grey-2" ref={ref} type="file" id="profilePic" name="profilePic" accept="image/png, image/jpeg" />
                        {!img ?
                        <>
                            <Image alt="upload icon" className="rounded-2xl w-100 h-100"  src="/images/icons/icon-upload-image.svg" width={40} height={40} />
                            <p className="text-violet-1">+ Upload Image</p>
                        </> :
                        <Image alt="avatar" className="rounded-2xl w-full h-full" src={img} width={40} height={40}  />
                        }
                        {img && 
                        <div className="rounded-2xl group-item invisible flex flex-col justify-center items-center bg-dark w-full h-full absolute inset-0">
                            <Image alt="upload icon" className="rounded-2xl w-100 h-100"  src="/images/icons/icon-upload-image.svg" width={40} height={40} />
                            <p className="text-violet-1">Change Image</p>
                        </div>
                        }
                    </div>
                    <p className="text-grey-1 text-xs font-thin mt-8">Image must be below 1024x1024px. Use PNG or JPG format.</p>
                </div>

                <div className="bg-grey-3 p-4 rounded-md">
                    <label className="block text-xs font-thin mb-1">First name*</label>
                    <input type="text"
                            className="input p-2 rounded-lg mb-3"
                            onChange={(e) => setFirstName(e.target.value)} />

                    <label className="block text-xs font-thin mb-1"  >Last name*</label>
                    <input type="text" className="input p-2 rounded-lg mb-3"
                            onChange={(e) => setLastName(e.target.value)}
                    />

                    <label className="block text-xs font-thin mb-1">Email</label>
                    <input type="text" className="input p-2 rounded-lg" 
                    onChange={(e) => setEmail2(e.target.value)}
                    />
                </div>
            </form>


            {/* <img src={img}/> */}
        </div>
    )
}