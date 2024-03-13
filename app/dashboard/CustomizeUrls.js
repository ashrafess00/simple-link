import Select from 'react-select';
import { listMenu } from "@/app/utils/listMenu";

export default function CustomizeUrls({urls, setUrls}) {

    function addNewLink() {
        //add the object to the urls
        setUrls(purl => {
            const updatedPurl = [...purl];
            updatedPurl.push({name: listMenu[0].value, url:"", status: "added"})
            return updatedPurl;
        });
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

    const save = () => {
        const addedUrls = urls.filter(e => e.status === "added");

        const editedUrls = urls.filter(e => (e.status === "edited" && e._id));

        const deletedUrls = urls.filter(e => (e.status === "deleted" && e._id));

        //here api will be called to CRUD items
        console.log(addedUrls);
        console.log(editedUrls);
        console.log(deletedUrls);
    }

    return (
        <>
        <h2>something</h2>

        <button className="border-violet-1 text-violet-1"
        onClick={addNewLink}
        >
        +Add new link
        </button>

        {
            urls.map((url, key) => {
                if (url.status != 'deleted') {
                return (
                    <div className="p-4 border-dark cursor-pointer"
                        key={key}>

                        <p>Link #{key + 1}</p>
                        <Select
                            defaultValue={url.name}
                            options={listMenu}
                            isSearchable={false}
                            className="p-3"
                            onChange={changeUrlVal(key)}
                            name="listMenu"
                    />
                        <input
                        type="text"
                        placeholder="bla bla"
                        className="border-dark"
                        value={url.url}
                        onChange={changeUrlVal(key)}/>

                        <div onClick={deleteUrl(key)} className='hover:text-violet-1'>Remove Item</div>
                    </div>
                )
            }
        })
        }
        <button onClick={save} className='bg-violet-1 p-4'>save</button>
        </>
    )
}