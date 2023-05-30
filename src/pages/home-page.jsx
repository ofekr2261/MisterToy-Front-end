import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import 'animate.css'

import toyImg from '../assets/img/toy-shop.png'
import mapImg from '../assets/img/map.png'
import chartImg from '../assets/img/chart.png'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <section className="home flex column full">
      <h2 className="home-title animate__animated animate__backInDown">
        {t('message')}
      </h2>

      <div className="home-img-container flex animate__animated animate__backInUp">
        {/* <Link to="/">
          <img src={homeImg} />
        </Link> */}
        <Link to="/toy">
          <img src={toyImg} />
        </Link>
        <Link to="/dashboard">
          <img src={chartImg} />
        </Link>
        <Link to="/about">
          <img src={mapImg} />
        </Link>
      </div>
    </section>
  )
}
