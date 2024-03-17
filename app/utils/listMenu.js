
const w = 20;

const logos = [
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" viewBox="0 0 16 16"><g clipPath="url(#a)"><path fill="#ffffff" d="M9.982 2.288a8.756 8.756 0 0 0-3.963 0c-.754-.462-1.329-.674-1.747-.764a2.315 2.315 0 0 0-.544-.056 1.342 1.342 0 0 0-.247.03l-.01.002-.005.002h-.003l.146.513-.146-.512a.533.533 0 0 0-.342.294 3.328 3.328 0 0 0-.17 2.241 3.578 3.578 0 0 0-.817 2.287c0 1.657.488 2.77 1.321 3.486.584.501 1.292.768 2.002.92a2.496 2.496 0 0 0-.123 1.022v.638c-.434.09-.735.062-.95-.008-.267-.089-.473-.267-.67-.523a5.118 5.118 0 0 1-.289-.429l-.06-.099a9.772 9.772 0 0 0-.24-.378c-.202-.3-.503-.675-.99-.803l-.515-.135-.271 1.032.516.136c.085.021.196.101.379.369.07.106.137.213.202.322l.073.117c.1.162.215.342.349.517.27.352.637.707 1.184.887.373.124.797.154 1.282.079v1.992a.533.533 0 0 0 .533.533h4.267a.533.533 0 0 0 .533-.534v-3.8c0-.336-.015-.644-.11-.931.707-.15 1.41-.416 1.99-.918.833-.72 1.32-1.845 1.32-3.511v-.001a3.578 3.578 0 0 0-.82-2.267 3.328 3.328 0 0 0-.169-2.24.533.533 0 0 0-.34-.295l-.146.512c.146-.512.145-.512.144-.512l-.002-.001-.005-.002-.01-.003a1.344 1.344 0 0 0-.248-.03 2.318 2.318 0 0 0-.544.057c-.417.09-.992.302-1.745.764Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><g clipPath="url(#a)"><path fill="#737373" d="M9.982 2.288a8.756 8.756 0 0 0-3.963 0c-.754-.462-1.329-.674-1.747-.764a2.315 2.315 0 0 0-.544-.056 1.342 1.342 0 0 0-.247.03l-.01.002-.005.002h-.003l.146.513-.146-.512a.533.533 0 0 0-.342.294 3.328 3.328 0 0 0-.17 2.241 3.578 3.578 0 0 0-.817 2.287c0 1.657.488 2.77 1.321 3.486.584.501 1.292.768 2.002.92a2.496 2.496 0 0 0-.123 1.022v.638c-.434.09-.735.062-.95-.008-.267-.089-.473-.267-.67-.523a5.118 5.118 0 0 1-.289-.429l-.06-.099a9.772 9.772 0 0 0-.24-.378c-.202-.3-.503-.675-.99-.803l-.515-.135-.271 1.032.516.136c.085.021.196.101.379.369.07.106.137.213.202.322l.073.117c.1.162.215.342.349.517.27.352.637.707 1.184.887.373.124.797.154 1.282.079v1.992a.533.533 0 0 0 .533.533h4.267a.533.533 0 0 0 .533-.534v-3.8c0-.336-.015-.644-.11-.931.707-.15 1.41-.416 1.99-.918.833-.72 1.32-1.845 1.32-3.511v-.001a3.578 3.578 0 0 0-.82-2.267 3.328 3.328 0 0 0-.169-2.24.533.533 0 0 0-.34-.295l-.146.512c.146-.512.145-.512.144-.512l-.002-.001-.005-.002-.01-.003a1.344 1.344 0 0 0-.248-.03 2.318 2.318 0 0 0-.544.057c-.417.09-.992.302-1.745.764Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#ffffff" d="M12.667 2A1.333 1.333 0 0 1 14 3.333v9.334A1.334 1.334 0 0 1 12.667 14H3.333A1.334 1.334 0 0 1 2 12.667V3.333A1.333 1.333 0 0 1 3.333 2h9.334Zm-.334 10.333V8.8a2.173 2.173 0 0 0-2.173-2.173c-.567 0-1.227.346-1.547.866v-.74h-1.86v5.58h1.86V9.047a.93.93 0 1 1 1.86 0v3.286h1.86ZM4.587 5.707a1.12 1.12 0 0 0 1.12-1.12 1.124 1.124 0 1 0-1.12 1.12Zm.926 6.626v-5.58H3.667v5.58h1.846Z"/></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#ffffff" d="M8.162 2.667c.356.002 1.247.01 2.194.048l.336.015c.952.045 1.904.122 2.377.253.63.177 1.125.693 1.292 1.348.267 1.04.3 3.068.304 3.56V8.107c-.004.491-.037 2.52-.304 3.56a1.874 1.874 0 0 1-1.292 1.347c-.473.131-1.425.209-2.377.253l-.336.016c-.947.037-1.838.046-2.194.048h-.326c-.754-.004-3.904-.038-4.907-.317a1.875 1.875 0 0 1-1.292-1.348c-.267-1.04-.3-3.068-.304-3.56v-.216c.004-.492.037-2.52.304-3.56A1.872 1.872 0 0 1 2.93 2.984c1.002-.28 4.153-.313 4.906-.317h.326Zm-1.496 3v4.666l4-2.333-4-2.333Z"/></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><g clipPath="url(#a)"><path fill="#ffffff" d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>,
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path  d="M7.76 3.954h.954v2.853H7.76m2.62-2.854h.954v2.854h-.954M4.667 1.333l-2.38 2.38v8.574H5.14v2.38l2.387-2.38h1.9L13.714 8V1.333m-.954 6.194-1.9 1.9H8.954l-1.667 1.667V9.427H5.14v-7.14h7.62v5.24Z"/></svg>
]


export const listMenu = [
    {
        value: 'Github',
        label: <div className="flex"><img className="mr-5" src="images/icons/icon-github.svg" width={w} height={w} />Github</div>,
        style: 'bg-[#1A1A1A] text-white',
        logo: logos[0]
    },
    {
        value: 'Frontend-Mentor',
        label: <div className="flex"><img className="mr-5" src="images/icons/icon-frontend-mentor.svg" width={w} height={w} />Frontend Mentor</div>,
        style: 'bg-white text-dark border-2',
        logo: logos[1]

    },
    {
        value: 'X',
        label: <div className="flex"><img className="mr-5" src="images/icons/icon-twitter.svg" width={w} height={w} />X</div>,
        style: 'bg-[#1A1A1A] text-white',
        logo: logos[2]

        
    },
    {
        value: 'LinkedIn',
        label: <div className="flex"><img className="mr-5" src="images/icons/icon-linkedin.svg" width={w} height={w} />LinkedIn</div>,
        style: 'bg-[#2D68FF] text-white',
        logo: logos[3]

    },
    {
        value: 'Youtube',
        label: <div className="flex"><img className="mr-5" src="images/icons/icon-youtube.svg" width={w} height={w} />Youtube</div>,
        style: 'bg-[#EE3939] text-white',
        logo: logos[4]

    },
    {
        value: 'Facebook',
        style: 'bg-[#2442AC] text-white',           
        label: <div className="flex gap-2 items-center">{logos[5]} <span>Facebook</span></div>,
        logo: logos[5],
    },
    {
        value: 'Twitch',
        style: 'bg-[#EE3FC8] text-white fill-white',           
        label: <div className="flex gap-2 items-center">{logos[6]} Twitch</div>,
        logo: logos[6],
    },
]

export const getUrlCom = (urlName) => {
    const foundedUrl = listMenu.find(e => e.value == urlName);
    return foundedUrl;
}