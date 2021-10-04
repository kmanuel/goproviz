import { createGpxFileFromVideo } from './video-to-gpx'
import { toGpsData } from './gpx-parse'

export async function createGps(inFile: string) {
  const gpxFilePath = await createGpxFileFromVideo(inFile)
  const gpsData = toGpsData(gpxFilePath)
  return gpsData
}
