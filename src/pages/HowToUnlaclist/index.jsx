import React from 'react'
import image from '../../assets/earnGold.png'
import './style.css'

const HowToUnblacklist = () => {
  return (
    <div className="pageContainer">
      <div className="image">
        <img src={image} alt="How to unblacklist" />
      </div>
      <div className="buttons">
        <button className="back">Back</button>
        <button className="next">Next</button>
      </div>
    </div>
  )
}

export default HowToUnblacklist
