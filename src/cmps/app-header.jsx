import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import 'animate.css'
import logoImg from '../assets/img/logo_2.png'
import toyImg from '../assets/img/toy-shop.png'
import mapImg from '../assets/img/map.png'
import chartImg from '../assets/img/chart.png'
import homeImg from '../assets/img/home-background.jpg'
import { useSelector } from 'react-redux'
import LanguageSelector from './language-selector'
import { useTranslation } from 'react-i18next'

export function AppHeader() {
  const [isClicked, setIsClicked] = useState(false)
  const user = useSelector((storeState) => storeState.userModule.user)
  const { t } = useTranslation()

  return (
    <header className="app-header full main-layout">
      <Link
        to="/"
        className="app-header-logo"
        onClick={() => setIsClicked(false)}
      >
        <h3>
          <img className="logo" src={logoImg} alt="logo" />
        </h3>
      </Link>

      <LanguageSelector />

      <Link to="/login">
        <div className="header-profile-container">
          <span className="material-symbols-outlined profile-img">
            account_circle
          </span>
          {user ? (
            <h4 className="username-header">{user.fullname}</h4>
          ) : (
            <h4 className="username-header">{t('Login')}</h4>
          )}
        </div>
      </Link>

      <nav>
        <NavLink to="/">{t('Home')}</NavLink>
        <NavLink to="/toy">{t('Toys')}</NavLink>
        <NavLink to="/about">{t('About')}</NavLink>
        <NavLink to="/review">{t('Review')}</NavLink>
        <NavLink to="/dashboard">{t('Dashboard')}</NavLink>
      </nav>

      <span
        onClick={() => setIsClicked(!isClicked)}
        className="material-symbols-outlined menu-btn"
      >
        menu
      </span>
      {isClicked && (
        <div className="header-modal animate__animated animate__fadeInDown">
          <NavLink onClick={() => setIsClicked(!isClicked)} to="/toy">
            <img src={toyImg} />
          </NavLink>
          <NavLink onClick={() => setIsClicked(!isClicked)} to="/">
            <img src={homeImg} />
          </NavLink>
          <NavLink onClick={() => setIsClicked(!isClicked)} to="/dashboard">
            <img src={chartImg} />
          </NavLink>
          <NavLink onClick={() => setIsClicked(!isClicked)} to="/about">
            <img src={mapImg} />
          </NavLink>
        </div>
      )}
    </header>
  )
}
