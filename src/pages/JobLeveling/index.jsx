import React from 'react'
import image from '../../assets/jobLeveling.png'
import './style.css'

const JobLeveling = () => {
  return (
    <div className="pageContainer">
      <div className="title">Job Leveling</div>
      <div className="image">
        <img src={image} alt="Job Leveling" />
      </div>
    </div>
  )
}

export default JobLeveling
