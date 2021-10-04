import * as fs from 'fs'
import gpxParser from 'gpxparser'
import { TEMP_DIR } from './constants'
import { getFileNameWithoutExt } from './filename'

export function toGpsData(gpxFile: string) {
  if (existsJsonFile(gpxFile)) {
    return parseJsonFile(gpxFile)
  }
  const gpsData = readGpxFile(gpxFile)
  saveTempJson(gpsData, gpxFile)
  return gpsData
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
  const gpxData = fs.readFileSync(gpxFile, 'utf-8')
  const gpx = new gpxParser()
  gpx.parse(gpxData)
  const gpxBounds = calculateGpxBounds(gpx)
  const tracks = gpx.tracks.map((t: any) => ({ points: t.points }))
  const gpsData = { tracks, bounds: gpxBounds }
  return gpsData
}

function calculateGpxBounds(gpx: gpxParser) {
  const gpxBounds = { latMin: -1, latMax: -1, lonMin: -1, lonMax: -1 }
  for (let point of gpx.tracks[0].points) {
    const { lat, lon } = point
    if (lat < gpxBounds.latMin || gpxBounds.latMin === -1) {
      gpxBounds.latMin = lat
    }
    if (lat > gpxBounds.latMax) {
      gpxBounds.latMax = lat
    }
    if (lon < gpxBounds.lonMin || gpxBounds.lonMin === -1) {
      gpxBounds.lonMin = lon
    }
    if (lon > gpxBounds.lonMax) {
      gpxBounds.lonMax = lon
    }
  }
  return gpxBounds
}

async function saveTempJson(gpsData: any, gpxFile: string) {
  const jsonPath = toJsonFilePath(gpxFile)
  const gpsDataJson = JSON.stringify(gpsData)
  fs.writeFileSync(jsonPath, gpsDataJson)
}
