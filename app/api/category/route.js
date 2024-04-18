// pages/api/category/[categorySlug].js

import { getProduct } from '@/lib/action';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        // Retrieve product data
        const res = await getProduct();
        const productData = JSON.parse(res);

        // Extract query parameter from the request URL
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');
    
        if (!query) {
            return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
        }

        // Filter productData based on the query parameter (categorySlug)
        const filterData = productData.filter((item) => {
            const productName = item.parentcategory ? item.parentcategory.toLowerCase() : '';
            const productSub = item.subcategory ? item.subcategory.toLowerCase() : '';

            const symbol = item.symbol ? item.symbol.toLowerCase() : '';
            return productName.includes(query.toLowerCase()) || symbol.includes(query.toLowerCase()) || productSub.includes(query.toLowerCase()) || symbol.includes(query.toLowerCase());
        });




        return NextResponse.json({ filterData });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
