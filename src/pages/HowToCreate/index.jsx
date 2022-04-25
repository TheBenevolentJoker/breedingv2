import React from 'react'
import image from '../../assets/gameGuide7.png'
import './style.css'

const HowToCreate = () => {
  return (
    <div className="pageContainer">
      <div className="image">
        <img src={image} alt="How To Create" />
      </div>
      <div className="buttons">
        <button className="back">Back</button>
        <button className="next">Next</button>
      </div>
    </div>
  )
}

export default HowToCreate
