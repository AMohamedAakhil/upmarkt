"use client"

import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/react-flicking/dist/flicking-inline.css";
import { useState } from "react";
import dynamic from "next/dynamic";
import { AutoPlay } from "@egjs/flicking-plugins";


export const Carousel =  () => {
    const [panels, setPanels] = useState([0, 1, 2, 3, 4]);
    const plugins = [new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: true })];

    return (
        <>
        <Flicking plugins={plugins} renderOnlyVisible={true}>
          {panels.map(index => <div className="flicking-panel w-full h-96 bg-blue-200 flex justify-center items-center" key={index}>
            <div className="flex justify-center items-center w-full h-full">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="7" r="1.5" stroke="#FFFFFF" stroke-linecap="round"/>
            <path d="M5.03652 17.5H15.9635C16.6107 17.5 16.99 16.7715 16.6189 16.2412L11.1554 8.43627C10.8369 7.98129 10.1631 7.98129 9.84461 8.43627L4.38114 16.2412C4.00998 16.7715 4.38931 17.5 5.03652 17.5Z" stroke="#FFFFFF" stroke-linecap="round"/>
            <path d="M10.5 17.5H19.0566C19.685 17.5 20.068 16.8088 19.735 16.276L16.1784 10.5854C15.8651 10.0841 15.1349 10.0841 14.8216 10.5854L13.8594 12.125" stroke="#FFFFFF" stroke-linecap="round"/>
            </svg>

            </div>
          </div>)}
        </Flicking>
      </>
    )

}