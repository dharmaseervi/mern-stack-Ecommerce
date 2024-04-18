import React from 'react';
import { PuffLoader, RingLoader } from 'react-spinners';


const Spinner = () => {
    return (
        <div className="flex justify-center items-cente">
            <PuffLoader
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
            />
            
        </div>
    );
};

export default Spinner;
