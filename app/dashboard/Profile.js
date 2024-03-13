import Image from "next/image";
import { useRef, useState } from "react";

export default function Profile() {

    // const [img, setImage] = useState();
    const ref = useRef(null);
    async function uploadImage(e) {
        e.preventDefault();

        const input = ref.current;
        const formData = new FormData();
        
        if (input.files) {
            const imgName = input.files[0].name;
            const img = input.files[0];
            formData.append(imgName, img);

            const res = await fetch("/api/uploadImg", {
                method: 'POST',
                body: formData
            });
        }
    }

    return (
        <>
            <h2>Profile Details</h2>
            <p>Add your details to create a personal touch to your profile.</p>

            <form onSubmit={uploadImage}>
                <label>Profile picture</label>
                <div className="bg-grey-3">
                    <div className="w-48 h-48 bg-violet-3 flex justify-center items-center flex-col">
                            <Image alt="upload-icon" src="/images/icons/icon-upload-image.svg" width={40} height={40} />
                            <p className="text-violet-1">+ Upload Image</p>
                    </div>
                    <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
                </div>
                <input ref={ref} type="file" id="profilePic" name="profilePic" accept="image/png, image/jpeg" />
                <input type="submit" value="save" />
            </form>


            <div>
                <label>First name*</label>
                <input type="text"/>
                <label>Last name*</label>
                <input type="text"/>
                <label>Email</label> 
                <input type="email"/>
            </div>

            {/* <img src={img}/> */}
        </>
    )
}