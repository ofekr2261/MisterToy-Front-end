import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import { useTranslation } from 'react-i18next'

export function ToySort({ onSetSort }) {
  const { t } = useTranslation()
  const [currSort, setCurrSort] = useState(toyService.getDefaultSort())

  useEffect(() => {
    onSetSort(currSort)
  }, [currSort])

  function setSort(newSort) {
    const change = newSort === currSort.value ? -currSort.change : 1
    const sortBy = {
      value: newSort,
      change,
    }
    setCurrSort(sortBy)
  }

  return (
    <section className="sort-container">
      <button
        className="btn-sort"
        onClick={() => {
          setSort('name')
        }}
      >
        {t('Name')}
      </button>
      <button
        className="btn-sort"
        onClick={() => {
          setSort('createdAt')
        }}
      >
        {t('Created')}
      </button>
      <button
        className="btn-sort"
        onClick={() => {
          setSort('price')
        }}
      >
        {t('Price')}
      </button>
    </section>
  )
}
