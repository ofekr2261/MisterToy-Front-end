import { httpService } from './http.service'

export const reviewService = {
  add,
  query,
  remove,
}

function query(filterBy) {
  var queryStr = !filterBy
    ? ''
    : `?user=${filterBy.userId}&name=${filterBy.name}&sort=anaAref`
  return httpService.get(`review${queryStr}`)
}

async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
}

async function add({ content, aboutToyId }) {
  console.log('{content, aboutToyId}:', { content, aboutToyId })
  const addedReview = await httpService.post(`review`, { content, aboutToyId })

  return addedReview
}
