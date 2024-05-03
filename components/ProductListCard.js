'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import { CircularPagination } from "./Pagination";


export default function ProductListCard({ product }) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const paginate = (pageNumber) => { setCurrentPage(pageNumber); };

    useEffect(() => {
        if (product) {
            setProducts(JSON.parse(product));
        }
    }, [product]);

    return (
        <>
            <div className="">
                <div className="bg-white">
                    <div className="mx-auto  max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
                        <h2 className="sr-only">Products</h2>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {currentProducts.map((product) => (
                                <Link key={product._id} href={'/productoverview/' + product._id} className="group">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                        <img
                                            src={product.photo[0]}
                                            alt={product.productname}
                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-sm text-gray-700">{product.productname}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.productprice}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center my-4  items-center mx-auto max-w-2xl px-4 py-4 sm:px-6  rounded lg:max-w-7xl lg:px-8 ">
                    <CircularPagination totalPages={Math.ceil(products.length / productsPerPage)} currentPage={currentPage} paginate={paginate} />
                </div>
            </div>
        </>

    )
}
