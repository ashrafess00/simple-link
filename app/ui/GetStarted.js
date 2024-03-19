import Image from "next/image";

export default function GetStarted() {
    return (
        <div className="bg-grey-3 text-center flex flex-col items-center py-10 px-2">
            <Image alt="get_started" className="w-32" src="/images/illustration-empty.svg" width={40} height={40}/>
            <h2 className="my-5 text-2xl font-bold text-dark">Let&apos;s get you started</h2>
            <p className="font-thin">Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
        </div>
    )
}