import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import getImageUrl from '../modules/utils.mjs'

export default function Songs() {
  const [songs, setSongs] = useState([])
  const [page, setPage] = useState(1)
  const params = useParams()
  const headers = ['Title', 'Artist', 'Count']

  // Lazy load songs
  const loadSongs = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/songs/${
          params.radioStationId
        }?page=${page}`
      )
      .then((res) => {
        setSongs(songs.concat(res.data.data))
        setPage(page + 1)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(loadSongs, [])

  // if (songs.length === 0) {
  //   return (
  //     <div className='bg-gray-100 max-w-2xl mx-auto h-56 flex rounded-lg'>
  //       <div className='m-auto'>
  //         <h1 className='text-2xl font-bold text-center mb-3'>
  //           Nothing here...
  //         </h1>
  //         <p>found songs will be displayed here</p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div>
      <div className='flex justify-center'>
        <a
          href='/'
          className='w-16 h-16 shadow-md rounded-lg overflow-hidden mr-4 hover:shadow-xl transition-all hover:scale-105'
        >
          <img alt='Radio Station' src={getImageUrl(params.radioStationId)} />
        </a>
        <input
          // onInput={this.findSong}
          className='transition-all rounded-lg py-5 px-12 shadow-lg outline-none dark:bg-gray-800 focus:shadow-xl hover:shadow-xl'
          style={{ width: 500 }}
          type='text'
          placeholder='Search for a song or artist...'
        />
      </div>
      <InfiniteScroll dataLength={songs.length} next={loadSongs} hasMore>
        <table className='mx-auto mt-12 mb-5'>
          <thead className='py-4'>
            <tr>
              {headers.map((header) => (
                <th className='py-4 px-5 text-ellipsis overflow-hidden whitespace-nowrap text-left last:text-center'>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id}>
                <td className='w-5/12 py-4 px-5 text-ellipsis overflow-hidden whitespace-nowrap'>
                  <a
                    href={`http://localhost:8080/youtube-link?search=${encodeURIComponent(
                      `${song.title} ${song.artist}`
                    )}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {song.title}
                  </a>
                </td>
                <td className='w-5/12 py-4 px-5 text-ellipsis overflow-hidden whitespace-nowrap'>
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      song.artist
                    )}`}
                  >
                    {song.artist}
                  </a>
                </td>
                <td className='w-2/12 text-center'>
                  <span className='bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                    {song.count}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  )
}
