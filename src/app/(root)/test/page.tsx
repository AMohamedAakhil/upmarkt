import { MainCarousel } from '@/components/main-store-components/carousel'
import React from 'react'

const TestPage = () => {
  const slides = [{imageUrl: "https://via.placeholder.com/150", mainText: "Test", subText: "Test"}, {imageUrl: "https://via.placeholder.com/150", mainText: "Test", subText: "Test"}]
  return (
    <div>
        <MainCarousel props={{slides: slides}} />
    </div>
  )
}

export default TestPage