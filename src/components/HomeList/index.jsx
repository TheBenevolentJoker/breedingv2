import React, { useState, useContext } from 'react'
import './style.css'
import arrowImg from '../../assets/arrow-1.png'
import Button from '../Button'
import GenesisNFTModal from '../GenesisNFTModal'
import MiniFrenNFTModal from '../MiniFrenNFTModal'
import { Context as ContractAPIContext } from '../../contexts/ContractAPIProvider/ContractAPIProvider';
import { Button as MuiButton } from '@material-ui/core';

const HomeList = ({ title, items }) => {
  const { contractAPI } = useContext(ContractAPIContext);
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  const showItemModal = (itemInfo) => {
    setItem(itemInfo);
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const claimAll = async () => {
    setLoading(true);
    await contractAPI.claimMVGLD(items.map(item => item.tokenId));
    setLoading(false);
  }

  return (
    <div className="homeList">
      <div className="title">
        {title}
        {
          title !== 'Genesis NFT Nodes' &&
          <MuiButton onClick={claimAll} disabled={loading}  variant="contained" classes={{ root: 'btn-claim-all' }} color="primary">
            Claim All
          </MuiButton>
        }
      </div>
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
