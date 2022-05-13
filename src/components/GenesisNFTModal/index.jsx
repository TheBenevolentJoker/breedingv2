import React, { useContext, useEffect, useState } from 'react'
import {Modal} from '@material-ui/core';
import breedImage from '../../assets/breed.png'
import NftInfo from '../NftInfo'
import { Context as ContractAPIContext } from '../../contexts/ContractAPIProvider/ContractAPIProvider';
import Button from '../Button';
import InfoModal from '../InfoModal'

import './style.css'

const GenesisNFTModal = ({open, handleClose, item}) => {
  const { contractAPI } = useContext(ContractAPIContext);
  const [level, setLevel] = useState();
  const [image, setImage] = useState();
  const [blacklisted, setBlacklisted] = useState();
  const [breeding, setBreeding] = useState(false);
  const [breedLimited, setBreedLimited] = useState(false);
  const [infoOpen, setOpen] = useState(false);
  const [infoData, setInfoData] = useState({});

  const levelUp = async () => {
    await contractAPI.levelUpGenesisNFTItem(item.tokenId, item.tokenType);
  }

  const breed = async () => {
    setBreeding(true);
    await contractAPI.mintFren(item.tokenId, item.tokenType);
    setBreeding(false);
    setTimeout(() => {
      checkBlacklist();
    }, 1000);
  }

  const clearBlacklist = async () => {
    await contractAPI.clearBlacklist(item.tokenId, item.tokenType);
    setTimeout(() => {
      checkBlacklist();
    }, 1000);
  }

  const checkBlacklist = async () => {
    setBlacklisted(await contractAPI.checkBlacklist(item.tokenId, item.tokenType));
    setBreedLimited(await contractAPI.isBreedLimited(item.tokenId, item.tokenType));
  }

  const openInfoModal = (infoImage, infoUrl) => {
    setInfoData({
      infoImage, infoUrl
    });
    setOpen(true);

  }

  const handleInfoClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    if (item) {
      (async () => {
        setImage(null);
        setLevel((await contractAPI.getGenesisNFTItemLevel(item.tokenId, item.tokenType)).toNumber());
        const url = item.tokenURI.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/');
        const data = await (await fetch(url)).json();
        setImage(data.image.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/'));
        checkBlacklist();
      })();
    }
  }, [item]);

  return (
    <Modal
      aria-labelledby="connect a wallet"
      aria-describedby="connect your crypto wallet"
      open={open}
      style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      onClose={handleClose}
    >
      <div className="genesis-nft">
        <h1>Mini{item.tokenType} #{item.tokenId}</h1>

        <div className="container">
          <section>
            <div className="nft-image">
              {
                image
                ? <img src={image} alt="nft" width="100%" height="100%"/>
                : <p> Loading... </p>
              }
            </div>
            <div className="nft-info">
              <span>Genesis Level: { level }</span>
            </div>
          </section>
          <section>
            <Button onClick={levelUp}>
              <NftInfo 
                title="Level Up" 
                subTitle="Genesis Level" 
                hasQuestion 
                infoUrl="https://miniversefinance.gitbook.io/docs/nft-gamefi-utility/nft-nodes-breeding-game-coming-soon/genesis-nft-nodes"
              />
            </Button>
            {
              item.tokenType !== 'Land' &&
              <Button onClick={breed} disabled={breeding || breedLimited}>
                <NftInfo
                  title={breeding ? "Breeding..." : breedLimited ? "Breed Limited" : "Breed"}
                  miniTitle="(Needs 1 Other MiniVerse NFT in Wallet)"
                  hasQuestion
                  infoUrl="https://miniversefinance.gitbook.io/docs/nft-gamefi-utility/nft-nodes-breeding-game-coming-soon"
                />
              </Button>
            }
            {
              blacklisted &&
              <Button onClick={clearBlacklist}>
                <NftInfo title="Feed MiniCoffee" subTitle="(Unblacklist)" />
              </Button>
            }
          </section>
        </div>
        <InfoModal img={infoData.infoImage} url={infoData.infoUrl} open={infoOpen} handleClose={handleInfoClose} />
      </div>
    </Modal>
  )
}

export default GenesisNFTModal
