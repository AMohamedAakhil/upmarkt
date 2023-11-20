import { MainCarousel } from '@/components/main-store-components/carousel'
import React from 'react'

const TestPage = () => {
  const slides = [{imageUrl: "https://upmarkt.in/storage/app/public/banner/2023-01-29-63d5fd3293c76.png", mainText: "Test", subText: "Test"}, {imageUrl: "https://upmarkt.in/storage/app/public/banner/2023-01-29-63d6129898c18.png", mainText: "Test", subText: "Test"}]
  return (
    <div>
        <MainCarousel props={{slides: slides}} />
    </div>
  )
}

export default TestPage