
import ProductListCard from '@/components/ProductListCard'
import { getProduct } from '@/lib/action'
import React from 'react'

export default async function page() {

    const product = await getProduct();

    console.log(product);

    return (
        <div>
            <ProductListCard product={product} />
        </div>
    )
}
