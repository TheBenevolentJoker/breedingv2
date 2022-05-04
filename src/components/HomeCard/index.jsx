import React from 'react'
import Button from '../Button'
import './style.css'

const HomeCard = ({ title, className, infoUrl, children, btnImg }) => {
  return (
    <div className="homeCard">
      <header>
        <h2>{title}</h2>
        <a href={infoUrl} target="_blank">
          <img src={btnImg} width="40" height="40"/>
        </a>
      </header>
      <section className={className}>{children}</section>
    </div>
  )
}

export default HomeCard
