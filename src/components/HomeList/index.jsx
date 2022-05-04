import React, { useState, useContext } from 'react'
import './style.css'
import Button from '../Button'
import GenesisNFTModal from '../GenesisNFTModal'
import MiniFrenNFTModal from '../MiniFrenNFTModal'
import { Context as ContractAPIContext } from '../../contexts/ContractAPIProvider/ContractAPIProvider';
import { Button as MuiButton, LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    width: '80%',
    margin: 'auto',
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const HomeList = ({ title, items, totalSupply }) => {
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
      {
        title === 'MiniFrens Generations' &&
        <>
          <span style={{ fontSize: '36px'}}>
            { parseInt(totalSupply * 100 / 8076) } % Minifren MINTED
          </span>
          <BorderLinearProgress variant="determinate" value={totalSupply * 100 / 8076} />
        </>
      }
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
