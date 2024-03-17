export const isImageBig = (target) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = target;
        img.onload = (e) => {
            const w = img.width;
            const h = img.height;
            if (w > 1024 || h > 1024)
                reject(new Error("Image is too Big"));
            else
                resolve({w, h});
        }

        img.onerror = () => {
            reject (new Error("failed to load image"));
        }
    })

    
}

// export const isImageBig = async (target) => {
//     const img = new Image();

//     console.log(target);
//     img.src = target;

//     img.onload = (e) => {
//         const width = img.width;
//         const height = img.height;
//         console.log(width, height);
//         if (width > 1024 || height > 1024)
//             throw new Error("image is big");
//     }
//     console.log(j);
    
// }