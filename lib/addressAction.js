"use server";
import addressModel from "@/modules/address";
import connectDB from "@/util/mongodbConnect";


export async function GetAddressByid(id) {
  "use server";
  await connectDB();
  try {
    const product = await addressModel.findById(id);
    console.log("Address data fetched:", product);
    return JSON.stringify(product);

  } catch (error) {
    console.error("Error getting product by id:", error);
    return [];
  }
}

export async function addAddress(formData) {
  "use server";
  await connectDB();
  console.log(formData);

  try {
    const newAddress = new addressModel({
      name: formData.get("name"),
      pincode: formData.get("pincode"),
      address: formData.get("address"),
      town: formData.get("town"),
      city: formData.get("city"),
      state: formData.get("state"),
      mobileno: formData.get("mobileno"),
      user: formData.get("user"),
      isDefault: formData.get("isDefault"),
    });
    const savedAddress = await newAddress.save();
    console.log("New Address Saved:", savedAddress);


    return savedAddress.toObject();
  } catch (error) {
    console.error("Error adding address:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
}

export async function UpdateAddress(formData) {
  "use server";
  await connectDB();
  console.log(formData);
  const id = formData.get("id");
  try {
    const updateAddress = await addressModel.findByIdAndUpdate(
      id,
      {
        name: formData.get("name"),
        pincode: formData.get("pincode"),
        address: formData.get("address"),
        town: formData.get("town"),
        city: formData.get("city"),
        state: formData.get("state"),
        mobileno: formData.get("mobileno"),
        isDefault: formData.get("isDefault"),
      },
      { new: true }
    );
    console.log(updateAddress);
    if (formData.get("isDefault")) {
      await addressModel.updateMany(
        { _id: { $ne: updateAddress._id } }, // Exclude the updated address
        { $set: { isDefault: false } } // Set isDefault to false for all other addresses
      );
    }
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }

}
