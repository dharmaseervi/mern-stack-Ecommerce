import Image from 'next/image'
import Link from 'next/link'

export default function CategoryHeader() {
    return (
        <div className="bg-gray-100 mx-6 mt-2 p-2 rounded">
            <nav className="flex items-center justify-center" aria-label="Breadcrumb">
                <ol role="list" className="grid grid-cols-3 md:grid-cols-6  xl:grid-cols-6 gap-4 p-2 w-full">
                    <CategoryLink imageSrc="/electronic.jpeg" categoryName="Electronic" categorySlug="electronic" />
                    <CategoryLink imageSrc="/fashion.jpeg" categoryName="Fashion" categorySlug="fashion" />
                    <CategoryLink imageSrc="/grocery-2.jpeg" categoryName="Grocery" categorySlug="grocery" />
                    <CategoryLink imageSrc="/mobile.jpeg" categoryName="Mobile" categorySlug="mobile" />
                    <CategoryLink imageSrc="/furniture.jpeg" categoryName="Furniture" categorySlug="furniture" />
                    <CategoryLink imageSrc="/cosmetics.jpeg" categoryName="Cosmetics" categorySlug="cosmetics" />
                </ol>
            </nav>
        </div>
    )
}

function CategoryLink({ imageSrc, categoryName, categorySlug }) {
    return (
        <li>
            <div className="flex flex-col items-center">
                <div className="relative w-12 h-12  lg:w-24 lg:h-24">
                    <Image src={imageSrc} alt={categoryName} layout="fill" objectFit="cover" className="rounded" />
                </div>
                <div>
                    <Link href={`/category/${categorySlug}`} className="mt-2 text-sm font-medium text-gray-500 hover:text-gray-700">{categoryName}</Link>
                </div>
            </div>
        </li>
    )
}
