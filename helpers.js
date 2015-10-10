import _ from 'lodash'

/**
 * @param  {StringArray}
 * @return ['cape town', 'Western cape ', 'South Africa'] => Cape-Town--Western-Cape--South-Africa
 */
export function convertPlace (placeStrings) {
  return placeStrings.map((placeString) => {
    return _.map(placeString.trim().split(' '), _.capitalize).join('-')
  }).join('--')
}
