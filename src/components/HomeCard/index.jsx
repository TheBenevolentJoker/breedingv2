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
        <Button className="question" onClick={questionClick}>
          ?
        </Button>
      </header>
      <section className={className}>{children}</section>
      <InfoModal img={btnImg} url={infoUrl} open={open} handleClose={handleClose} />
    </div>
  )
}

export default HomeCard
