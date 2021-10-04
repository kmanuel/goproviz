import { getRidesFrom } from './videos-reader'

describe('videos', () => {
  describe('getRidesFrom', () => {
    test('findsRide', async () => {
      const rides = await getRidesFrom('./sample_files/')
      expect(rides).toEqual([
        {
          title: 'mp4sample',
          videoFile: 'mp4sample.MP4',
          thumbnail: 'mp4sample.THM',
          created: 1633362844182,
        },
      ])
    })
  })
})
