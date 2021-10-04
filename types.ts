export interface Point {
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
  points: Point[]
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
