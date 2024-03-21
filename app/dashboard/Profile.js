import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { isImageBig } from "../lib/handleImageUpload";

export default function Profile({avatar,
    img,
    setImg,
    setUploadInput,
    firstName,
    lastName,
    email2,
    setFirstName,
    setLastName,
    setEmail2,
    firstNameError,
    lastNameError,
    setFirstNameError,
    setLastNameError,

}) {

    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        if (avatar) {
            fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/avatar/" + avatar)
            .then(res => {
                if (!res.ok)
                    throw new Error("couldn't load image")
                
            })
            .then(data => {
                setImg(process.env.NEXT_PUBLIC_BASE_URL + "/api/avatar/" + avatar);
            })
            .catch(error => {
                setImg("https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png");
            })
        }
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
                setImg(e.target.result);
            })
            .catch(error => {
                setImgError(true);
                setTimeout(() => {
                    setImgError(false);
                }, 2000)
            })
        }
    }

 

    return (
        <div className="bg-white p-6 p-t-8 w-full h-full">
            <div className="mb-6">
                <h2 className="font-bold text-2xl text-dark mb-2">Profile Details</h2>
                <p className="text-grey-1">Add your details to create a personal touch to your profile.</p>
            </div>

            <div className="p-8 gap-2 bg-grey-3 rounded-md mb-5 md:flex items-center  border-violet-3">

                <div className=" md:flex w-full items-center">
                    <label className="block text-md mb-3 text-grey-1 font-thin  md:w-[40%]">Profile picture</label>
                
                    <div className=" w-48 h-48 flex-grow-0 flex-shrink-0  group/item relative rounded-2xl bg-violet-3 flex justify-center items-center flex-col ">

                    <input onChange={onChange} className="w-full h-full absolute inset-x-0 opacity-0 z-30 cursor-pointer bg-grey-2" ref={ref} type="file" id="profilePic" name="profilePic" accept="image/png, image/jpeg" />
                    
                    {img && 
                    <div className="rounded-2xl invisible group-hover/item:visible flex flex-col justify-center items-center bg-dark opacity-80 w-full h-full absolute inset-0">
                        <Image alt="upload icon" className="rounded-2xl w-100 h-100"  src="/images/icons/icon-upload-image.svg" width={50} height={50} />
                        <p className="text-violet-1">Change Image</p>
                    </div>
                    }
                    {!img ?
                    <>
                        <Image alt="upload icon" className="rounded-2xl w-100 h-100"  src="/images/icons/icon-upload-image.svg" width={50} height={50} />
                        <p className="text-violet-1">+ Upload Image</p>
                    </> :
                        <img alt="avatar" className="rounded-2xl w-full h-full" src={img} />
                    }
                    </div>
                
                {
                    imgError 
                    ? <p className="text-red text-xs font-thin mt-8 md:ml-6">Image couldn&apos;t be uploaded! use a smalled image</p>
                    : <p className="text-grey-1 text-xs font-thin mt-8 md:ml-6">Image must be below 1024x1024px. Use PNG or JPG format.</p>
                }
                
                </div>
            </div>
            <form>

                <div className="bg-grey-3  rounded-md p-8  ">
                    <div className="md:flex items-center gap-2">
                        <label className="block text-xs md:text-lg font-thin mb-1 md:w-[40%]">First name*</label>
                        <input type="text"
                                className={`input p-2 rounded-lg mb-3 w-full md:w-[60%] ml-auto ${firstNameError && "input-error"}`}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                    setFirstNameError(false)
                                }}
                                value={firstName}
                                />
                    </div>

                    <div className="md:flex items-center gap-2 ">
                        <label className="block text-xs md:text-lg font-thin mb-1 md:w-[40%]"  >Last name*</label>
                        <input type="text"
                                className={`input p-2 rounded-lg mb-3 w-full md:w-[60%] ml-auto ${lastNameError && "input-error"}`}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                    setLastNameError(false)
                                }}
                                value={lastName}
                        />
                    </div>

                    <div className="md:flex md:items-center gap-2">
                        <label className="block text-xs md:text-lg font-thin mb-1 md:w-[40%]">Email</label>
                        <input type="text" className="input p-2 rounded-lg w-full md:w-[60%]" 
                                onChange={(e) => setEmail2(e.target.value)}
                                value={email2}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}