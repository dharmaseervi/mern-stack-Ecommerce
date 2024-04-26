import React from 'react'
import SideNavbar from '@/components/SideNavbar'
import UserAccountDashboard from '../../components/home/UserAccountDashboard'

export default function Layout({ children }) {
    return (
        <div className=' h-screen flex  justify-center items-center my-5 '>
            <div className="flex w-5/6 h-full ">
                <div className="  h-full w-1/3">
                    <SideNavbar />
                </div>
                <div className="p-2 w-full h-full overflow-hidden  ">
                    {children}
                    <UserAccountDashboard />
                </div>
            </div>
        </div>
    )
}
