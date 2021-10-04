import { RideData, Track, TrackPoint } from '../types'
import { rideHasTrack } from './ride-util'

const SAMPLE_TRACK: Track = {
  bounds: {
    latMin: -1,
    latMax: -1,
    lonMin: -1,
    lonMax: -1,
  },
  points: [],
}

const SAMPLE_RIDE: RideData = {
  bounds: {
    latMin: -1,
    latMax: -1,
    lonMin: -1,
    lonMax: -1,
  },
  title: 'TestRide',
  tracks: [SAMPLE_TRACK],
  videoUrl: 'http://localhost:3000/SAMPLE.mp4',
}

function createRideWithPoints(points: TrackPoint[]): RideData {
  const ride: RideData = {
    ...SAMPLE_RIDE,
    tracks: [
      {
        ...SAMPLE_TRACK,
        points: points,
      },
    ],
  }
  return ride
}

describe('ride-utils', () => {
  describe('rideHasTrack', () => {
    test('detects when ride has no track points', () => {
      const ride: RideData = createRideWithPoints([])
      expect(rideHasTrack(ride)).toBe(false)
    })

    test('detects when ride has track points', () => {
      const ride: RideData = createRideWithPoints([
        { ele: 1, lat: 1, lon: 1, time: '0' },
      ])
      expect(rideHasTrack(ride)).toBe(true)
    })
  })
})
