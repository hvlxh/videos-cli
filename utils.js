/**
 * @param {string} separator
 * @param  {...string} strings
 * @returns {string}
 */
export const joiner = (separator, ...strings) => strings.length === 0 ? '' : strings.join(separator)

/**

 * @param {string} link
 * @returns {boolean}
 */
export const isLink = (link) => {
  if (!link) return false
  try {
    new URL(link)
    return true
  } catch (error) {
    if (error instanceof TypeError) {
      return false
    }
    throw error
  }
}

/**
 * @param {string} link
 * @returns {boolean}
 */
export const isYouTubeLink = (link) => {
  if (!link) return false

  try {
    const url = new URL(link)
    return url.hostname.includes('youtube.com')
  } catch (error) {
    if (error instanceof TypeError) {
      return false
    }
    throw error
  }
}
