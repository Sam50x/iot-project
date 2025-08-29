'use client'

import { useState } from "react"

export default function Home() {

  const [distance, setDistance] = useState(null)

  const barWidth =
    distance !== null || distance >= 50
      ? `${((50 - distance) / 50) * 100}%`
      : "0%"

  return (
    <div className="font-sans flex flex-col items-center justify-center w-full h-full">
      <div className="w-100 h-12 bg-gray-light flex justify-start items-start">
        <div className="h-12 bg-red flex justify-start items-start animate-pulse" style={{ width: barWidth }}>
        </div>
      </div>
      <h1 className="text-gray-light mt-6 font-bold">{(distance || distance === 0) && distance <= 50 ? `Object on distance ${distance}cms` : 'No object detected'}</h1>
    </div>
  );
}
