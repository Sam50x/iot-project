'use client'

import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {

  const [distance, setDistance] = useState(null)

  const barWidth =
    distance !== null
      ? `${((50 - distance) / 50) * 100}%`
      : "0%"

  const getLastDistance = async () => {
    const { data, error } = await supabase
      .from("sensor_data")
      .select("distance")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching last distance:", error);
    } else if (data) {
      setDistance(data.distance);
    }
  };

  useEffect(() => {
    getLastDistance();

    const channel = supabase
      .channel("distance-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "sensor_data",
        },
        (payload) => {
          console.log("New row:", payload.new);
          setDistance(payload.new.distance);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="font-sans flex flex-col items-center justify-center w-full h-full">
      <div className="w-100 h-12 bg-gray-light flex justify-start items-start">
        <div className="h-12 bg-red flex justify-start items-start animate-pulse" style={{ width: barWidth }}>
        </div>
      </div>
      <h1 className="text-gray-light mt-6 font-bold">{distance || distance === 0? `Object on distance ${distance}cms` : 'No object detected'}</h1>
    </div>
  );
}
