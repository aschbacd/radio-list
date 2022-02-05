import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import './index.css'

// Pages
import RadioStations from './Pages/RadioStations'
import Songs from './Pages/Songs'

const rootElement = document.getElementById('root')
render(
  <div className='dark:bg-gray-900 dark:text-white min-h-screen'>
    <h1 className='py-20 text-center font-bold text-5xl'>RadioList</h1>
    <BrowserRouter>
      <Routes>
        {/* RadioStations */}
        <Route path='/' element={<RadioStations />} />
        {/* Songs */}
        <Route path='/songs/:radioStationId' element={<Songs />} />
        {/* Default route */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  </div>,
  rootElement
)
