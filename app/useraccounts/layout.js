import SideNavbar from '@/components/SideNavbar'
import React from 'react'


export default function Layout({ children }) {
    return (
        <div className=' h-screen flex  justify-center items-center my-5 '>
            <div className="flex w-5/6 h-full ">
                <div className="  h-full w-1/3">
                    <SideNavbar />
                </div>
                <div className="p-2 w-full h-full overflow-hidden  ">
                    {children}
                </div>
            </div>
        </div>
    )
}
