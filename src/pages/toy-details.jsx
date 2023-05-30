import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service.js'
import { utilService } from '../services/util.service.js'
import { loadReviews, addReview, removeReview } from '../store/review.action'

import 'animate.css'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export function ToyDetails() {
  const { t } = useTranslation()
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.user)
  const [msg, setMsg] = useState(toyService.getEmptyMsg())

  useEffect(() => {
    console.log(toyId)
    loadToy()
  }, [])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      console.log(toy)
      setToy(toy)
    } catch (err) {
      console.log('Had issues in toy details', err)
      showErrorMsg('Cannot load toy')
      navigate('/toy')
    }
  }

  async function onAddReview(ev) {
    ev.preventDefault()
    const { review } = ev.target
    const content = review.value
    review.value = ''
    try {
      const savedReview = await addReview({
        content: content,
        aboutToyId: toyId,
      })
      await toyService.addToyReview(toyId, savedReview)
      loadToy()
      showSuccessMsg('Review added')
    } catch (err) {
      showErrorMsg('Review added')
    }
  }

  async function onRemoveReview(reviewId) {
    try {
      await removeReview(reviewId)
      await toyService.removeToyReview(toyId, reviewId)
      loadToy()
      showSuccessMsg(`Toy review deleted (id: ${reviewId})`)
    } catch (err) {
      showErrorMsg('Cannot delete toy review')
    }
  }

  function handleChange({ target }) {
    let { value, name: field } = target
    setMsg((prevMsg) => ({ ...prevMsg, [field]: value }))
  }

  async function onSaveMsg(ev) {
    ev.preventDefault()
    try {
      const savedMsg = await toyService.addToyMsg(toyId, msg)
      setToy((prevToy) => ({ ...prevToy, msgs: [...prevToy.msgs, savedMsg] }))
      showSuccessMsg('Msg saved!')
    } catch (err) {
      console.log('err', err)
      showErrorMsg('Cannot save Msg')
    }
  }

  return (
    <main className="">
      <article className="details-container animate__animated animate__fadeIn">
        {toy ? (
          <div className="toy-info">
            <p>Name: {toy.name}</p>
            <p>Price: {toy.price}$</p>
            <p>Labels: {toy.labels.toString()}</p>
            <p>{utilService.timeSince(toy.createdAt)}</p>
            <p>{toy.inStock}</p>
            {toy.imgUrl ? (
              <img className="details-toy-img" src={toy.imgUrl} alt="Toy" />
            ) : (
              <h2>Image unavailable</h2>
            )}
          </div>
        ) : (
          <h2>Loading...</h2>
        )}

        <form className="add-msg-form" onSubmit={onSaveMsg}>
          <label htmlFor="addMsg"></label>
          <input
            id="addMsg"
            type="text"
            name="txt"
            placeholder="Write a msg..."
            value={msg.txt}
            onChange={handleChange}
          />
          <button className="add-msg-btn">Add Msg</button>
        </form>
        {toy?.msgs?.length ? (
          <ul>
            <h2>Comments</h2>
            {toy.msgs.map((msg, index) => (
              <li key={index} className="toy-Msgs clean-list">
                {msg.by.fullname} : {msg.txt}
              </li>
            ))}
          </ul>
        ) : (
          <h2>No Comments</h2>
        )}

        <div>
          {user && (
            <div>
              <form
                onSubmit={onAddReview}
                className="add-review-form"
                id="review-form"
              >
                <textarea
                  placeholder="Write a review..."
                  name="review"
                  form="review-form"
                  className="review-input"
                ></textarea>
                <button className="add-review-btn">Add Review</button>
              </form>
            </div>
          )}
        </div>
        <Link className="animate__animated animate__fadeIn" to="/toy">
          Back to List
        </Link>
      </article>
    </main>
  )
}
