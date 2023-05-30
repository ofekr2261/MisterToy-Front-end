import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select'
import { loadToys, saveToy } from '../store/toy.action.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service.js'
import { utilService } from '../services/util.service.js'
import { uploadService } from '../services/upload.service.js'

export function ToyEdit() {
  const navigate = useNavigate()
  const [editedToy, setEditedToy] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()

  useEffect(() => {
    if (toyId) {
      loadToy()
    }
  }, [toyId])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setEditedToy(toy)
    } catch (err) {
      console.error('Had issues in toy details', err)
    }
  }

  async function handleChange(ev) {
    let { value, type, name: field, checked } = ev.target
    value = type === 'number' ? +value : value
    value = type === 'checkbox' ? checked : value

    if (type === 'file') {
      const url = await uploadService.uploadImg(ev)
      field = 'imgUrl'
      value = url
    }

    setEditedToy((prevToy) => {
      return { ...prevToy, [field]: value }
    })
  }

  function handleSelectChange(pickedLabels) {
    setEditedToy((prevToy) => {
      prevToy.labels = pickedLabels.map((label) => label.value)
      return { ...prevToy, labels: prevToy.labels }
    })
  }

  async function handleSaveToy(ev) {
    ev.preventDefault()
    navigate('/toy')

    if (toyId) {
      await updateToy(editedToy)
    } else {
      await addNewToy(editedToy)
    }
  }

  async function updateToy(toyToSave) {
    if (!toyToSave.imgUrl)
      toyToSave.imgUrl = `${utilService.getRandomIntInclusive(1, 12)}.png`
    try {
      const savedToy = await saveToy(toyToSave)
      showSuccessMsg(`Toy edited (id: ${savedToy._id})`)
      loadToys()
    } catch (err) {
      showErrorMsg('Cannot edit toy')
    }
  }

  async function addNewToy(toyToSave) {
    if (!toyToSave.imgUrl)
      toyToSave.imgUrl = `${utilService.getRandomIntInclusive(1, 12)}.png`
    try {
      const savedToy = await saveToy(toyToSave)
      showSuccessMsg(`New toy added (id: ${savedToy._id})`)
      loadToys()
    } catch (err) {
      showErrorMsg('Cannot add new toy')
    }
  }

  const labels = toyService.getLabels()

  const pageTitle = toyId ? 'Edit Toy' : 'Add New Toy'

  return (
    <section className="add-toy">
      <div className="flex space-between">
        <h2 className="add-toy-title">{pageTitle}</h2>
        <Link to="/toy">
          <span className="material-symbols-outlined icon">close</span>
        </Link>
      </div>
      <form onSubmit={handleSaveToy} className="add-toy-form">
        <div className="add-input-container">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter name..."
            value={editedToy.name}
            onChange={handleChange}
          />
        </div>
        <label>
          {' '}
          Upload your image to cloudinary!
          <input onChange={handleChange} type="file" />
        </label>
        <div className="add-input-container">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            name="price"
            id="price"
            value={editedToy.price}
            onChange={handleChange}
            placeholder="Enter price..."
          />
        </div>

        <div className="add-input-container">
          <label htmlFor="labels">Labels:</label>
          <Select
            isMulti
            options={labels}
            name="labels"
            id="labels"
            onChange={handleSelectChange}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                width: '210px',
                minHeight: '20px',
                fontSize: '1rem',
                margin: '0',
              }),
            }}
          />
        </div>

        <div className="add-input-container inStock-container">
          <label htmlFor="inStock">In Stock</label>
          <input
            type="checkbox"
            id="inStock"
            name="inStock"
            checked={editedToy.inStock}
            onChange={handleChange}
          />
        </div>

        <button className="add-toy-btn">Save</button>
      </form>
    </section>
  )
}
