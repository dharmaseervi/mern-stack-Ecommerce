import algoliasearch from 'algoliasearch';
import connectDB from '@/util/mongodbConnect';
import ProductModel from '@/modules/products';
import { NextResponse } from "next/server";


export async function POST(response) {

    try {
        await connectDB();
        const collection = ProductModel;
        const data = await collection.find()
       

        // Format data for Algolia
        const algoliaData = data.map(item => ({
            objectID: item._id.toString(),
            name: item.productname,
            description: item.productdescription,
            price: item.productprice,
            image: item.photo[0],
            category: item.parentcategory,
            brand: item.productbrand,
            subcategory: item.subcategory,
            // Add other fields as needed
        }));

        // Initialize Algolia client
        const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY_ADMIN);
        const index = algoliaClient.initIndex('mern store');

        // Upload data to Algolia
        await index.saveObjects(algoliaData);

        return NextResponse.json({ message: 'Data uploaded to Algolia successfully' });
    } catch (error) {
        console.error('Error uploading data to Algolia:', error);
        return NextResponse.json({ message: 'Internal server error' });
    }
}
