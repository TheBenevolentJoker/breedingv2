import React, { useEffect, useState, useContext } from 'react'
import { useWallet } from 'use-wallet'
import { Modal, Slider, Grid, Button as MuiButton } from '@material-ui/core'
import market1Image from '../../assets/market/market1.png'
import market2Image from '../../assets/market/market2.png'
import market3Image from '../../assets/market/market3.png'
import staking1Image from '../../assets/staking/staking1.png'
import staking2Image from '../../assets/staking/staking2.png'
import staking3Image from '../../assets/staking/staking3.png'
import mvDollarEmission from '../../assets/MV_DOLLAR_EMISSIONS.png'
import miniMarket from '../../assets/MINI_MARKET.png'
import Button from '../../components/Button'
import HomeCard from '../../components/HomeCard'
import HomeInfo from '../../components/HomeInfo'
import HomeList from '../../components/HomeList'
import UnlockWallet from '../../components/UnlockWallet'
import MiniChilla from '../Minichilla'
import MiniGuinea from '../Miniguinea'
import MiniLand from '../Miniland'
import NFTViewerModal from '../../components/NFTViewerModal'
import { Context as ContractAPIContext } from '../../contexts/ContractAPIProvider/ContractAPIProvider';
import './style.css'

const STAKINGS = [
  {
    title: 'MiniChilla',
    image: staking1Image,
  },
  {
    title: 'MiniGuinea',
    image: staking2Image,
  },
  {
    title: 'MiniLand',
    image: staking3Image,
  },
]

const MARKETS = [
  {
    title: 'MiniCandy',
    image: market1Image,
    price: '6 mvgld',
  },
  {
    title: 'MiniCoffe',
    image: market2Image,
    price: '10 mvgld',
  },
  {
    title: 'MiniManual',
    image: market3Image,
    price: '20 mvgld',
  },
]

const Home = () => {
  const { account } = useWallet();
  const { contractAPI } = useContext(ContractAPIContext);
  const [genesisNFTItems, setGenesisNFTItems] = useState([]);
  const [miniFrenNFTItems, setMiniFrenNFTItems] = useState([]);
  const [stakingComponent, setStakingComponent] = useState(null);
  const [selectedItemTitle, setSelectedItemTitle] = useState("");
  const [amount, setAmount] = useState(1);
  const [totalSupply, setTotalSupply] = useState(0);
  const [showNftViewer, setShowNftViewer] = useState(false);

  useEffect(() => {
    (async () => {
      if (account && contractAPI) {
        //await contractAPI.getGenesisNFTItems(account);
        setGenesisNFTItems(await contractAPI.getGenesisNFTItems(account));
        setMiniFrenNFTItems(await contractAPI.getMiniFrenNFTItems(account));
        setTotalSupply(await contractAPI.getMiniFrenTotalSupply());
      }
    })();
  }, [account, contractAPI]);

  const startBuyMiniItems = (itemTitle) => {
    setSelectedItemTitle(itemTitle);
  }

  const buyMiniItems = async () => {
    await contractAPI.buyMiniItems(selectedItemTitle, amount);
    setSelectedItemTitle("");
  }

  const startStaking = (tokenType) => {
    setStakingComponent(tokenType);
  }

  const handleClose = () => {
    setStakingComponent(null);
  }

  const handleSliderChange = (event, value) => {
    setAmount(value);
  }
  
  const handleClose1 = () => {
    setSelectedItemTitle("");
  }

  return (
    <div className="home">
      {!account ? (
        <UnlockWallet/ >
      ) : (
        <>
          <span className="connected">Connected</span>
          <HomeInfo />
          <MuiButton 
            variant="contained" 
            color="primary" 
            onClick={() => {
              setShowNftViewer(true);
            }}
            className="nft-viewer-btn"
          >
            Go To NFT Viewer
          </MuiButton>
          <MuiButton 
            variant="contained" 
            color="primary" 
            href="https://charming-paletas-5fe91d.netlify.app/"
            target="_blank"
            className="nft-viewer-btn"           
          >
            Breeding Calculator
          </MuiButton>
          <div className="container">
            <section>
              <HomeCard
                title="Genesis NFT Node Staking"
                className="stakingContainer"
                btnImg={mvDollarEmission}
                infoUrl="https://miniversefinance.gitbook.io/docs/nft-gamefi-utility/nft-nodes-breeding-game-coming-soon/genesis-nft-nodes"
              >
                {STAKINGS.map(({ title, image }, index) => (
                  <div
                    className="staking"
                    style={{
                      gridArea: 'staking' + (index + 1),
                    }}
                    onClick={() => startStaking(title)}
                  >
                    <div className="image">
                      <img src={image} alt={title} />
                    </div>
                    <span>{title}</span>
                  </div>
                ))}
              </HomeCard>
              <HomeCard 
                title="MiniMarket" 
                className="miniMarket"
                btnImg={miniMarket}
                infoUrl="https://miniversefinance.gitbook.io/docs/nft-gamefi-utility/nft-nodes-breeding-game-coming-soon/minimarket"
              >
                {MARKETS.map(({ title, image, price }, index) => (
                  <div className="market" key={index}>
                    <div className="image">
                      <img src={image} alt={title} height="127"/>
                    </div>
                    <span>{title}</span>
                    <MuiButton classes={{ root: 'btn-white' }} color="primary" variant="contained" onClick={() => startBuyMiniItems(title)}>
                      Buy ({ price })
                    </MuiButton>
                  </div>
                ))}
              </HomeCard>
            </section>
            <section>
              <HomeList title="Genesis NFT Nodes" items={genesisNFTItems} />
              <HomeList
                title="MiniFrens Generations"
                items={miniFrenNFTItems}
                totalSupply={totalSupply}
              />
            </section>
          </div>
        </>
      )}
      {
        stakingComponent === 'MiniGuinea' 
        ? <Modal
            aria-labelledby="connect a wallet"
            aria-describedby="connect your crypto wallet"
            open={!!stakingComponent}
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            onClose={handleClose}
          >
            <MiniGuinea />
          </Modal>
         :  stakingComponent === 'MiniChilla'
            ?  <Modal
                aria-labelledby="connect a wallet"
                aria-describedby="connect your crypto wallet"
                open={!!stakingComponent}
                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                onClose={handleClose}
              >
                <MiniChilla />
              </Modal>
            : stakingComponent === 'MiniLand'
              ? <Modal
                  aria-labelledby="connect a wallet"
                  aria-describedby="connect your crypto wallet"
                  open={!!stakingComponent}
                  style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                  onClose={handleClose}
                >
                  <MiniLand />
                </Modal>
              : <></>
      }
       <Modal
        aria-labelledby="enter an amount of items"
        aria-describedby="enter an amount of items"
        open={!!selectedItemTitle}
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        onClose={handleClose1}
      >
        <div
           style={{ 
            textAlign: 'center', 
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            width: '200px',
            height: '200px',
            padding: '2rem'
          }}
        >
          <h3>{ selectedItemTitle }</h3>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider 
                value={parseInt(amount)}
                onChange={handleSliderChange}
                min={1}
                max={10}
              />
            </Grid>
            <Grid item>
              { amount }
            </Grid>
          </Grid>
          <Button onClick={buyMiniItems}>
            Buy
          </Button>
        </div>
      </Modal>
      <NFTViewerModal open={showNftViewer} handleClose={() => { setShowNftViewer(false)}} />
    </div>
  )
}

export default Home
