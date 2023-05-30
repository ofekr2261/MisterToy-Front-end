import './assets/style/main.scss'

import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AppHeader } from './cmps/app-header'
import { HomePage } from './pages/home-page'
import { AboutUs } from './pages/about-us'
import { Login } from './pages/login'
import { Dashboard } from './pages/dashboard'
import { ToyIndex } from './pages/toy-index'
import { ToyEdit } from './cmps/toy-edit'
import { store } from './store/store'
import { ToyDetails } from './pages/toy-details'
import { I18nextProvider } from 'react-i18next'
import i18n from './services/i18.service'
import { AppFooter } from './cmps/app-footer'
import { ReviewApp } from './pages/review-app'
import { UserDetails } from './pages/user-details'

export default function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router>
          <section className="main-layout app">
            <AppHeader />
            <main className="app-main-container full main-layout">
              <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<AboutUs />} path="/about" />
                <Route element={<Login />} path="/login" />
                <Route element={<Dashboard />} path="/dashboard" />
                <Route element={<ReviewApp />} path="/review" />
                <Route element={<ToyIndex />} path="/toy">
                  <Route element={<ToyEdit />} path="/toy/edit" />
                  <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                </Route>

                <Route element={<ToyDetails />} path="/toy/:toyId" />
                <Route element={<UserDetails />} path="/user" />
              </Routes>
            </main>
            <AppFooter />
          </section>
        </Router>
      </I18nextProvider>
    </Provider>
  )
}
