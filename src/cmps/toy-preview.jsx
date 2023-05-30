import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {
  return (
    <article>
      <Link to={`/toy/${toy._id}`}>
        <div className="preview-img-container">
          {toy.imgUrl ? (
            <img className="preview-img" src={toy.imgUrl} alt="Toy" />
          ) : (
            <h2>img unavailable</h2>
          )}
        </div>
      </Link>
      <Link to={`/toy/${toy._id}`}>
        <h3 className="toy-name">{toy.name}</h3>
      </Link>
      <p>{toy.labels.toString()}</p>
      <p>{toy.price}$</p>
      <p>{toy.inStock}</p>
    </article>
  )
}
