import React from 'react'
import image from '../../assets/gameGuide11.png'
import './style.css'

const HowToEarnFruit = () => {
  return (
    <div className="pageContainer">
      <div className="image">
        <img src={image} alt="How to earn fruit" />
      </div>
      <div className="buttons">
        <button className="back">Back</button>
        <button className="next">Next</button>
      </div>
    </div>
  )
}

export default HowToEarnFruit
