import React from 'react'
import Button from '../Button'
import './style.css'

const NftInfo = ({
  title,
  subTitle,
  miniTitle,
  hasQuestion,
  isBlack,
  ...props
}) => {
  return (
    <div className={`nftInfo ${isBlack ? 'black' : ''}`} {...props}>
      <div className="text">
        <span>{title}</span>
        {subTitle && <span>{subTitle}</span>}
        {miniTitle && <span className="miniTitle">{miniTitle}</span>}
      </div>
      {hasQuestion && <Button className="question">?</Button>}
    </div>
  )
}

export default NftInfo
