export function getFileNameWithoutExt(fromFile: string) {
  let fileName = null
  if (fromFile.includes('/')) {
    const split = fromFile.split('/')
    fileName = split[split.length - 1]
  } else {
    fileName = fromFile
  }
  const nameWithoutExt = fileName.split('.')[0]
  return nameWithoutExt
}
