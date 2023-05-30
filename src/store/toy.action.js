import { toyService } from '../services/toy.service.js'
import { store } from './store.js'
import {
  SET_TOYS,
  ADD_TOY,
  UPDATE_TOY,
  REMOVE_TOY,
  SET_FILTER,
  SET_IS_LOADING,
  SET_SORT,
} from './toy.reducer.js'

export async function loadToys(filterBy, sortBy) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })

  try {
    const toys = await toyService.query(filterBy, sortBy)
    store.dispatch({ type: SET_TOYS, toys })
  } catch (err) {
    console.log('Had issues loading toys', err)
    throw err
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

export async function removeToy(toy) {
  const toyId = toy._id

  try {
    await toyService.remove(toyId)
    store.dispatch({ type: REMOVE_TOY, toyId })
  } catch (err) {
    console.log('Had issues Removing toy', err)
    throw err
  }
}

export function setFilter(filterBy) {
  store.dispatch({ type: SET_FILTER, filterBy })
}

export function setSort(sortBy) {
  store.dispatch({ type: SET_SORT, sortBy })
}

export async function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY

  try {
    const savedToy = await toyService.save(toy)
    store.dispatch({ type: type, toy: savedToy })
    return savedToy
  } catch (err) {
    console.error('Cannot save toy:', err)
    throw err
  }
}
