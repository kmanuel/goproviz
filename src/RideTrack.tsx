import React from 'react'
import { Polyline } from 'react-leaflet'

interface RideTrackProps {
  passedRef?: any
  track: any
  handleClick?: any
}

const RideTrack = ({ passedRef, track, handleClick }: RideTrackProps) => (
  <Polyline
    ref={passedRef}
    pathOptions={{ fillColor: 'red', color: 'blue' }}
    positions={track.points}
    eventHandlers={{
      click: handleClick,
    }}
  />
)

export default RideTrack
