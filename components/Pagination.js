'use client'

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@material-tailwind/react";
import { useState } from "react";

export function CircularPagination({ totalPages, currentPage, paginate }) {
    const [startPage, setStartPage] = useState(1);

    const next = () => {
        if (currentPage === totalPages) return;
        paginate(currentPage + 1);
        if (currentPage + 1 > startPage + 4) {
            setStartPage(startPage + 5);
        }
    };

    const prev = () => {
        if (currentPage === 1) return;
        paginate(currentPage - 1);
        if (currentPage - 1 < startPage) {
            setStartPage(startPage - 5);
        }
    };

    return (
        <>
            {totalPages > 1 && (<div className="fixed bottom-0 left-0 w-full bg-white py-4 px-6 flex justify-evenly items-center">
                <Button variant="text" className="flex items-center gap-2 rounded-full border border-black" onClick={prev} disabled={currentPage === 1}>
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                    {[...Array(Math.min(totalPages - startPage + 1, 5))].map((_, index) => (
                        <IconButton key={startPage + index} variant={currentPage === startPage + index ? "filled" : "text"} color="gray" onClick={() => paginate(startPage + index)} className="rounded-full flex justify-center items-center">
                            {startPage + index}
                        </IconButton>
                    ))}
                </div>
                <Button variant="text" className="flex items-center gap-2 rounded-full border border-black" onClick={next} disabled={currentPage === totalPages}>
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>)}
        </>

    );
}
