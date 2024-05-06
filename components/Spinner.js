import React from 'react';
import { PuffLoader} from 'react-spinners';


const Spinner = () => {
    return (
        <div className="flex justify-center items-cente">
            <PuffLoader
                height="80"
                width="80"
                color="#4fa94d"
                aria-label="puff-loading"
            />
            
        </div>
    );
};

export default Spinner;
