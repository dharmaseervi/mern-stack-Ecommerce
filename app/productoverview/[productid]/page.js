import ProductOverview from '@/components/ProductOverview';
import { getProductById } from '@/lib/action';
import React from 'react'

export default async function page({ params }) {
    const { productid } = params;
    console.log(productid ,'productid');

    const product = await getProductById(productid);
    console.log(product, 'productlistt');

    return (
        <div>
            <ProductOverview productListId={product} />
        </div>
    )
}

