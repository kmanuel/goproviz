import { calculatePointsBounds } from './bounds'

describe('bounds', () => {
  describe('calculatePointsBounds', () => {
    test('calculates bounds', () => {
      const bounds = calculatePointsBounds([
        { lat: 1, lon: 3 },
        { lat: 5, lon: 3 },
        { lat: 4, lon: 2 },
        { lat: 1, lon: 4 },
      ])
      expect(bounds).toEqual({
        latMin: 1,
        latMax: 5,
        lonMin: 2,
        lonMax: 4,
      })
    })
  })
})
