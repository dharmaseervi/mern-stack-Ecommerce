'use client'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfileDropDown() {

    const { data: session } = useSession()
    const userid = session?.user?._id;

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {session?.user?.name}{session?.user?.image ? <img className='w-6 h-6' src={session?.user?.image} alt="profile pic" /> : null}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/useraccounts"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Account
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href="/order"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    order
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    href={'/register/' + userid}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    setting
                                </Link>
                            )}
                        </Menu.Item>

                        <div>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        type="button"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            ' px-4 py-2 text-left text-sm border border-red-600 flex justify-between items-center m-2 rounded text-red-600'
                                        )}
                                        onClick={() => signOut()}
                                    >
                                        <span>Sing out</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                        </svg>
                                    </button>

                                )}
                            </Menu.Item>
                        </div>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu >
    )
}
