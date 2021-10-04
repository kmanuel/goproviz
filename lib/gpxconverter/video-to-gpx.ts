import * as fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { TEMP_DIR } from './constants'
import { getFileNameWithoutExt } from './filename'

export async function createGpxFileFromVideo(videoPath: string) {
  ensureDir()
  if (existsGpxFile(videoPath)) {
    return gpxPathFor(videoPath)
  }
  const binFile = await extractGpsBin(videoPath)
  await sleep(1000)
  const gpxFilePath = await createGpx(binFile)
  fs.unlink(binFile, (err) => {
    if (err) {
      console.error(err)
    }
  })
  return gpxFilePath
}

function existsGpxFile(videoPath: string) {
  const expectedGpxPath = gpxPathFor(videoPath)
  return fs.existsSync(expectedGpxPath)
}

function gpxPathFor(otherFilePath: string) {
  return `${TEMP_DIR}/${getFileNameWithoutExt(otherFilePath)}.gpx`
}

function ensureDir() {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR)
  }
}

async function extractGpsBin(fromFile: string) {
  const fn = getFileNameWithoutExt(fromFile)
  const outFile = TEMP_DIR + '/' + fn + '.bin'
  execSync(
    `ffmpeg -y -i ${fromFile} -codec copy -map 0:3 -f rawvideo ${outFile}`,
    { stdio: 'pipe' }
  )
  return outFile
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function createGpx(binFile: string) {
  const gpxFile = gpxPathFor(binFile)
  const gopro = path.resolve('./bin/gopro')
  execSync(`${gopro} -i ${binFile} -o ${gpxFile}`)
  return gpxFile
}
