import { RideData } from '../types'

export function rideHasTrack(ride: RideData) {
  const track = ride.tracks?.[0]
  const pointCount = track.points?.length || 0
  return pointCount > 0
}
