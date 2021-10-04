import * as L from 'leaflet'
import React, { useRef } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { RideData } from '../types'
import RideTrack from './RideTrack'

interface CleanTrackProps {
  ride: RideData
  agentProgressSeconds?: number
}

function getAgentProgress(
  startDateString: string,
  agentProgressSeconds: number
) {
  const agentPositionTime = startDateString.replace(/\.\d{3}Z/, '.000Z')
  const pos = new Date(agentPositionTime)
  pos.setSeconds(pos.getSeconds() + agentProgressSeconds)
  return pos.toISOString()
}

const RideMap = ({ ride, agentProgressSeconds = 0 }: CleanTrackProps) => {
  const lineRef = useRef<any>(null)
  if (typeof window === 'undefined') {
    return null
  }
  const track = ride.tracks?.[0]
  const pointCount = track.points?.length || 0
  if (pointCount <= 0) {
    return null
  }
  const agentPositionTime = getAgentProgress(
    track.points[0].time,
    agentProgressSeconds
  )
  const agentPosition =
    track.points.find((el) => el.time >= agentPositionTime) ||
    track.points[track.points.length - 1]
  const AgentMarker = () => (
    <Marker
      position={[agentPosition.lat, agentPosition.lon]}
      icon={L.icon({
        iconSize: [16, 24],
        iconAnchor: [8, 24],
        iconUrl: '/images/marker.png',
      })}
    />
  )

  const key = ride.title

  const handleMapCreated = (map: any) => {
    if (!lineRef.current) {
      return
    }
    map.fitBounds(lineRef.current.getBounds(), { padding: [30, 30] })
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        whenCreated={(map) => handleMapCreated(map)}
        key={key}
        style={{ width: '100%', height: '100%' }}
        center={[agentPosition.lat, agentPosition.lon]}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RideTrack passedRef={lineRef} track={track} />
        <AgentMarker />
      </MapContainer>
    </div>
  )
}
export default RideMap
