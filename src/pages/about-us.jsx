import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import 'animate.css'
import { useTranslation } from 'react-i18next'

export function AboutUs() {
  const { t } = useTranslation()
  const AnyReactComponent = ({ text }) => <div>{text}</div>
  const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
  const zoom = 9

  const handleClick = ({ lat, lng }) => {
    setCoordinates({ lat, lng })
  }

  return (
    // Important! Always set the container height explicitly
    <div
      style={{
        height: '55vh',
        width: '55%',
        minWidth: '350px',
        margin: '0 auto',
      }}
      className="animate__animated animate__fadeIn"
    >
      <h2 className="about-title">{t('Our-Branches')}</h2>
      <GoogleMapReact
        onClick={handleClick}
        bootstrapURLKeys={{ key: 'AIzaSyB6Cpbub6mQ0LgiyrKqU-Xjd55sm0gzHC0' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={zoom}
      >
        <AnyReactComponent
          lat={31.768319}
          lng={35.21371}
          // {...coordinates}
          text={
            <span
              style={{ color: 'red', fontWeight: '900' }}
              className="material-symbols-outlined"
            >
              location_on
            </span>
          }
        />
        <AnyReactComponent
          lat={31.8123014}
          lng={34.7770192}
          // {...coordinates}
          text={
            <span
              style={{ color: 'red', fontWeight: '900' }}
              className="material-symbols-outlined"
            >
              location_on
            </span>
          }
        />
        <AnyReactComponent
          lat={33.0085361}
          lng={35.0980514}
          // {...coordinates}
          text={
            <span
              style={{ color: 'red', fontWeight: '900' }}
              className="material-symbols-outlined"
            >
              location_on
            </span>
          }
        />
      </GoogleMapReact>
      <div className="map-btn-container">
        <button
          className="btn-map"
          onClick={() => handleClick({ lat: 31.768319, lng: 35.21371 })}
        >
          {t('Jerusalem')}
        </button>
        <button
          className="btn-map"
          onClick={() => handleClick({ lat: 31.8123014, lng: 34.7770192 })}
        >
          {t('Gedera')}
        </button>
        <button
          className="btn-map"
          onClick={() => handleClick({ lat: 33.0085361, lng: 35.0980514 })}
        >
          {t('Nahariya')}
        </button>
      </div>
    </div>
  )
}
