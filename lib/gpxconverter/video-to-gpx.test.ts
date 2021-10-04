import { createGpxFileFromVideo } from './video-to-gpx'
import * as fs from 'fs'

describe('video-to-gpx', () => {
  describe('createGpxFileFromVideo', () => {
    test('creates gpx from video', async () => {
      const filePath = await createGpxFileFromVideo(
        './sample_files/mp4sample.MP4'
      )
      expect(fs.existsSync(filePath)).toBeTruthy()
      fs.unlinkSync(filePath)
    })
  })
})
