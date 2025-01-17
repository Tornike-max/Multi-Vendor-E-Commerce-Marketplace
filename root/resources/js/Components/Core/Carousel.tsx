import { Image } from "@/types";
import React from "react";

const Carousel = ({ images }: { images: Image[] }) => {
    return (
        <div className="flex items-start gap-8">
            <div className="flex flex-col items-center gap-2 py-2">
                {images &&
                    images.map((image, i) => (
                        <a href={"#item" + i} key={image.id}>
                            <img
                                src={image?.thumb}
                                alt="#"
                                className="w-[50px]"
                            />
                        </a>
                    ))}
            </div>
            <div className="carousel w-full">
                {images &&
                    images.map((image, i) => (
                        <div
                            key={image.id}
                            id={"item" + i}
                            className="carousel-item w-full"
                        >
                            <img src={image?.large} className="w-full" />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Carousel;
