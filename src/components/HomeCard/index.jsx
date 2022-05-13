import React from 'react'
import Button from '../Button'
import InfoModal from '../InfoModal'

import './style.css'

const HomeCard = ({ title, className, infoUrl, children, btnImg }) => {
  const [open, setOpen] = React.useState(false);

  const questionClick = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className="homeCard">
      <header>
        <h2>{title}</h2>
        <a className="question button" href={infoUrl} target="_blank"  rel="noopener noreferrer">?</a>
      </header>
      <section className={className}>{children}</section>
    </div>
  )
}

export default HomeCard
