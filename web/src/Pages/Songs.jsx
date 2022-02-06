import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import getImageUrl from '../modules/utils.mjs'

export default function Songs() {
  const [songs, setSongs] = useState([])
  const [page, setPage] = useState(1)
  const [apiPath, setApiPath] = useState('')

  const params = useParams()
  const headers = ['Title', 'Artist', 'Count']

  // Lazy load songs
  const loadSongs = (override) => {
    // Set url
    const url = new URL(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/api/songs/${
        params.radioStationId
      }${apiPath}`,
      window.location
    )
    url.searchParams.set('page', page)

    // Get songs
    axios
      .get(url)
      .then((res) => {
        if (override) {
          setSongs(res.data.data)
        } else {
          setSongs(songs.concat(res.data.data))
        }
        setPage(page + 1)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const findSongs = (event) => {
    // Reset page when searching
    setPage(1)

    // Set api path
    const search = event.target.value
    if (search !== '') {
      setApiPath(`/find?search=${encodeURIComponent(search)}`)
    } else {
      setApiPath('')
    }
  }

  useEffect(() => {
    loadSongs(true)
  }, [apiPath])

  return (
    <div className='pb-6'>
      <div className='flex justify-center'>
        <a
          href='/'
          className='w-16 h-16 shadow-md rounded-lg overflow-hidden mr-4 hover:shadow-xl transition-all hover:scale-105'
        >
          <img alt='Radio Station' src={getImageUrl(params.radioStationId)} />
        </a>
        <input
          onInput={findSongs}
          className='w-60 xs:w-80 sm:w-96 transition-all rounded-lg py-5 px-12 shadow-lg outline-none dark:bg-gray-800 focus:shadow-xl hover:shadow-xl'
          type='text'
          placeholder='Search for a song or artist...'
        />
      </div>
      {songs.length > 0 ? (
        <InfiniteScroll dataLength={songs.length} next={loadSongs} hasMore>
          <table className='mx-auto mt-12'>
            <thead className='py-4'>
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className='py-4 px-5 text-ellipsis overflow-hidden whitespace-nowrap text-left last:text-center'
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr key={song.id}>
                  <td className='w-80 max-w-xs py-4 px-5 text-ellipsis overflow-hidden whitespace-nowrap'>
                    <a
                      href={`${
                        import.meta.env.VITE_BACKEND_BASE_URL
                      }/youtube-link?search=${encodeURIComponent(
                        `${song.title} ${song.artist}`
                      )}`}
                      target='_blank'
                      rel='noreferrer'
                      title={song.title}
                    >
                      {song.title}
                    </a>
                  </td>
                  <td className='w-80 max-w-xs py-4 px-5 text-ellipsis overflow-hidden whitespace-nowrap'>
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                        song.artist
                      )}`}
                      target='_blank'
                      rel='noreferrer'
                      title={song.artist}
                    >
                      {song.artist}
                    </a>
                  </td>
                  <td className='w-20	text-center'>
                    <span className='bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                      {song.count}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </InfiniteScroll>
      ) : (
        <div className='bg-gray-100 max-w-2xl mx-auto h-56 flex rounded-lg mt-12 dark:bg-gray-800'>
          <div className='m-auto'>
            <h1 className='text-2xl font-bold text-center mb-4'>
              Nothing here...
            </h1>
            <p>found songs will be displayed here</p>
          </div>
        </div>
      )}
    </div>
  )
}
