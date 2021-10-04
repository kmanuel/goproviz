import * as fs from 'fs'
import { RideData, RideEntryMap } from '../types'
import { createGps } from './gpxconverter/video-processor'

const RIDES_DIR = process.env.VIDEO_DIR

export const getRidesWithData = async () => {
  const dir = RIDES_DIR
  return await getRidesWithDataFrom(dir)
}

export async function getRidesWithDataFrom(dir: string) {
  const fileInRidesDir = fs.readdirSync(dir)
  const rides = toRidesEntryMap(fileInRidesDir)
  const allRides = await toRidesListWithRideData(rides)
  return allRides
}

export async function getRidesFrom(dir: string) {
  const fileInRidesDir = fs.readdirSync(dir)
  const rides = toRidesEntryMap(fileInRidesDir)
  const ridesList = toList(rides)
  return ridesList
}

function toList(rides: RideEntryMap) {
  let rideList = []
  for (let ride of Object.keys(rides)) {
    rideList.push(rides[ride])
  }
  return rideList
}

function toRidesEntryMap(fileInRidesDir: string[]) {
  return fileInRidesDir.reduce<RideEntryMap>((acc, d) => {
    const videoOrThumbnail = isVideo(d) || isThumbnail(d)
    if (videoOrThumbnail) {
      const name = d.split('.')[0]
      if (!acc[name]) {
        acc[name] = {
          title: name,
          videoFile: '',
          thumbnail: '',
          created: 0,
        }
      }
      if (isVideo(d)) {
        acc[name].videoFile = d
        const created = fs.statSync(`${RIDES_DIR}/${d}`).birthtime.getTime()
        acc[name].created = created
      }
      if (d.endsWith('.THM')) {
        acc[name].thumbnail = d
      }
    }
    return acc
  }, {})
}

function isVideo(d: string) {
  return d.toLowerCase().endsWith('.mp4')
}

function isThumbnail(d: string): boolean {
  return d.toLowerCase().endsWith('.thm')
}

async function toRidesListWithRideData(rides: RideEntryMap) {
  let rideList = []
  for (let entry of Object.keys(rides)) {
    rideList.push(rides[entry])
  }
  const allRideData = rideList.map(async (r) => {
    const data = await getRideData(r.title)
    return {
      ...r,
      ...data,
    }
  })
  const allRides = await Promise.all(allRideData)
  return allRides
}

export const getRideData = async (rideId: string): Promise<RideData> => {
  const gps = await createGps(`${RIDES_DIR}/${rideId}.MP4`)
  const json = JSON.stringify({
    title: rideId,
    videoUrl: `http://localhost:8080/${rideId}`,
    ...gps,
  })
  return JSON.parse(json)
}
