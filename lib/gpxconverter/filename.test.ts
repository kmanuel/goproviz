import { getFileNameWithoutExt } from './filename'

describe('filename', () => {
  describe('getFileNameWithoutExt', () => {
    test('parses test.MP4', () => {
      expect(getFileNameWithoutExt('test.MP4')).toBe('test')
    })

    test('parses /foo/bar/test.mp3', () => {
      expect(getFileNameWithoutExt('/foo/bar/sound.mp3')).toBe('sound')
    })

    test('parses ../foo/thumb.THM', () => {
      expect(getFileNameWithoutExt('../foo/thumb.THM')).toBe('thumb')
    })
  })
})
