import { useEffect, useRef, useState } from 'react'
import { toyService } from '../services/toy.service.js'
import Select from 'react-select'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function ToyFilter({ setFilterBy }) {
  const { t } = useTranslation()
  const [filterByToEdit, setFilterByToEdit] = useState(
    toyService.getDefaultFilter()
  )

  const labels = toyService.getLabels()

  useEffect(() => {
    setFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleTypeChange({ target }) {
    const { value, name: field, type, checked } = target

    setFilterByToEdit((prevFilter) => {
      if (type === 'checkbox') {
        return { ...prevFilter, [field]: checked }
      } else if (type === 'text') {
        return { ...prevFilter, name: value }
      } else {
        return prevFilter
      }
    })
  }

  // ...

  function handleSelectChange(selectedOption) {
    const selectedValue = selectedOption
      ? selectedOption.value.toLowerCase()
      : ''
    setFilterByToEdit((prevFilter) => {
      return { ...prevFilter, labels: selectedValue ? [selectedValue] : [] }
    })
  }

  // ...

  return (
    <section className="toy-filter">
      <div>
        <h2 className="filter-title"></h2>
        <input
          className="input-filter"
          type="text"
          name="name"
          placeholder={t('Enter-Text')}
          onChange={handleTypeChange}
        />
      </div>

      <div className="flex bottom-filter-container">
        <div>
          <label htmlFor="inStock">{t('inStock')}</label>
          <input
            type="checkbox"
            id="inStock"
            name="inStock"
            onChange={handleTypeChange}
          />
        </div>
        <div className="label-filter-container">
          <label htmlFor="labels">{t('Labels')}</label>
          <Select
            placeholder={t('select')}
            options={labels}
            name="labels"
            id="labels"
            onChange={handleSelectChange}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: '150px',
                minHeight: '20px',
                fontSize: '1rem',
              }),
            }}
          />
        </div>
      </div>
    </section>
  )
}
