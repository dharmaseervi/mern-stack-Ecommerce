'use client'

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@material-tailwind/react";

export function CircularPagination({ totalPages, currentPage, paginate }) {
    const next = () => {
      if (currentPage === totalPages) return;
      paginate(currentPage + 1);
    };
  
    const prev = () => {
      if (currentPage === 1) return;
      paginate(currentPage - 1);
    };
  
    return (
      <div className="flex items-center gap-4">
        <Button variant="text" className="flex items-center gap-2 rounded-full border border-black " onClick={prev} disabled={currentPage === 1} >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>
        <div className="flex items-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <IconButton key={index + 1} variant={currentPage === index + 1 ? "filled" : "text"} color="gray" onClick={() => paginate(index + 1)} className="rounded-full flex justify-center items-center">
              {index + 1}
            </IconButton>
          ))}
        </div>
        <Button variant="text" className="flex items-center gap-2 rounded-full border border-black" onClick={next} disabled={currentPage === totalPages}>
          Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    );
  }