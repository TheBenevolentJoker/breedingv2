import React from 'react'
import guide2 from '../../assets/info/gameGuide-2.png'
import './style.css'

const LandInfo = () => {
  const landRules = [
    'Land NFTs only need Blueberries to level',
    '10% claim Tax',
  ]

  return (
    <div className="infoPage">
      <div className="title">MiniLand Info</div>
      <div className="image">
        <img src={guide2} alt="land" />
        <ul className="landRules">
          {landRules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
      <button>Back</button>
    </div>
  )
}

export default LandInfo
