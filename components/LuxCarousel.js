'use client';
import React, { useEffect, useState } from 'react';

export default function LuxCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const carousel = [
        {
            id: 1,
            image: "/carousel1.png",
            title: "Gucci",
        },
        {
            id: 2,
            image: "/carousel2.png",
            title: "Dior",
        },
        {
            id: 3,
            image: "/carousel3.png",
            title: "Chanel",
        },
        {
            id: 4,
            image: "/carousel4.png",
            title: "Louis Vuitton",
        },
        {
            id: 5,
            image: "/carousel5.png",
            title: "Hugo Boss",
        },
        {
            id: 6,
            image: "/carousel6.png",
            title: "Prada",
        },
        {
            id: 7,
            image: "/carousel7.png",
            title: "Versace",
        },
        {
            id: 8,
            image: "/carousel8.png",
            title: "Dolce & Gabbana",
        },
        {
            id: 9,
            image: "/carousel9.png",
            title: "Balenciaga",
        },
        {
            id: 10,
            image: "/carousel10.png",
            title: "Burberry",
        },


    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === carousel.length - 1 ? 0 : prevIndex + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === carousel.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? carousel.length - 1 : prevIndex - 1));
    };

    return (
        <div className="relative h-96 m-6">
            <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-6 rounded-full" onClick={prevSlide}>
                &lt;
            </button>
            <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 p-6 rounded-full" onClick={nextSlide}>
                &gt;
            </button>
            <img src={carousel[currentIndex].image} alt={carousel[currentIndex].title} className="w-full h-full object-cover rounded-lg" />
            <div className="absolute justify-center bottom-4 left-4 text-white ">
                <h1 className="text-4xl font-bold">{carousel[currentIndex].title}</h1>
                <p className="text-lg">Explore the world of luxury fashion brands</p>
            </div>
        </div>
    );
}
