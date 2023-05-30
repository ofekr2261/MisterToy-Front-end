import { Outlet, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { ToySort } from '../cmps/toy-sort.jsx'
import { loadToys, removeToy, setFilter, setSort } from '../store/toy.action.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import 'animate.css'
import { useTranslation } from 'react-i18next'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const user = useSelector((storeState) => storeState.userModule.user)
  const { t } = useTranslation()

  useEffect(() => {
    loadToys(filterBy, sortBy)
  }, [filterBy, sortBy])

  function setFilterBy(filterBy) {
    setFilter(filterBy)
  }

  function onSetSort(sortBy) {
    setSort(sortBy)
  }

  function onNavPage(val) {
    let newPage = filterBy.pageIdx + val
    if (newPage < 0) return
    let newFilter = { ...filterBy, pageIdx: newPage }
    setFilter(newFilter)
  }

  async function onRemoveToy(toy) {
    try {
      await removeToy(toy)
      showSuccessMsg('Toy removed')
    } catch (err) {
      showErrorMsg('Cannot remove toy')
    }
  }

  return (
    <section className="toy-index animate__animated animate__fadeIn">
      <h1 className="toy-index-title">{t('My-Toys')}</h1>
      <main className="index-container">
        <div className="toy-actions-container">
          <ToyFilter setFilterBy={setFilterBy} />
          <ToySort onSetSort={onSetSort} />
          <div className="add-toy-container">
            <Link to="/toy/edit" className="add-toy-btn">
              {t('Add-Toy')}
            </Link>

            <Outlet />
          </div>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {toys.length ? (
              <ToyList toys={toys} onRemoveToy={onRemoveToy} user={user} />
            ) : (
              <h1>No toys to show</h1>
            )}
          </div>
        )}

        <div className="index-toy-nav ">
          <a
            className="animate__animated animate__fadeIn"
            onClick={() => onNavPage(-1)}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Previous Page
          </a>
          <a
            className="animate__animated animate__fadeIn"
            onClick={() => onNavPage(1)}
          >
            Next Page
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </main>
    </section>
  )
}
