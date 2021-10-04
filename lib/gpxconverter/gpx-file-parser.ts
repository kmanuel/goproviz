import * as fs from 'fs'
import gpxParser from 'gpxparser'

export function readGpxTracks(gpxFile: string) {
  const gpxData = fs.readFileSync(gpxFile, 'utf-8')
  const gpx = new gpxParser()
  gpx.parse(gpxData)
  const tracks = gpx.tracks.map((t) => ({ points: t.points }))
  return tracks
}
