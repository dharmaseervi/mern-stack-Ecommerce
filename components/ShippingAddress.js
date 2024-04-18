'use client'
import { addAddress } from '@/lib/addressAction';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function ShippingAddress({ }) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const route = useRouter();


    const onSubmit = async (data) => {
        console.log('Form data submitted:', data);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('pincode', data.pincode);
        formData.append('town', data.town);
        formData.append('city', data.city);
        formData.append('state', data.state);
        formData.append('mobileno', data.mobileno);
        formData.append('isDefault', data.isDefault);
        await addAddress(formData)

        route.back();
    }
   
    return (
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shipping Address</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Add new address
                </p>
            </div>
            
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="name"
                                    {...register("name", { required: true })}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                pincode
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="number"
                                    name="pincode"
                                    id="pincode"
                                    {...register("pincode", { required: true })}
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                Address
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="address"
                                    id="company"
                                    {...register("address", { required: true })}
                                    autoComplete="organization"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                locality / town
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="town"
                                    id="town"
                                    {...register("town", { required: true })}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                city / district
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    {...register("city", { required: true })}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-1">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                state
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="state"
                                    id="state"
                                    {...register("state", { required: true })}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
                                Phone number
                            </label>
                            <div className="relative mt-2.5">
                                <div className="absolute inset-y-0 left-0 flex items-center">
                                    <label htmlFor="country" className="sr-only">
                                        Country
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    >
                                        <option>IND</option>
                                    </select>
                                    <ChevronDownIcon
                                        className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <input
                                    type="number"
                                    name="mobileno"
                                    id="phone-number"
                                    {...register("mobileno", { required: true })}

                                    className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />

                            </div>
                        </div>
                        <div className='sm:col-span-2 flex gap-2'>
                            <input
                                type="checkbox"
                                id="defaultAddressCheckbox"
                                name="isDefault"
                                className='p-2 border-light-500'
                                {...register("isDefault")}
                                onClick={(e) => { e.stopPropagation() }}
                            />
                            <label className=" text-sm font-semibold leading-6 text-gray-900" htmlFor='defaultAddressCheckbox'>Set as default address</label>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            save
                        </button>
                    </div>
                </form>
        </div>
    )
}
