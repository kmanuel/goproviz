export interface GpxPoint {
  lat: number
  lon: number
  ele: number
  time: string
}

export interface GpxTrack {
  points: GpxPoint[]
}
