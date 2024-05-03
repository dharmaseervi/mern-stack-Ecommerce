"use client";
import Link from "next/link";
import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    Squares2X2Icon,
} from "@heroicons/react/20/solid";
// Sort options
const sortOptions = [
    { name: "Most Popular", href: "#", current: true },
    { name: "Best Rating", href: "#", current: false },
    { name: "Newest", href: "#", current: false },
    { name: "Price: Low to High", href: "#", current: false },
    { name: "Price: High to Low", href: "#", current: false },
];

// Sub-categories for each category
const subCategories = {
    electronic: [
        { name: "Mobile", href: "mobile" },
        { name: "Laptops", href: "laptop" },
        { name: "Headphones", href: "headphones" },
        { name: "Smart Watches", href: "smartwatch" },
        { name: "Televisions", href: "tv" },
        { name: "Cameras", href: "camera" },
        { name: "Printers", href: "Printers" },
        { name: "Accessories", href: "Accessories" },
    ],
    fashion: [
        { name: "Clothing", href: "clothing" },
        { name: "Shoes", href: "shoe" },
        { name: "Accessories", href: "accessories" },
        { name: "Watches", href: "watch" },
        { name: "Bags", href: "bag" },
        { name: "Jewellery", href: "jewelry" },
        { name: "Sunglasses", href: "sunglasses" },
        { name: "Perfumes", href: "perfumes" },
    ],
    grocery: [
        { name: "Fruits", href: "fruits" },
        { name: "Vegetables", href: "vegetables" },
        { name: "Dairy", href: "dairy" },
        { name: "Beverages", href: "beverages" },
        { name: "Bakery", href: "backery" },
        { name: "Snacks", href: "snacks" },
        { name: "Household", href: "household" },
    ],
    mobile: [
        { name: "Mobile Phones", href: "#" },
        { name: "Laptops", href: "#" },
        { name: "Headphones", href: "#" },
        { name: "Smart Watches", href: "smartwatch" },
        { name: "Televisions", href: "#" },
        { name: "Cameras", href: "#" },
        { name: "Printers", href: "#" },
        { name: "Accessories", href: "#" },
    ],
    furniture: [
        { name: "Living Room", href: "Living Room" },
        { name: "Bedroom", href: "Bedroom" },
        { name: "Kitchen", href: "Kitchen" },
        { name: "Dining", href: "ining" },
        { name: "Office", href: "Office" },
        { name: "Outdoor", href: "Outdoor" },
        { name: "Accessories", href: "Accessories" },
    ],
    cosmetics: [
        { name: "Skin Care", href: "skin care" },
        { name: "Hair Care", href: "hair care" },
        { name: "Makeup", href: "makeup" },
        { name: "Fragrance", href: "Fragrance" },
        { name: "Bath & Body", href: "Bath & Body" },
        { name: "Tools & Brushes", href: "Tools & Brushes" },
        { name: "Accessories", href: "Accessories" },
    ],
};

// Filters for each category
const filters = {
    electronic: [
        {
            id: "brand",
            name: "Brand",
            options: [
                { value: "sony", label: "Sony", checked: false },
                { value: "samsung", label: "Samsung", checked: false },
                { value: "apple", label: "Apple", checked: false },
                { value: "asus", label: "Asus", checked: false },
                { value: "HP", label: "HP", checked: false },
                { value: "DELL", label: "Dell", checked: false },
                { value: "Lenovo", label: "Lenovo", checked: false },
                { value: "epson", label: "Epson", checked: false },
                { value: "realme", label: "Realme", checked: false },
                { value: "onePlus", label: "One plus", checked: false },
            ],
        },
        {
            id: "price",
            name: "Price",
            options: [
                { value: "1 - 10,000", label: "Under 10,000", checked: false },
                { value: "10,000 - 15,000", label: "10,000 - 15,000", checked: false },
                { value: "20,000 - 35,000", label: "20,000 - 35,000", checked: false },
                { value: "40,000 - 65,000", label: "40,000 - 65,000", checked: false },
                { value: "80,000 - 1,00,000", label: "80,000 - 1,00,000", checked: false },
            ],
        },
    ],
    fashion: [
        {
            id: "gender",
            name: "gender",
            options: [
                { value: "men", label: "men", checked: false },
                { value: "women", label: "women", checked: false },
            ],
        },
        {
            id: "size",
            name: "Size",
            options: [
                { value: "s", label: "Small", checked: false },
                { value: "m", label: "Medium", checked: false },
                { value: "l", label: "Large", checked: false },
                { value: "xl", label: "X-Large", checked: false },
                { value: "xxl", label: "XX-Large", checked: false },
                { value: "UK 29", label: "UK 29", checked: false },
                { value: "UK 30", label: "UK 30", checked: false },
                { value: "UK 31", label: "UK 31", checked: false },
                { value: "UK 32", label: "UK 32", checked: false },
            ],
        },
        {
            id: "brand",
            name: "Brand",
            options: [
                { value: "nike", label: "Nike", checked: false },
                { value: "adidas", label: "Adidas", checked: false },
                { value: "puma", label: "Puma", checked: false },
                { value: "zara", label: "Zara", checked: false },
            ],
        },
    ],
  
    mobile: [
        {
            id: "brand",
            name: "Brand",
            options: [
                { value: "sony", label: "Sony", checked: false },
                { value: "samsung", label: "Samsung", checked: false },
            ],
        },
        {
            id: "price",
            name: "Price",
            options: [
                { value: "under_100", label: "Under $100", checked: false },
                { value: "100_500", label: "$100 - $500", checked: false },
            ],
        },
    ],
    furniture: [
        {
            id: "category",
            name: "Category",
            options: [
                { value: "living_room", label: "Living Room", checked: false },
                { value: "bedroom", label: "Bedroom", checked: false },
            ],
        },
        {
            id: "price",
            name: "Price",
            options: [
                { value: "under_100", label: "Under $100", checked: false },
                { value: "100_500", label: "$100 - $500", checked: false },
            ],
        },
    ],
    cosmetics: [
        {
            id: "category",
            name: "Category",
            options: [
                { value: "skin_care", label: "Skin Care", checked: false },
                { value: "hair_care", label: "Hair Care", checked: false },
            ],
        },
        {
            id: "price",
            name: "Price",
            options: [
                { value: "under_100", label: "Under $100", checked: false },
                { value: "100_500", label: "$100 - $500", checked: false },
            ],
        },
    ],
};

export { sortOptions, subCategories, filters };

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function CategoryPage({ params }) {
    const { categorySlug } = params;
    const [categoryData, setCategoryData] = useState(null);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState({
        gender: [],
        size: [],
        brand: [],
        price: [],
    });
    const [originalCategoryData, setOriginalCategoryData] = useState(null);

    const handleChange = (value, id, checked) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (checked) {
                updatedFilters[id] = [...updatedFilters[id], value];
            } else {
                updatedFilters[id] = updatedFilters[id].filter(
                    (item) => item !== value
                );
            }

            return updatedFilters;
        });
    };
    console.log(selectedFilters, "selectedFilters");

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                // Fetch data from your API or backend based on the categorySlug
                const response = await fetch(`/api/category?query=${categorySlug}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch category data");
                }
                const data = await response.json();
                console.log(data);
                setCategoryData(data.filterData);
                setOriginalCategoryData(data.filterData);
                console.log("hello");
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        };
        fetchCategoryData();
        return () => { };
    }, []);

    useEffect(() => {
        let filteredData = originalCategoryData; // Start with original data

        // Apply subcategory filter
        if (selectedSubcategory) {
            filteredData = filteredData.filter((product) =>
                product.subcategory.includes(selectedSubcategory)
            );
        }

        // Apply gender filter
        if (selectedFilters.gender.length > 0) {
            filteredData = filteredData.filter((product) => {
                const subcategoryParts = product.subcategory.split("/");
                return selectedFilters.gender.some((gender) =>
                    subcategoryParts.includes(gender)
                );
            });
        }

        // Apply brand filter
        if (selectedFilters.brand.length > 0) {
            filteredData = filteredData.filter((product) => {
                return selectedFilters.brand.some((brand) =>
                    product.productbrand.includes(brand)
                );
            });
        }
         // Apply price filter
        if (selectedFilters.price.length > 0) {
            filteredData = filteredData.filter((product) => {
                return selectedFilters.price.some((priceRange) => {
                    const priceRangeValues = priceRange.split(" - ");
                    console.log(priceRangeValues);
                    const [minPrice, maxPrice] = priceRangeValues;
                    console.log(minPrice, 'min', maxPrice, 'max');
                    const productPrice = product.productprice;
                    console.log(productPrice, 'price');
                    return (productPrice >= parseFloat(minPrice.replace(/[^0-9.-]+/g, '')) && productPrice <= parseFloat(maxPrice.replace(/[^0-9.-]+/g, '')));
                });
            });
        }
        

        // Apply size filter
        if (selectedFilters.size.length > 0) {
            filteredData = filteredData.filter((product) => {
                return selectedFilters.size.some((size) =>
                    product.variants.some(
                        (productVariant) =>
                            productVariant.value.toLowerCase() === size.toLowerCase()
                    )
                );
            });
        }

        setCategoryData(filteredData);
    }, [selectedSubcategory, selectedFilters, originalCategoryData]);

    console.log(categoryData, "categoryData");
    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 lg:hidden"
                        onClose={setMobileFiltersOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Filters
                                        </h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul
                                            role="list"
                                            className="px-2 py-3 font-medium text-gray-900"
                                        >
                                            {subCategories?.[categorySlug]?.map((category) => (
                                                <li key={category.name}>
                                                    <a href={category.href} className="block px-2 py-3">
                                                        {category.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>

                                        {filters[categorySlug]?.map((section) => (
                                            <Disclosure
                                                as="div"
                                                key={section.id}
                                                className="border-t border-gray-200 px-4 py-6"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">
                                                                    {section.name}
                                                                </span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <PlusIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div
                                                                        key={option.value}
                                                                        className="flex items-center"
                                                                    >
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            Results
                        </h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current
                                                                    ? "font-medium text-gray-900"
                                                                    : "text-gray-500",
                                                                active ? "bg-gray-100" : "",
                                                                "block px-4 py-2 text-sm"
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <button
                                type="button"
                                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                            >
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul
                                    role="list"
                                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                                >
                                    {subCategories[categorySlug]?.map((category) => (
                                        <li key={category.name}>
                                            <a
                                                href="#"
                                                onClick={() => setSelectedSubcategory(category.href)}
                                            >
                                                {category.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                {filters[categorySlug]?.map((section) => (
                                    <Disclosure
                                        as="div"
                                        key={section.id}
                                        className="border-b border-gray-200 py-6"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">
                                                            {section.name}
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <PlusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div
                                                                key={option.value}
                                                                className="flex items-center"
                                                            >
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    onChange={(e) =>
                                                                        handleChange(
                                                                            option.value,
                                                                            section.id,
                                                                            e.target.checked
                                                                        )
                                                                    }
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>
                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <div>
                                    <div>
                                        <div className="bg-white">
                                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                                <div className="flex justify-between items-center border-b border-gray-200 py-6">
                                                    <h1 className="text-2xl font-bold text-gray-900">
                                                        {categorySlug}
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {categoryData && (
                                        <div className="bg-white">
                                            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                                <h2 className="sr-only">Products</h2>
                                                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                                    {categoryData.map((product) => (
                                                        <Link
                                                            key={product.id}
                                                            href={"/productoverview/" + product._id}
                                                            className="group"
                                                        >
                                                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                                                <img
                                                                    src={product.photo[0]}
                                                                    alt={product.productname}
                                                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                                />
                                                            </div>
                                                            <h3 className="mt-4 text-sm text-gray-700">
                                                                {product.productname}
                                                            </h3>
                                                            <p className="mt-1 text-lg font-medium text-gray-900">
                                                                {product.productprice}
                                                            </p>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
