import Select from 'react-select';
import { listMenu } from "@/app/utils/listMenu";
import { useEffect, useState } from 'react';
import { list } from 'postcss';

export default function CustomizeUrls({urls, setUrls, options, setOptions}) {

    function addNewLink() {
        //add the object to the urls
        if (options.length > 0) {
            setUrls(purl => {
                    const updatedPurl = [...purl];
                    updatedPurl.push({name: options[0].value, url:"", status: "added"})
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
                updatedUrls[index] = {...updatedUrls[index], name: value, status: updatedUrls[index].status == "added" ? "added" : "edited"};
            else 
                updatedUrls[index] = {...updatedUrls[index], url: target.value , status: updatedUrls[index].status == "added" ? "added" : "edited"};

            return updatedUrls;
        })
    }


    const deleteUrl = (index) => (e) => {

        setUrls(purl => {
            const updatedUrls = [...purl];
            updatedUrls[index] = {...updatedUrls[index], status: "deleted"};
            return updatedUrls;
        })
    }

    const [opts, setOpts] = useState(listMenu);

    useEffect(() => {
        // console.log(options);
        // console.log(urls);

    if (urls.length > 0) {
        const nameInArr2 = new Set(urls.map(obj => {
            if (obj.status !== 'deleted')
                return obj.name;
            return "";
        }));

        console.log(nameInArr2);
        
        const filteredArray = listMenu.filter(obj => !nameInArr2.has(obj.value));
        console.log(filteredArray);
        setOptions(filteredArray);
    }
}, [urls]);
    

       
    return (
        <div className='bg-white rounded-md p-6 p-t-8'>
        <h2 className='text-2xl font-bold mb-2 text-dark'>Customize your links</h2>
        <p className='text-grey-1 mb-10'>Add/edit/remove links below and then share all your profiles with the world!</p>

        <button
        className="btn-secondary w-full mb-4"
        onClick={addNewLink}
        >
        +Add new link
        </button>



        {
            urls.length == 0 ? <div>mama</div> : 
            urls.map((url, key) => {
                if (url.status != 'deleted') {
                return (
                    <div className="p-6 mb-6 border-dark cursor-pointer bg-grey-3"
                        key={key}>

                        <div className='flex justify-between mb-4'>
                            <p className='font-bold'>Link #{key + 1}</p>
                            <div onClick={deleteUrl(key)} className='hover:text-violet-1'>Remove</div>
                        </div>
                        <label className='block mb-2'>Platform</label>
                        <Select
                            defaultValue={{label: url.name, value: url.name}}
                            options={options}
                            isSearchable={false}
                            className="w-full mb-6 cursor-pointer"
                            onChange={changeUrlVal(key)}
                            name="listMenu"
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
            }
        })
        }
        </div>
    )
}