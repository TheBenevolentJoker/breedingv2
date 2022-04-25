import React from 'react'
import Button from '../Button'
import './style.css'

const HomeCard = ({ title, className, questionClick, children }) => {
  return (
    <div className="homeCard">
      <header>
        <h2>{title}</h2>
        <Button className="question" onClick={questionClick}>
          ?
        </Button>
      </header>
      <section className={className}>{children}</section>
    </div>
  )
}

export default HomeCard
