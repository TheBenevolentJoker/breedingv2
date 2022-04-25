import React from 'react'
import image from '../../assets/heist2.png'
import './style.css'

const Heist2 = () => {
  return (
    <div className="pageContainer">
      <div className="title">Fruit Heists/Heist Level Part 2</div>
      <div className="image">
        <img src={image} alt="Fruit Heists/Heist Level" />
      </div>
    </div>
  )
}

export default Heist2
