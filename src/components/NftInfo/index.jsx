import React from 'react'
import Button from '../Button'
import './style.css'

const NftInfo = ({
  title,
  subTitle,
  miniTitle,
  hasQuestion,
  isBlack,
  btnImg,
  infoUrl,
  ...props
}) => {
  return (
    <div className={`nftInfo ${isBlack ? 'black' : ''}`} {...props}>
      <div className="text">
        <span>{title}</span>
        {subTitle && <span>{subTitle}</span>}
        {miniTitle && <span className="miniTitle">{miniTitle}</span>}
      </div>
      {hasQuestion && 
        <>
        {
          !!btnImg
          ? <a href={infoUrl} target="_blank">
              <img src={btnImg} width="40" height="40"/>
            </a>
          : <a className="question button" href={infoUrl}>?</a>
        }
        </>
      }
    </div>
  )
}

export default NftInfo
