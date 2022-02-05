// getImageUrl returns the image url for a given radio station
export function getImageUrl(name) {
  return new URL(`../../assets/images/${name}.png`, import.meta.url).href
}

export default getImageUrl
