import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-0 m-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Online Shopping */}
          <div className="mb-8">
            <h4 className="text-lg font-bold mb-4">Online Shopping</h4>
            <ul className="list-none text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Fashion</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Electronics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Home & Kitchen</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Personal Care</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Books</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Toys</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Sports</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Fitness</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Bags</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Luggage</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Watches</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Jewellery</a></li>
            </ul>
          </div>

          {/* Column 2: Useful Links */}
          <div className="mb-8">
            <h4 className="text-lg font-bold mb-4">Useful Links</h4>
            <ul className="list-none text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Site Map</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Policies */}
          <div className="mb-8">
            <h4 className="text-lg font-bold mb-4">Customer Policies</h4>
            <ul className="list-none text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">T&C</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Terms Of Use</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Track Orders</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Shipping</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Cancellation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Privacy policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Grievance Officer</a></li>
            </ul>
          </div>

          {/* Column 4: Experience Mern Stack App on Mobile */}
          <div>
            <h4 className="text-lg font-bold mb-4">Experience Mern Stack App on Mobile</h4>
            <p className="text-sm text-gray-400">Download our app for a seamless shopping experience.</p>
            {/* Insert app download buttons/icons here */}
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400">
          <div className="flex items-center justify-between">
            <p>&copy; 2024 Mern Stack || dharmaseervi. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-400">100% ORIGINAL guarantee for all products at MernStack.com</p>
            <p className="text-gray-400">Return within 14 days of receiving your order</p>
          </div>

          <div className="mt-4">
            <p className="text-gray-400">Mern Stack is a registered trademark of dharmaseervi</p>
            <p className="text-gray-400">Registered Office Address: Mern Stack, 123, 4th Cross, 4th Block, 4th Lane, MernStack.com, 560001</p>
            <p className="text-gray-400">CIN : 1234567890</p>
            <p className="text-gray-400">Telephone: 1800 208 9898</p>
          </div>

          <div className="mt-4">
            <h1 className='text-gray-600 text-lg font-medium mb-2'>payment accepted</h1>
            <div className="flex space-x-4">
              <img src="/mastercard.svg" alt="mastercard" />
              <img src="/visa.svg" alt="visa" />
              <img src="/paypal.svg" alt="paypal" />
              <img src="/american-express.svg" alt="american-express" />
              <img src="/google-pay.svg" alt="google-pay" />
              <img src="/apple-pay.svg" alt="apple-pay" />
             
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
