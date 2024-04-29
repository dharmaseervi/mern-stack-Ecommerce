import Link from "next/link";


export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center gap-8 p-10 md:p-12">
            <div className="text-center">
                <ShoppingBagIcon className="h-12 w-12 text-gray-500 mx-auto" />
                <h2 className="text-2xl font-semibold text-gray-900  mb-2">
                    Your cart is empty
                </h2>
                <p className="text-gray-600">
                    It seems like you haven't added anything to your cart yet.
                </p>
            </div>
            <div className="w-full max-w-lg">
                <img
                    src="/emptycart.jpg"
                    alt="Empty cart illustration"
                    className="w-96 h-auto mx-auto"
                />
            </div>
            <div className="text-center">

                <Link href="/" className="text-indigo-600 hover:underline border border-indigo-600 px-4 py-3 rounded-sm">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
function ShoppingBagIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
    )
}