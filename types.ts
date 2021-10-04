export interface TrackPoint {
  lat: number
  lon: number
  ele: number
  time: string
}

export interface TrackBounds {
  latMin: number
  latMax: number
  lonMin: number
  lonMax: number
}

export interface Track {
  points: TrackPoint[]
  bounds: TrackBounds
}

export interface Bounds {
  latMin: number
  latMax: number
  lonMin: number
  lonMax: number
}

export interface RideData {
  title: string
  videoUrl: string
  tracks: Track[]
  bounds: Bounds
}

export interface GpxPoint {
  lat: number
  lon: number
  ele: number
  time: string
}

export interface GpxTrack {
  points: GpxPoint[]
}

export interface RideEntry {
  title: string
  videoFile: string
  thumbnail: string
  created: number
}

export interface RideEntryMap {
  [key: string]: RideEntry
}
