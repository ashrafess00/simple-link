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
