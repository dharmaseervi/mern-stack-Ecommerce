import addressModel from "@/modules/address";
import connectDB from "@/util/mongodbConnect";
import { NextResponse } from "next/server";


export async function GET(request) {
    connectDB();

    try {
        // Retrieve all address data from the database
        const addresses = await addressModel.find();

        // Return the addresses as JSON response
        return NextResponse.json(addresses);
    } catch (error) {
        console.error(error);
        // Return an error response with status code 500 and the error message
        return NextResponse.status(500).send("Server error: " + error.message);
    }

}


export async function DELETE(request) {
    connectDB();
    const { id } = await request.json();
    console.log(id, 'id for delete');
    try {
        await addressModel.findByIdAndDelete(id);
        return NextResponse.json({ msg: "Address deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.status(500).send("Server error");
    }
}
