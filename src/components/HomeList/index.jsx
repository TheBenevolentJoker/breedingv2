import React, { useState, useContext } from 'react'
import './style.css'
import arrowImg from '../../assets/arrow-1.png'
import Button from '../Button'
import GenesisNFTModal from '../GenesisNFTModal'
import MiniFrenNFTModal from '../MiniFrenNFTModal'

const HomeList = ({ title, items }) => {
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState();

  const showItemModal = (itemInfo) => {
    setItem(itemInfo);
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
  }

  return (
    <div className="homeList">
      <div className="title">{title}</div>
      <div className="container">
        {items.map(({ tokenId, tokenType, tokenURI }, index) => (
          <Button className="item" key={index} onClick={() => showItemModal({
            tokenId, tokenURI, tokenType
          })}>
            <p>Mini{ tokenType }</p>
            <p>#{tokenId}</p>
          </Button>
        ))}
      </div>
      {
        item 
        &&  <>
            {
              title === 'Genesis NFT Nodes' 
              ? <GenesisNFTModal 
                  open={showModal}
                  handleClose={handleClose}
                  item={item}
                />
              : <MiniFrenNFTModal
                  item={item}
                  open={showModal}
                  handleClose={handleClose}
                />
            }
            </>
      }
    </div>
  )
}

export default HomeList
