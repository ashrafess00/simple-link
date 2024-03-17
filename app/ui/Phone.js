import Image from "next/image";
import { getUrlCom } from "../utils/listMenu";



export default function Phone({urls, avatar}) {

    console.log(avatar);

    return (

        <div className="lg:flex justify-center items-center hidden bg-white  w-1/3  p-16">
            <svg overflow="auto" xmlns="http://www.w3.org/2000/svg" width="308" height="632" fill="none" viewBox="0 0 308 632">
            <path stroke="#737373" d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"/>
            <path fill="#fff" stroke="#737373" d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"/>
            
            <foreignObject x="94" y="70" width={120} height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml" className=" w-[120px] h-[120px]" >
                    {
                        avatar
                        ? <Image width={400} height={400} className="rounded-full w-full h-full border-violet-1 border-4" src={"/api/" + avatar} />
                        : <circle cx="153.5" cy="112" r="48" fill="#EEE"/>
                    }
                </div>
            </foreignObject>

            <rect width="160" height="16" x="73.5" y="210" fill="#EEE" rx="8"/>
            <rect  width="72" height="8" x="117.5" y="240" fill="#EEE" rx="4"/>


            

            <foreignObject x="35" y="278" width="240" height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml" className="overflow-auto border-2h-[50%]">
                {
                    urls.map((url, index) => {
                        if (index < 4) {
                            const {style, logo} = getUrlCom(url.name);
                            // console.log("u: ", style);
                            return (
                                <RecSvg style={style} logo={logo} key={index} url={url} />
                            )
                        }
                    })
                }
                </div>
            </foreignObject>
            </svg>
        </div>
    )
}


function RecSvg({style, url, logo}) {
    return (
        <div className={`${style}  mb-4 p-3 px-8 rounded-xl flex gap-4 items-center`}>
            {logo}
            {url.name}
        </div>
    )
}