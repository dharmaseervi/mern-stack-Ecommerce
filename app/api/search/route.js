import { getProduct } from "@/lib/action";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const res = await getProduct();
        const data = JSON.parse(res);

        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');

        if (!query) {
            return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
        }

        const filterData = data.filter((item) => {
            const productName = item.productname ? item.productname.toLowerCase() : '';
            const symbol = item.symbol ? item.symbol.toLowerCase() : '';
            return productName.includes(query.toLowerCase()) || symbol.includes(query.toLowerCase());
        });

        return NextResponse.json({ filterData });
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
