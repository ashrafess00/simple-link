export default function UrlContainer({style, url, logo}) {
    return (
        <div className={`${style} w-full  mb-4 p-3 px-8 rounded-xl flex gap-4 items-center fill-white`}>
            <>{logo}</>
            <>{url}</>
        </div>
    )
}