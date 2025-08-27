'use client'

import Card from "./components/card"
import { useState } from "react"

export default function Home() {

  const [objectLocation, setObjectLocation] = useState('A4')

  const cardsTitles = [
    'A1', 'A2', 'A3', 'A4',
    'B1', 'B2', 'B3', 'B4',
    'C1', 'C2', 'C3', 'C4',
    'D1', 'D2', 'D3', 'D4',
  ]

  const handleLocationChange = (newLocation) =>{
    setObjectLocation(newLocation)
  }

  const cardItems = cardsTitles.map((c, index) => {
    return (
      <div key={index} onClick={() => handleLocationChange(c)}>
        <Card title={c} isObjectHere={objectLocation === c} />
      </div>
    )
  })

  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="grid grid-cols-4 grid-rows-4 gap-2 justify-center items-center bg-gray-200 p-6 rounded-2xl">
        {cardItems}
      </div>
    </div>
  );
}
