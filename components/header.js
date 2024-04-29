"use client";
import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { CartContext } from "./CartProvider";
import SearchBar from "./SearchBar";
import ProfileDropDown from "./ProfileDropDown";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { GlobalContext } from "./GlobalContex";
import CustomSearchBox from "./AlgoliaCustomeSearchBox";
import AlgoliaSearch from "./Algolia";


const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "top" },
            { name: "Dresses", href: "dress" },
            { name: "Jeans", href: "jeans" },
            { name: "Denim", href: "denim" },
            { name: "Sweaters", href: "sweater" },
            { name: "T-Shirts", href: "T-shirt" },
            { name: "Jackets", href: "jacket" },
            { name: "browse all", href: "all" },

          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "watch" },
            { name: "Wallets", href: "wallet" },
            { name: "Bags", href: "bag" },
            { name: "Sunglasses", href: "sunglass" },
            { name: "Caps", href: "cap" },
            { name: "Belts", href: "belt" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Nike", href: "nike" },
            { name: "Zara", href: "zara" },
            { name: "H&M", href: "h&m" },
            { name: "Puma", href: "puma" },
            { name: "Other brands", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "shirts", href: "shirt" },
            { name: "jeans", href: "jeans" },
            { name: "hoodie", href: "hoodie" },
            { name: "T-Shirts", href: "t-shirts" },
            { name: "Jackets", href: "jacket" },
            { name: "shoes", href: "shoe" },
            { name: "Browse All", href: "allmen" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "watch" },
            { name: "Wallets", href: "wallet" },
            { name: "Bags", href: "bag" },
            { name: "Sunglasses", href: "sunglass" },
            { name: "Hats", href: "cap" },
            { name: "Belts", href: "belt" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Nike", href: "nike" },
            { name: "Zara", href: "zara" },
            { name: "H&M", href: "h&m" },
            { name: "Puma", href: "puma" },
            { name: "Other brands", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Mern Lux", href: "/mernlux" },
    { name: "Stores", href: "/productlist" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { setGenderSelected, isSearchOpen, setIsSearchOpen } = useContext(GlobalContext);
  const numberOfProductsInCart = cartItems?.length || 0;
  const { data: session } = useSession();
  const handleChange = (category) => {
    setGenderSelected(category);
  };
  const [dropdown, setDropdown] = useState(false);

  const productFetch = async () => {
    try {
      const res = await fetch('/api/newarrival/');
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      const updatedNavigation = { ...navigation };
      updatedNavigation.categories.forEach((category) => {
        if (category.name === "Men") {
          category.featured[0].name = data.fashionNewArrivalsMen[0]?.productname;
          category.featured[0].href = '/productoverview/' + data.fashionNewArrivalsMen[0]?._id;
          category.featured[0].imageSrc = data.fashionNewArrivalsMen[0]?.photo[0]; // Assuming photo is an array
          category.featured[0].imageAlt = "New Arrivals";
          category.featured[1].name = data.fashionNewArrivalsMen[1]?.productname;
          category.featured[1].href = '/productoverview/' + data.fashionNewArrivalsMen[1]?._id;
          category.featured[1].imageSrc = data.fashionNewArrivalsMen[1]?.photo[0]; // Assuming photo is an array
          category.featured[1].imageAlt = "New Arrivals";
        } else if (category.name === "Women") {
          category.featured[0].name = data.fashionNewArrivalsWomen[0]?.productname;
          category.featured[0].href = '/productoverview/' + data.fashionNewArrivalsWomen[0]?._id;
          category.featured[0].imageSrc = data.fashionNewArrivalsWomen[0]?.photo[0]; // Assuming photo is an array
          category.featured[0].imageAlt = "New Arrivals";
          category.featured[1].name = data.fashionNewArrivalsWomen[1]?.productname;
          category.featured[1].href = '/productoverview/' + data.fashionNewArrivalsWomen[1]?._id;
          category.featured[1].imageSrc = data.fashionNewArrivalsWomen[1]?.photo[0]; // Assuming photo is an array
          category.featured[1].imageAlt = "New Arrivals";
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    productFetch();
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handelCick = () => {
    setDropdown(true);
    console.log("dropdown", dropdown);
  };
  const handleMouseEnter = () => {
    setDropdown(!dropdown);
  };

  return (
    <div id="sticky-header" className="sticky top-0 z-50 bg-white">
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setOpen}
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
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}
                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200">
                      <Tab.List className="-mb-px flex space-x-8 px-4">
                        {navigation.categories.map((category) => (
                          <Tab
                            key={category.name}
                            onClick={() => {
                              handleChange(category.name);
                            }}
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-900",
                                "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                              )
                            }
                          >
                            {category.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category) => (
                        <Tab.Panel
                          key={category.name}
                          className="space-y-10 px-4 pb-8 pt-10"
                        >
                          <div className="grid grid-cols-2 gap-x-4">
                            {category.featured.map((item) => (
                              <div
                                key={item.name}
                                className="group relative text-sm"
                              >
                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <img
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    className="object-cover object-center"
                                  />
                                </div>
                                <a
                                  href={item.href}
                                  className="mt-6 block font-medium text-gray-900"
                                >
                                  <span
                                    className="absolute inset-0 z-10"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                                <p aria-hidden="true" className="mt-1">
                                  Shop now
                                </p>
                              </div>
                            ))}
                          </div>
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p
                                id={`${category.id}-${section.id}-heading-mobile`}
                                className="font-medium text-gray-900"
                              >
                                {section.name}
                              </p>
                              <ul
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                              >
                                {section.items.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={`/headernavigation/${item.href}`}
                                    passHref
                                    className="hover:text-gray-800"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <a
                          href={page.href}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <Link
                        href={"/signin"}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign in
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        href={"/register"}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Create account
                      </Link>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <div className="flex items-center text-gray-700 hover:text-gray-800">
                      <div>
                        <img
                          src="/flag.png"
                          alt="home"
                          className="object-cover w-8 h-6"
                        />
                      </div>
                      <span className="ml-3 block text-sm font-medium">
                        IND
                      </span>
                      <span className="sr-only">, change currency</span>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white">
          <div className="flex h-14 items-center  justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8 ">
            {/* Algolia search component */}
            <div className="  h-full w-full">

            </div>
          </div>

          <nav
            aria-label="Top"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <Link href={"/"}>
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                  </Link>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {navigation.categories.map((category) => (
                      <Popover key={category.name} className="flex">
                        {({ open }) => (
                          <>
                            <div className="relative flex ">
                              <Popover.Button
                                onClick={() => {
                                  handleChange(category.name);
                                  handelCick();
                                }}
                                className={classNames(
                                  open
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-transparent text-gray-700 hover:text-gray-800",
                                  "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                )}
                              >
                                {category.name}
                              </Popover.Button>
                            </div>

                            {dropdown && (
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                  {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                  <div
                                    className="absolute inset-0 top-1/2 bg-white shadow"
                                    aria-hidden="true"
                                  />

                                  <div className="relative bg-white">
                                    <div className="mx-auto max-w-7xl px-8">
                                      <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                          {category.featured.map((item) => (
                                            <div
                                              key={item.name}
                                              className="group relative text-base sm:text-sm"
                                            >
                                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                <img
                                                  src={item.imageSrc}
                                                  alt={item.imageAlt}
                                                  className="object-cover object-center"
                                                />
                                              </div>
                                              <a
                                                href={item.href}
                                                className="mt-6 block font-medium text-gray-900"
                                              >
                                                <span
                                                  className="absolute inset-0 z-10"
                                                  aria-hidden="true"
                                                />
                                                {item.name}
                                              </a>
                                              <p
                                                aria-hidden="true"
                                                className="mt-1"
                                              >
                                                Shop now
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                          {category.sections.map((section) => (
                                            <div key={section.name}>
                                              <p
                                                id={`${section.name}-heading`}
                                                className="font-medium text-gray-900"
                                              >
                                                {section.name}
                                              </p>
                                              <ul
                                                aria-labelledby={`${section.name}-heading`}
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {section.items.map((item) => (
                                                  <li
                                                    key={item.name}
                                                    className="flex"
                                                  >
                                                    <Link
                                                      href={`/headernavigation/${item.href}`}
                                                      passHref
                                                      className="hover:text-gray-800"
                                                      onClick={handleMouseEnter}
                                                    >
                                                      {item.name}
                                                    </Link>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            )}
                          </>
                        )}
                      </Popover>
                    ))}

                    {navigation.pages.map((page) => (
                      <Link
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {page.name}
                      </Link>
                    ))}
                  </div>
                </Popover.Group>


                <div className="ml-auto flex items-center">
                  {/* Currency */}

                  <div className='flex gap-2' onClick={toggleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <p className='text-md font-medium cursor-pointer' >search</p>
                  </div>
                  <div className='' >
                    {isSearchOpen && <AlgoliaSearch />}
                  </div>

                  {/* Cart */}
                  <div className="ml-4  flow-root lg:ml-6">
                    <Link
                      href={"/cart"}
                      className="group -m-2 flex items-center p-2"
                    >
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        {numberOfProductsInCart}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </Link>
                  </div>
                  {/* Sign in */}
                  <div className="ml-4  flow-root lg:ml-6">
                    {session ? (
                      <ProfileDropDown />
                    ) : (
                      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <Link
                          href="/signin"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Sign in
                        </Link>
                        <span
                          className="h-6 w-px bg-gray-200"
                          aria-hidden="true"
                        />
                        <Link
                          href="/register"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Create account
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}
