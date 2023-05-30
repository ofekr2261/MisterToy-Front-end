import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import i18n from 'i18next'
const BASE_URL = 'toy/'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getLabels,
  getDefaultSort,
  getToysInStock,
  getFilteredToysByLabel,
  getPriceMap,
  addToyMsg,
  removeToyMsg,
  getEmptyMsg,
}

function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
  const queryParams = `?name=${filterBy.name}&labels=${filterBy.labels.join(
    ','
  )}&inStock=${filterBy.inStock}&pageIdx=${filterBy.pageIdx}&sortByVal=${
    sortBy.value
  }&sortByChange=${sortBy.change}`

  return httpService.get(BASE_URL + queryParams)
}

async function getById(toyId) {
  try {
    const toy = await httpService.get(BASE_URL + toyId)
    return { ...toy, smsg: 'Very good Product!!!' }
  } catch (err) {
    throw new Error('cant get toy', err)
  }
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}
function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy)
  } else {
    return httpService.post(BASE_URL, toy)
  }
}

function getEmptyToy() {
  const randomNum = utilService.getRandomIntInclusive(1, 13)
  const imgUrl = `${randomNum}.png`
  return {
    name: '',
    price: 0,
    labels: [],
    createdAt: Date.now(),
    inStock: true,
    imgUrl: imgUrl,
    msgs: [],
  }
}

async function addToyMsg(toyId, msg) {
  try {
    const savedMsg = await httpService.post(`toy/${toyId}/msg`, { msg })
    return savedMsg
  } catch (err) {
    console.log('couldnt add toy msg:', err)
  }
}

async function removeToyMsg(toyId, msgId) {
  try {
    const savedMsg = await httpService.delete(`toy/${toyId}/msg/${msgId}`)
    return savedMsg
  } catch (err) {
    console.log('couldnt remove toy msg:', err)
  }
}
function getEmptyMsg() {
  return {
    id: utilService.makeId(),
    txt: '',
  }
}

function getDefaultFilter() {
  return { name: '', pageIdx: 0, labels: [] }
}

function getDefaultSort() {
  return { value: 'name', change: 1 }
}

function getToysInStock() {
  let filter = getDefaultFilter()
  filter.inStock = true
  return query(filter)
}

function getFilteredToysByLabel(toys) {
  const labels = [
    { name: 'on-wheels', count: 0 },
    { name: 'box-game', count: 0 },
    { name: 'art', count: 0 },
    { name: 'baby', count: 0 },
    { name: 'doll', count: 0 },
    { name: 'puzzle', count: 0 },
    { name: 'outdoor', count: 0 },
    { name: 'battery-powered', count: 0 },
  ]

  toys.map((toy) => {
    labels.map((label) => {
      if (toy.labels.map((l) => l.toLowerCase()).includes(label.name))
        label.count++
    })
  })

  const countedLabels = []
  labels.map((label) => countedLabels.push(label.count))
  return countedLabels
}

function getLabels() {
  return [
    { value: '', label: i18n.t('---Labels---') },
    { value: 'on-wheels', label: i18n.t('on-wheels') },
    { value: 'box-game', label: i18n.t('box-game') },
    { value: 'art', label: i18n.t('art') },
    { value: 'baby', label: i18n.t('baby') },
    { value: 'doll', label: i18n.t('doll') },
    { value: 'puzzle', label: i18n.t('puzzle') },
    { value: 'outdoor', label: i18n.t('outdoor') },
    { value: 'battery-powered', label: i18n.t('battery-powered') },
  ]
}

function getPriceMap(toys) {
  const priceMap = toys.reduce((acc, toy) => {
    if (toy.labels?.length) {
      toy.labels.map((label) => {
        if (!acc[label]) acc[label] = []
        acc[label].push(toy.price)
      })
    }
    return acc
  }, {})
  return priceMap
}
