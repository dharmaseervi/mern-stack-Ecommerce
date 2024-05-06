import Link from 'next/link'
import React from 'react'

export default function LuxBrands() {

    const brand = [
        {
            brandName: 'Hugo Boss',
            brandImage: '/Hugo Boss.jpg',
            href: '/HugoBoss',
            brandDescription: 'Hugo Boss AG, often styled as BOSS, is a German luxury fashion house headquartered in Metzingen, Baden-Württemberg. The company sells clothing, accessories, footwear and fragrances. Hugo Boss is one of the largest German clothing companies, with global sales of €2.9 billion in 2019.',
        },
        {
            brandName: 'Gucci',
            brandImage: '/Gucci.png',
            href: '/Gucci',
            brandDescription: 'Gucci is an Italian luxury brand of fashion and leather goods. Gucci was founded by Guccio Gucci in Florence, Tuscany, in 1921. Gucci generated about €4.2 billion in revenue worldwide in 2008 according to BusinessWeek and climbed to 41st position in the magazine\'s annual 2009 "Top Global 100 Brands" chart created by Interbrand; it retained that rank in Interbrand\'s 2014 index.',
        },

        {
            brandName: 'Versace',
            brandImage: '/versace.png',
            href: '/Versace',
            brandDescription: 'Gianni Versace S.r.l., usually referred to simply as Versace, is an Italian luxury fashion company and trade name founded by Gianni Versace in 1978. The main collection of the brand is Versace, which produces upmarket Italian-made ready-to-wear and leather accessories, while other diffusion lines are Versace Collection, Versus Versace, and Versace Jeans.',

        },
        {
            brandName: 'Prada',
            brandImage: '/prada.png',
            href: '/Prada',
            brandDescription: 'Prada S.p.A. is an Italian luxury fashion house that was founded in 1913 by Mario Prada. It specializes in leather handbags, travel accessories, shoes, ready-to-wear, perfumes and other fashion accessories.',

        },
        {
            brandName: 'Dolce & Gabbana',
            brandImage: '/d&g.png',
            href: '/DolceGabbana',
            brandDescription: 'Dolce & Gabbana is an Italian luxury fashion house founded in 1985 in Legnano by Italian designers Domenico Dolce and Stefano Gabbana. They met each other in Milan in 1980 and designed for the same fashion house. In 1982, they established a designer consulting studio; in time it grew to become Dolce & Gabbana.',

        },
        {
            brandName: 'Burberry',
            brandImage: '/burberry.png',
            href: '/Burberry',
            brandDescription: 'Burberry Group plc is a British luxury fashion house headquartered in London, England. It currently designs and distributes ready to wear including trench coats, leather goods, footwear, fashion accessories, eyewear, fragrances, and cosmetics.',

        },
        {
            brandName: 'Balenciaga',
            brandImage: '/balenciaga.png',
            href: '/Balenciaga',
            brandDescription: 'Balenciaga is a luxury fashion house founded in 1919 by Spanish designer Cristóbal Balenciaga in San Sebastián, Spain and currently based in Paris. Balenciaga had a reputation as a couturier of uncompromising standards and was referred to as "the master of us all" by Christian Dior.',

        },
        {
            brandName: 'Louis Vuitton',
            brandImage: '/lv.png',
            href: '/LouisVuitton',
            brandDescription: 'Louis Vuitton Malletier, commonly known as Louis Vuitton, is a French luxury fashion and leather goods brand, part of the LVMH conglomerate. The label\'s LV monogram appears on most of its products, ranging from luxury trunks and leather goods to ready-to-wear, shoes, watches, jewelry, accessories, sunglasses and books.',

        },
        {
            brandName: 'Chanel',
            brandImage: '/chanel.png',
            href: '/Chanel',
            brandDescription: 'Chanel S.A. is a French luxury fashion house that was founded by Coco Chanel in 1910',

        },
        {
            brandName: 'Dior',
            brandImage: '/dior.png',
            href: '/Dior',
            brandDescription: 'Christian Dior SE, commonly known as Dior, is a French luxury fashion house controlled and chaired by French businessman Bernard Arnault, who also heads LVMH, the world\'s largest luxury group. Dior itself holds 42.36% shares of and 59.01% voting rights within LVMH.',

        },
    ]

    return (
        <div>
            <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-center items-center gap-4 p-6" >
                {brand.map((brand, index) => (
                    <Link key={index} loading="lazy" className=" shadow-md justify-center items-center rounded-lg p-8  max-w-lg  gap-4 flex border bg-slate-400 hover:bg-slate-300" href={`/mernlux${brand.href}`}>
                        <div className='w-44 h-24'>
                            <img className='w-full h-full object-cover mix-blend-multiply' src={brand.brandImage} alt={brand.brandName} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
