import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { loadReviews, removeReview } from '../store/review.action'

export function ReviewApp() {
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)

  useEffect(() => {
    loadReviews()
  }, [])

  const onRemove = async (reviewId) => {
    try {
      await removeReview(reviewId)
      showSuccessMsg('Review removed')
    } catch (err) {
      showErrorMsg('Cannot remove')
    }
  }

  function canRemove(review) {
    return review.byUser._id === loggedInUser?._id || loggedInUser?.isAdmin
  }

  return (
    <div className="review-app animate__animated animate__fadeIn">
      <h1>Reviews</h1>
      {reviews && (
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review._id}>
              {canRemove(review) && (
                <button onClick={() => onRemove(review._id)}>X</button>
              )}

              <p>
                About:
                <Link to={`/toy/${review.aboutToy._id}`}>
                  {review.aboutToy.name}
                </Link>
              </p>
              <Link to={`/toy/${review.aboutToy._id}`}>
                <img
                  className="details-toy-img"
                  src={review.aboutToy.imgUrl}
                  alt="Toy"
                />
              </Link>
              <p>Toy Price: {review.aboutToy.price}$</p>
              <h3>{review.content}</h3>
              <p>By: {review.byUser.fullname}</p>
            </li>
          ))}
        </ul>
      )}
      <hr />
    </div>
  )
}
