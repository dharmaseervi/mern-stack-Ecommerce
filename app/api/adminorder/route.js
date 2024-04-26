import Order from "@/modules/order";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderid");
    let orderItems;

    if (orderId) {
      const order = await Order.findById(orderId).populate({
        path: "items",
        populate: "product",
      });

      if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }

      orderItems = [order]; 
    } else {
      orderItems = await Order.find().populate({
        path: "items",
        populate: "product",
      });
    }

    return NextResponse.json({ orderItems });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { orderId, orderStatus } = await request.json();
    console.log(orderId, orderStatus);
    // Update the order status
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status: orderStatus },
      { new: true }
    );
    // Save the updated order
    await order.save();
    // Return a JSON response with the updated order
    return NextResponse.json({ msg: "Successfully updated", order });
  } catch (error) {
    console.error("Error:", error);
    // Return a JSON response for internal server error
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
