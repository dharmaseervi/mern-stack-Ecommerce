'use server'
import ProductModel from "../modules/products";
import connectDB from "../util/mongodbConnect";
import cartModel from "@/modules/cart";

export async function getProduct() {
    'use server'
    await connectDB();

    try {
        const products = await ProductModel.find({});
        return JSON.stringify(products);
        console.log(products);

    } catch (error) {
        console.error('Error getting products:', error);
        return [];
    }
}

export async function getProductById(id) {
    'use server'
    await connectDB();

    try {
        const product = await ProductModel.findById(id);
        return JSON.stringify(product);
    } catch (error) {
        console.error('Error getting product by id:', error);
        return [];
    }
}


