import React from 'react'
import image from '../../assets/breeding.png'
import './style.css'

const BreedingFaq = () => {
  return (
    <div className="pageContainer">
      <div className="title">Fruit Heists/Heist Level</div>
      <div className="image">
        <img src={image} alt="Fruit Heists/Heist Level" />
      </div>
      <div className="buttons">
        <button className="next">Next</button>
      </div>
    </div>
  )
}

export default BreedingFaq
