export const addUrls = async (urls) => {
    const res = await fetch("/api/urls", {
        method: 'POST',
        body: JSON.stringify(urls),
        headers: {'Content-Type': 'application/json'}
    })
    if (!res.ok)
        throw new Error("erooor");
}

export const saveUserProfile = async (userData) => {
    const [ firstName, lastName, email2 ] = userData;

    const res = await fetch('/api/uploadUserInfo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({firstName, lastName, email2})
    })
    if (!res.ok)
        throw new Error("error");
}

export const saveAvatar = async (uploadInput) => {
    if (uploadInput) {
        const input = uploadInput.current;
        const formData = new FormData();

        if (input.files) {
            const imgName = input.files[0].name;
            const img = input.files[0];
            formData.append(imgName, img);

            const res = await fetch("/api/uploadImg", {
                method: 'POST',
                body: formData
            })
            
            

            // if (!res.ok)
            //     throw new Error("images wasn't uploaded");
        }
    }
}