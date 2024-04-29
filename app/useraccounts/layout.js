import SideNavbar from '@/components/SideNavbar';
import React from 'react';

export default function Layout({ children }) {
    return (
        <div className='h-screen flex flex-col lg:flex-row  justify-center items-center my-5 '>
            <div className="flex flex-col lg:flex-row w-full md:w-5/6 h-full">
                <div className="lg:h-full  w-full  lg:w-1/2 xl:w-1/3">
                    <SideNavbar />
                </div>
                <div className="lg:px-4 px-8 py-5 w-full h-full overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
