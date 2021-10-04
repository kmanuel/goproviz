import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { RideData } from '../lib/videos'
import RideTrack from './RideTrack'

interface RidesProps {
  rides: RideData[]
}

const Rides = ({ rides }: RidesProps) => {
  const router = useRouter()

  if (typeof window === 'undefined') {
    return null
  }

  function handleMapCreated(map: any): void {
    const absoluteBounds = getAbsoluteBounds(rides)
    map.fitBounds(absoluteBounds)
  }

  function handleTrackClick(ev: any, rideData: RideData) {
    router.push(`/videos/${rideData.title}`)
  }

  return (
    <div style={{ height: '700px', width: '100%' }}>
      <MapContainer
        style={{ width: '100%', height: '100%' }}
        whenCreated={(map) => handleMapCreated(map)}
        zoom={3}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {rides.map(
          (r, idx) =>
            r.tracks?.[0] && (
              <RideTrack
                key={idx}
                track={r.tracks[0]}
                handleClick={(ev: any) => handleTrackClick(ev, r)}
              />
            )
        )}
      </MapContainer>
    </div>
  )
}
export default Rides
function getAbsoluteBounds(rides: RideData[]) {
  const bounds = rides.map((t) => t.bounds)
  const absoluteBounds = bounds.reduce(
    (acc, bounds) => {
      if (
        !bounds ||
        bounds.latMax === -1 ||
        bounds.latMin === -1 ||
        bounds.lonMax === -1 ||
        bounds.lonMin === -1
      ) {
        return acc
      }
      acc.latMin = Math.min(acc.latMin, bounds.latMin)
      acc.latMax = Math.max(acc.latMax, bounds.latMax)
      acc.lonMin = Math.min(acc.lonMin, bounds.lonMin)
      acc.lonMax = Math.max(acc.lonMax, bounds.lonMax)
      return acc
    },
    { latMax: -180, latMin: 180, lonMin: 180, lonMax: -180 }
  )

  return [
    [absoluteBounds.latMin, absoluteBounds.lonMin],
    [absoluteBounds.latMax, absoluteBounds.lonMax],
  ]
}
