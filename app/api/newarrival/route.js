import ProductModel from "@/modules/products";
import connectDB from "@/util/mongodbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectDB();
    try {
        // Fetch all new arrivals
        const allNewArrivals = await ProductModel.find({})
            .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (newest first)
            .limit(5); // Limit the result to 5 products

        // Fetch fashion new arrivals for women
        const fashionNewArrivalsWomen = await ProductModel.find({ parentcategory: "fashion", "subcategory": { $regex: /women/ } })
            .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (newest first)
            .limit(2); // Limit the result to 2 products

        // Fetch fashion new arrivals for men
        const fashionNewArrivalsMen = await ProductModel.find({ parentcategory: "fashion", "subcategory": { $regex: /men/ } })
            .sort({ createdAt: -1 }) // Sort by createdAt field in descending order (newest first)
            .limit(2); // Limit the result to 2 products

        return NextResponse.json({ msg: 'data fetched successfully', allNewArrivals, fashionNewArrivalsWomen, fashionNewArrivalsMen });
    } catch (error) {
        console.error('Error getting products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
