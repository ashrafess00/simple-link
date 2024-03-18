import Select from 'react-select';
import { listMenu } from "@/app/utils/listMenu";
import { useEffect, useState } from 'react';
import { list } from 'postcss';
import GetStarted from '../ui/GetStarted';

export default function CustomizeUrls({urls, setUrls, options, setOptions}) {
    // const [opts, setOpts] = useState(listMenu);
    
    useEffect(() => {
        if (urls.length > 0) {
            const nameInArr2 = new Set(urls.map(obj => {
                if (obj.status !== 'deleted')
                    return obj.name;
                return "";
            }));
            
            const filteredArray = listMenu.filter(obj => !nameInArr2.has(obj.value));
            setOptions(filteredArray);
        }
    }, [urls]);
    
    function addNewLink() {
        if (options.length > 0) {
            setUrls(purl => {
                    const updatedPurl = [...purl];
                    updatedPurl.push({name: options[0].value, url:"",})
                    return updatedPurl;
            });
        }
    }

    const changeUrlVal = (index) => (e) => {
        const {value, target} = e;
        setUrls(pUrls => {
            const updatedUrls = [...pUrls];

            //if select changed
            if (value)
                updatedUrls[index] = {...updatedUrls[index], name: value};
            else 
                updatedUrls[index] = {...updatedUrls[index], url: target.value};

            return updatedUrls;
        })
    }


    const deleteUrl = (index) => (e) => {


        setUrls(purl => {
            let updatedUrls = [...purl];
            updatedUrls.splice(index, 1);
            return updatedUrls;
        })
    }


    
    

       
    return (
        <div className='z-50 h-full overflow-auto bg-white rounded-md p-6 p-t-8 max-w-screen-2xl'>
            <h2 className='mt-10 text-2xl font-bold mb-2 text-dark'>Customize your links</h2>
            <p className='text-grey-1 mb-10'>Add/edit/remove links below and then share all your profiles with the world!</p>

            <button
                className="btn-secondary w-full mb-4"
                onClick={addNewLink}
            >
                +Add new link
            </button>

            {
                (urls.length == 0)
                ? <GetStarted />
                : 
                urls.map((url, key) => {
                    return (
                        <div className="p-6 mb-6 border-dark cursor-pointer bg-grey-3"
                            key={key}>

                            <div className='flex justify-between mb-4'>
                                <p className='font-bold'>Link #{key + 1}</p>
                                <div onClick={deleteUrl(key)} className='hover:text-violet-1'>Remove</div>
                            </div>
                            <label className='block mb-2'>Platform</label>
                            <Select
                                value={{label: url.name, value: url.name}}
                                options={options}
                                isSearchable={false}
                                onChange={changeUrlVal(key)}
                                name="listMenu"
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        cursor: 'pointer',
                                        marginBottom: '1rem'
                                    }),
                                }}
                            />
                            <label className='block mb-2'>Link</label>
                            <div className='relative'>
                                <input
                                type="text"
                                placeholder="e.g. https://www.github.com/johnappleseed"
                                className="input w-full"
                                value={url.url}
                                onChange={changeUrlVal(key)}/>
                                {/* <img className='absolute inset-y-0 left-0' src='/images/icons/icon-links-header.svg' /> */}
                            </div>                        
                        </div>
                    )
                 })
            }
        </div>
    )
}