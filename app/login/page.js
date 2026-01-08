"use client";

import { useState, useEffect } from "react";


const data = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiRaqWu-mdF4ESLdYZTxQa2GSLiDuatLTbhA&s",
    "https://live.staticflickr.com/8025/7184048493_6a8d9923a1_b.jpg",
    "https://wallhalla.com/thumbs/44",
];
export default function Login() {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const handlePreviousClick = () => {
        setActiveImageIndex(!activeImageIndex ? data.length - 1 : activeImageIndex - 1);
    }

    const handleNextClick = () => {
        setActiveImageIndex((activeImageIndex + 1) % data.length);
    }
    
    useEffect(() =>{
        const timer = setTimeout(() => {
            handleNextClick();
        },2000);
        return () => clearTimeout(timer);
    },[activeImageIndex]);

    return (
        <div>
            <div className="flex flex-col items-center justify-center m-5">
                <h1 className="text-2xl font-bold mb-4">Created a slider for learning purpose</h1>  
            </div>
        <div className="flex justify-center items-center h-[400px]">
            <button className="py-4 m-5" onClick={handlePreviousClick}>Previous</button>
            {data.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index}`} className={"w-1/2 object-cover " + `${index === activeImageIndex ? "block" : "hidden"}`} />
            ))}
            <button className="py-4 m-5" onClick={handleNextClick}>Next</button>
        </div>
        </div>
    )
}