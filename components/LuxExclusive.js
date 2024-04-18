'use client';
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';

const DolceGabbanaExclusive = () => {
    const [mernlux, setMernlux] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await fetch(`/api/category?query=${'fashion'}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch category data');
                }
                const data = await response.json();
                // Filter items with the specified subcategory
                const filteredItems = data.filterData.filter(item => {
                    const brandWithoutSpaces = item.productbrand.replace(/\s/g, '');
                    return brandWithoutSpaces.toLowerCase().includes('hugoboss'.toLowerCase());
                });
                setMernlux(filteredItems);
                setIsLoaded(true);
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };
        fetchCategoryData();
    }, []);

    return (
        <div className="bg-gradient-to-b from-blue-300 to-blue-900 py-12 md:py-24 m-6 rounded">

            <div className="container mx-auto px-4">
                <div className="text-center text-white">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tighter">Dolce & Gabbana</h2>
                    <p className="max-w-lg mx-auto text-lg md:text-xl lg:text-2xl mb-8">
                        Discover the latest collection of clothing and accessories for men and women on the official mern store.
                    </p>
                </div>
            </div>

            {isLoaded ? (
                <section className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {mernlux.map((product, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden ">
                                <img
                                    src={product.photo[3]}
                                    alt={product.productname}
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                        ))}
                    </div>
                </section>) : (
                <Spinner />
            )}
            <section className="container mx-auto px-4 py-12 md:py-24 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Customer Reviews</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Amazing Collection</h3>
                            <p className="text-sm">The new collection is absolutely stunning. I love the attention to detail and the quality of the fabrics. Dolce & Gabbana never disappoints!</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Stylish and Elegant</h3>
                            <p className="text-sm">I recently purchased a dress from Dolce & Gabbana, and I'm thrilled with my purchase. The design is both stylish and elegant, and the fit is perfect. I received so many compliments when I wore it. I'll definitely be shopping here again!</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>

    );
};

export default DolceGabbanaExclusive;
