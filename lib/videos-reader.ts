import * as fs from 'fs'
import { RideEntryMap } from '../types'

export async function getRidesFrom(dir: string) {
  const fileInRidesDir = fs.readdirSync(dir)
  const rides = toRidesEntryMap(fileInRidesDir, dir)
  const ridesList = toList(rides)
  return ridesList
}

function toRidesEntryMap(fileInRidesDir: string[], dir: string) {
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
        const created = fs.statSync(`${dir}/${d}`).birthtime.getTime()
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

function toList(rides: RideEntryMap) {
  let rideList = []
  for (let ride of Object.keys(rides)) {
    rideList.push(rides[ride])
  }
  return rideList
}
