"use client"

import React, { useState } from "react";
import Image from "next/image";

interface MainCarouselProps {
  slides: { imageUrl: string; mainText: string; subText: string }[];
}

export function MainCarousel({ props }: {props: MainCarouselProps}) {
  const { slides } = props;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = slides[currentSlideIndex];

  const nextSlide = () => {
    // Calculate the next slide index, looping back to the first slide if at the end
    const nextIndex = (currentSlideIndex + 1) % slides.length;
    setCurrentSlideIndex(nextIndex);
  };

  const previousSlide = () => {
    // Calculate the previous slide index, looping to the last slide if at the beginning
    const previousIndex =
      currentSlideIndex === 0 ? slides.length - 1 : currentSlideIndex - 1;
    setCurrentSlideIndex(previousIndex);
  };

  return (
    <div className="w-full">
      <div className="relative">
        {
          currentSlide ? <>
          <Image
          className="w-full"
          alt={currentSlide.mainText}
          src={currentSlide.imageUrl}
          width={1920}
          height={1080}
        />
          </> : <></>
        }
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center">
          <button
            onClick={previousSlide}
            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full m-4"
          >
            Previous
          </button>
          <button
            onClick={nextSlide}
            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full m-4"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
