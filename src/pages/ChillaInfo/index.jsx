import React from 'react'
import guide1 from '../../assets/info/gameGuide-1.png'
import './style.css'

const ChillaInfo = () => {
  const infoRules = [
    '10% claim tax.',
    'Uber Guineas/Chillas have no cliam tax.',
    '1 MvDOLLAR Stake/Unstake Tax',
  ]

  return (
    <div className="infoPage">
      <div className="title">MiniGuinea/Chilla Info</div>
      <div className="image">
        <img src={guide1} alt="guide" />
        <ul className="infoRules">
          {infoRules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
      <button>Land</button>
    </div>
  )
}

export default ChillaInfo
