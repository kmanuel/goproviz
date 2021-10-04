import * as fs from 'fs'
import { TEMP_DIR } from './constants'
import { getFileNameWithoutExt } from './filename'
import { calculatePointsBounds } from './bounds'
import { readGpxTracks } from './gpx-file-parser'

export function toGpsData(gpxFile: string) {
  let gpsData = getCachedData(gpxFile)
  if (!gpsData) {
    gpsData = readGpxFile(gpxFile)
    saveTempJson(gpsData, gpxFile)
  }
  return gpsData
}

function getCachedData(gpxFile: string) {
  if (!existsJsonFile(gpxFile)) {
    return null
  }
  return parseJsonFile(gpxFile)
}

function existsJsonFile(gpxFile: string) {
  const jsonFilePath = toJsonFilePath(gpxFile)
  return fs.existsSync(jsonFilePath)
}

function toJsonFilePath(gpxFile: string): fs.PathLike {
  return `${TEMP_DIR}/${getFileNameWithoutExt(gpxFile)}.json`
}

function parseJsonFile(gpxFile: string) {
  const jsonFilePath = toJsonFilePath(gpxFile)
  const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8')
  return JSON.parse(jsonContent)
}

function readGpxFile(gpxFile: string) {
  const tracks = readGpxTracks(gpxFile)
  const firstTrack = tracks?.[0]
  const points = firstTrack.points
  const gpxBounds = calculatePointsBounds(points)
  const gpsData = { tracks, bounds: gpxBounds }
  return gpsData
}

async function saveTempJson(gpsData: any, gpxFile: string) {
  const jsonPath = toJsonFilePath(gpxFile)
  const gpsDataJson = JSON.stringify(gpsData)
  fs.writeFileSync(jsonPath, gpsDataJson)
}
