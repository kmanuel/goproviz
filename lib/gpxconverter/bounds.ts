export function calculatePointsBounds(points: { lat: number; lon: number }[]) {
  const gpxBounds = { latMin: -1, latMax: -1, lonMin: -1, lonMax: -1 }
  for (let point of points) {
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
