import React from 'react'
import { useTranslation } from 'react-i18next'

function LanguageSelector() {
  const { i18n } = useTranslation()

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <div>
      <select onChange={changeLanguage}>
        <option value="en">English</option>
        <option value="he">Hebrew</option>
      </select>
    </div>
  )
}

export default LanguageSelector
