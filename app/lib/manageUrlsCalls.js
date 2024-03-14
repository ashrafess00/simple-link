export const addUrls = async (addedUrls) => {
    if (addedUrls.length > 0) {
        const res = await fetch("/api/urls", {
            method: 'POST',
            body: JSON.stringify(addedUrls),
            headers: {'Content-Type': 'application/json'}
        })
        
        if (!res.ok)
            throw new Error("erooor");
    }
}


export  const editUrls = (editedUrls) => {
    console.log(editedUrls);
    return fetch("/api/urls", {
        method: 'PUT',
        body: JSON.stringify(editedUrls),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        if (!res.ok)
            throw new Error("couldn't edit urls to the database");
    })
}

export  const deleteUrls = (deletedUrls) => {
    console.log(deletedUrls);
    return fetch("/api/urls", {
        method: 'DELETE',
        body: JSON.stringify(deletedUrls),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        if (!res.ok)
            throw new Error("couldn't delete urls to the database");
    })
}