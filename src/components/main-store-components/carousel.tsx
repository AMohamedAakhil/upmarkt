"use client"

import Image from "next/image";

interface MainCarouselProps {
  slides: {imageUrl: string, mainText: string, subText: string}[]
}
 
export function MainCarousel({props}: {props: MainCarouselProps}) {
  const {slides} = props
  return (
      <div className="w-full">
        {
          slides.map((slide) => {
            return (
              <Image alt={slide.mainText} src={slide.imageUrl} width="100" height="100" />
            )
          })
        }
      </div>
  );
}