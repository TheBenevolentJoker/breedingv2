import React from 'react'
import image from '../../assets/gameGuide6.png'
import './style.css'

const Market = () => {
  return (
    <div className="pageContainer">
      <div className="title">MiniMarket</div>
      <div className="image">
        <img src={image} alt="MiniMarket" />
      </div>
    </div>
  )
}

export default Market
