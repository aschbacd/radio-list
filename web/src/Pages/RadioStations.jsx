import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getImageUrl from '../modules/utils.mjs'

export default function RadioStations() {
  const [radioStations, setRadioStations] = useState([])

  // Get all radio stations
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/radio-stations`)
      .then((res) => {
        setRadioStations(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className='flex justify-center'>
      <div>
        <h2 className='font-bold text-2xl mb-4'>Select radio station:</h2>
        <div className='inline-grid gap-5 grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'>
          {radioStations.map((radioStation) => (
            <a
              key={radioStation.id}
              href={`/songs/${radioStation.id}`}
              className='bg-white dark:bg-gray-800 p-3 w-32 rounded-lg shadow-lg hover:scale-105 transition-all'
            >
              <img
                alt={radioStation.name}
                src={getImageUrl(radioStation.id)}
                className='rounded-lg'
              />
              <p className='text-ellipsis overflow-hidden whitespace-nowrap font-bold text-center mt-2'>
                {radioStation.name}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
