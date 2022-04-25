import React, { useEffect, useState, useContext } from 'react'
import { useWallet } from 'use-wallet'
import { Modal, Slider, Grid } from '@material-ui/core'
import market1Image from '../../assets/market/market1.png'
import market2Image from '../../assets/market/market2.png'
import market3Image from '../../assets/market/market3.png'
import staking1Image from '../../assets/staking/staking1.png'
import staking2Image from '../../assets/staking/staking2.png'
import staking3Image from '../../assets/staking/staking3.png'
import Button from '../../components/Button'
import HomeCard from '../../components/HomeCard'
import HomeInfo from '../../components/HomeInfo'
import HomeList from '../../components/HomeList'
import UnlockWallet from '../../components/UnlockWallet'
import MiniChilla from '../Minichilla'
import MiniGuinea from '../Miniguinea'
import MiniLand from '../Miniland'
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
    title: '4 mvgld MiniCandy',
    image: market1Image,
  },
  {
    title: '10 mvgld MiniCoffe',
    image: market2Image,
  },
  {
    title: '20 mvgld MiniManual',
    image: market3Image,
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

  useEffect(() => {
    (async () => {
      if (account && contractAPI) {
        //await contractAPI.getGenesisNFTItems(account);
        setGenesisNFTItems(await contractAPI.getGenesisNFTItems(account));
        setMiniFrenNFTItems(await contractAPI.getMiniFrenNFTItems(account));
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
          <div className="container">
            <section>
              <HomeCard
                title="Genesis NFT Node Staking"
                className="stakingContainer"
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
              <HomeCard title="MiniMarket" className="miniMarket">
                {MARKETS.map(({ title, image }, index) => (
                  <div className="market" key={index} onClick={() => startBuyMiniItems(title)}>
                    <div className="image">
                      <img src={image} alt={title} height="127"/>
                    </div>
                    <span>{title}</span>
                  </div>
                ))}
              </HomeCard>
            </section>
            <section>
              <HomeList title="Genesis NFT Nodes" items={genesisNFTItems} />
              <HomeList
                title="MiniFrens Generations"
                items={miniFrenNFTItems}
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
    </div>
  )
}

export default Home
