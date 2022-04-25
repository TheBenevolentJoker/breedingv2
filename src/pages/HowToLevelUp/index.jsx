import React from 'react'
import image from '../../assets/gameGuide10.png'
import './style.css'

const HowToLevelup = () => {
  return (
    <div className="pageContainer">
      <div className="image">
        <img src={image} alt="How to level up" />
      </div>
      <div className="buttons">
        <button className="back">Back</button>
        <button className="next">Next</button>
      </div>
    </div>
  )
}

export default HowToLevelup
