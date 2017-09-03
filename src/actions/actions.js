import * as types from './action-types'

export const calculateDistance = (coordinates1, coordinates2) => {
  function toRadians(x) {
    return x * Math.PI / 180
  }

  const lat1 = coordinates1.split(',')[0]
  const lon1 = coordinates1.split(',')[1].trim()
  const lat2 = coordinates2.split(',')[0]
  const lon2 = coordinates2.split(',')[1].trim()

  const earthRadius = 6371
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

  const result = {
    kilometers: Math.round((earthRadius * c) * 100) / 100,
    nauticalMiles: Math.round(((earthRadius * c) / 1.852) * 100) / 100,
  }

  return {
    data: result,
    type: types.CALCULATE_DISTANCE,
  }
}

export const selectLocation = (name, value) => {
  if (value === null) {
    return {
      direction: name,
      type: types.CLEAR_VALUES,
    }
  }

  return {
    data: value,
    direction: name,
    type: types.SELECT_LOCATION,
  }
}
