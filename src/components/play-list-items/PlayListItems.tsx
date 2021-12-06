import React, { useEffect, useState } from "react";
import usePlayList, { PlayListDataType } from "../../hooks/usePlayList";

type Inputs = {
    name: string,
    description: string,
    url: string,
};

export default function PlayListItems() {
    const [items, setItems] = useState<PlayListDataType[]>([]);
    const [, getContractList] = usePlayList();




    useEffect(() => {
        getContractList().then(data => setItems(data));

    }, []);


    return (
        <div className='flex justify-center  flex-col items-center m-auto max-w-md mt-10 '>
            <h1 className='font-bold text-2xl'>PlayLists</h1>
            <div className='mt-6 w-full'>
                {
                    !!items?.length && items?.map((item, index) => {
                        return (
                            <div className='flex flex-col  border rounded-md  shadow-md p-6 m-4' key={index}>
                                <h1 className='font-bold text-2xl'>{item.name}</h1>
                                <p className='text-xl'>{item.description}</p>
                                <p className='text-xl'>{item.url}</p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}