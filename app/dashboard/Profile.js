import Image from "next/image";

export default function Profile() {
    return (
        <>
            <h2>Profile Details</h2>
            <p>Add your details to create a personal touch to your profile.</p>

            <div className="bg-grey-3">
                <p>Profile picture</p>
                <div className="w-48 h-48 bg-violet-3 flex justify-center items-center flex-col">
                        <Image alt="upload-icon" src="/images/icons/icon-upload-image.svg" width={40} height={40} />
                        <p className="text-violet-1">+ Upload Image</p>
                </div>
                <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
            </div>

            <div>
                <label>First name*</label>
                <input type="text"/>
                <label>Last name*</label>
                <input type="text"/>
                <label>Email</label> 
                <input type="email"/>
            </div>

            <input type="file" id="profilePic" name="profilePic" accept="image/png, image/jped" />
            
        </>
    )
}