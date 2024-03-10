

async function no() {
    const res = await fetch("http://localhost:3000/api/users");

    if (!res.ok)
        throw new Error("hi error");
    return res.json();
}

export default async function page() {

    const r = await no();
    console.log(r);

    return (
        <>
         <h1>k</h1>
        </>
    )
}