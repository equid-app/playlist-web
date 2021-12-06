import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import usePlayList from "../../hooks/usePlayList";

type Inputs = {
    name: string,
    description: string,
    url: string,
};

export default function CreatePlayList() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [create] = usePlayList()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        create(data);
    };


    return (
        <form
            className='flex flex-col align-middle justify-center mt-10 max-w-md m-auto'
            onSubmit={handleSubmit(onSubmit)} >
            <div className='px-6 py-4 shadow-sm border rounded-md flex flex-col'>
                <h1 className='font-bold text-lg '>Share Your PlayList </h1>
                <input
                    {...register("name", { required: true })}
                    placeholder='Playlist Name'
                    className='shadow-sm border rounded-md px-4 py-2 my-2' />
                <input
                    {...register("description", { required: true })}
                    placeholder='Playlist Description'
                    className='shadow-sm border rounded-md px-4 py-2 my-2 ' />

                <input
                    {...register("url", { required: true })}
                    placeholder='Playlist Url'
                    className='shadow-sm border rounded-md px-4 py-2 my-2 ' />

                <input
                    className='bg-indigo-600 hover:bg-indigo-700 text-white whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium '
                    type="submit" />
            </div>
        </form>
    );
}