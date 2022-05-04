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
  openInfoModal,
  ...props
}) => {
  const questionClick = (event) => {
    event.stopPropagation();
    openInfoModal(btnImg, infoUrl);
  }

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
            ? <Button className="question" onClick={questionClick}>
                ?
              </Button>
            : <a className="question button" href={infoUrl} target="_blank"  rel="noopener noreferrer">?</a>
          }
        </>
      }
    </div>
  )
}

export default NftInfo
