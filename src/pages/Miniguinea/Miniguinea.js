import React, { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { useWallet } from 'use-wallet';

import { Box, Grid, LinearProgress, Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/styles';

//import useBanks from '../../hooks/useBanks';
import { Context as ContractAPIContext } from '../../contexts/ContractAPIProvider/ContractAPIProvider'; 
import config from '../../config';
import { BigNumber } from 'ethers';

import './style.css'
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  stakeButtons: {
    marginRight: '1rem',
  },
  claimAllButton: {
    position: 'absolute',
    right: '0',
    color: 'white',
    [theme.breakpoints.down('md')]: {
      position: 'unset',
      marginBottom: '1rem',
    }
  }
}));

const Cemetery = () => {
//  const [banks] = useBanks();
  const { account, /*ethereum*/ } = useWallet();
//  const activeBanks = banks.filter((bank) => !bank.finished);
  const classes = useStyles();
  const { contractAPI: tombFinance } = useContext(ContractAPIContext);
  const [nftsInWallet, setNftsInWallet] = useState([]);
  const [nftsStaked, setNftsStaked] = useState([]);
  const [nftTotalSupply, setNftTotalSupply] = useState(1);
  const [nftStakedTotalSupply, setNftStakedTotalSupply] = useState(0);
  const [selectedNftsInWallet, setSelectedNftsInWallet] = useState([]);
  const [indexOfSelectedNft, setIndexOfselectedNft] = useState(-1);
  const [reward, setReward] = useState(0);
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const reloadNfts = async () => {
    if (account) {
      let nftsInWalletWithJSON = await tombFinance.getNFTsInWallet(account, 'Guinea');
      setNftsInWallet(await Promise.all(
        nftsInWalletWithJSON.map(async nft => {
          return {
            tokenId: nft.tokenId,
            ...await getImageFromJSON(nft.metaDataJson)
          }
        })
      ));

      let nftsStakedWithJSON = await tombFinance.getNFTsStaked(account, 'Guinea', 'Guinea Staking');
      setNftsStaked(await Promise.all(
        nftsStakedWithJSON.map(async nft => {
          return {
            tokenId: nft.tokenId,
            ...await getImageFromJSON(nft.metaDataJson)
          }
        })
      ));

      setNftTotalSupply(await tombFinance.nftTotalSupply('Guinea'));
      setNftStakedTotalSupply(await tombFinance.nftStakedTotalSupply('Guinea Staking'));
    }
  }

  useEffect(() => {
    reloadNfts();
  }, [tombFinance, account]);

  
  const getImageFromJSON = async (json) => {
    try {
      const { image, name} = await (await fetch('https://gateway.pinata.cloud/ipfs/' + json.replace('ipfs://', ''))).json();
      return {
        image: 'https://gateway.pinata.cloud/ipfs/' + image.replace('ipfs://', ''),
        name,
      };
    } catch(e) {
      return await getImageFromJSON(json);
    }
  }

  const calculateReward = async (index) => {
    const level = await tombFinance.getGenesisNFTItemLevel(nftsStaked[index].tokenId, 'Guinea');
    const rewardInWei = await tombFinance.calculateReward(account, nftsStaked[index].tokenId, 'Guinea Staking');
    setReward(
      rewardInWei
      .div(BigNumber.from('100000000000000'))
      .mul(BigNumber.from(config.claimRates1[level]))
      .div(BigNumber.from(100))
      .toNumber() / 10000
    );
  }

  const selectNftStaked = async (index) => {
    setIndexOfselectedNft(index);
    setSelectedNftsInWallet([]);
    await calculateReward(index);
  }

  const selectNftInWallet = async (index) => {
    if (selectedNftsInWallet.includes(index)) setSelectedNftsInWallet(selectedNftsInWallet.filter(_index => _index !== index));
    else setSelectedNftsInWallet([...selectedNftsInWallet, index]);
    setIndexOfselectedNft(-1);
  }

  const stake = async () => {
    await tombFinance.stakeNfts(selectedNftsInWallet.map(_index => nftsInWallet[_index].tokenId), 'Guinea Staking');
    reloadNfts();
  }

  const unStake = async () => {
    await tombFinance.unStake(nftsStaked[indexOfSelectedNft].tokenId, 'Guinea Staking');
    reloadNfts();
  }

  const claim = async () => {
    await tombFinance.claim([nftsStaked[indexOfSelectedNft].tokenId], 'Guinea Staking');
    await calculateReward(indexOfSelectedNft);
  }

  const approve = async () => {
    await tombFinance.approve('Guinea', 'Guinea Staking');
  }

  const claimAll = async () => {
    setLoading(true);
    await tombFinance.claim(nftsStaked.map(item => item.tokenId), 'Guinea Staking');
    setLoading(false);
  }

  return (
    <div className="mini-guinea-container">
      <span className='mini-guinea-title'>MiniGuineas NFT Staking</span>
      <div style={{ textAlign: 'center', position: 'relative', marginTop: '1rem'  }}>
        <span className='mini-guinea-subtitle'>
          { parseInt(nftStakedTotalSupply * 100 / nftTotalSupply) } % MiniGuineas STAKED
        </span>
        {
          !!nftsStaked?.length && !isMobile &&
          <Button onClick={claimAll} disabled={loading}  variant="contained" classes={{ root: classes.claimAllButton }} color="primary">
            Claim All
          </Button>
        }
      </div>
      <BorderLinearProgress variant="determinate" value={nftStakedTotalSupply * 100 / nftTotalSupply} />
      <br/>
      {
        !!nftsStaked?.length && isMobile &&
          <Button onClick={claimAll} disabled={loading}  variant="contained" classes={{ root: classes.claimAllButton }} color="primary">
            Claim All
          </Button>
      }
      <br/>
      <Grid container spacing={2}>
        <Grid md={6} item style={{ width: '100%' }}>
          <Box style={{
            background: 'gray',
            height: '500px',
            padding: '1rem',
            borderRadius: '4px',
            overflowY: 'auto',
          }}>
            <p>
              {nftsInWallet.length} NFT(s) in your wallet
            </p>
            <Box classes={{
              root: 'nft-item-box'
            }}>
              {
                nftsInWallet.map(({image, name}, index) => 
                  <Box style={{
                    marginRight: '1rem',
                  }}>
                    <img
                      src={image} 
                      style={{
                        border: selectedNftsInWallet.includes(index) ? '2px solid blue' : '',
                        width: '150px',
                        height: '150px',
                      }}
                      onClick={() => selectNftInWallet(index)}
                      alt="NFT"
                    />
                    <p> { name } </p>
                  </Box>
                )
              }
            </Box>
          </Box>
        </Grid>
        <Grid md={6} sm={12} item style={{ width: '100%' }}>
          <Box style={{
            background: 'gray',
            padding: '1rem',
            borderRadius: '4px',
            visibility: indexOfSelectedNft === -1 && selectedNftsInWallet.length === 0 ? 'hidden' : 'visible',
            height: '100px',
          }}>
            {
              indexOfSelectedNft > -1 && <>
                <h1>
                  { nftsStaked[indexOfSelectedNft].name }
                </h1>
                <Box
                  classes={{
                    root: 'nft-button-box'
                  }} 
                >
                  <div>
                    <Button
                      variant='contained' 
                      color="primary" 
                      classes={{
                        root: classes.stakeButtons,
                      }}
                      onClick={unStake}
                    >
                      Unstake
                    </Button>
                    <Button
                      variant='contained'
                      color="primary"
                      onClick={claim}
                    >
                      Claim
                    </Button>
                  </div>
                  <p style={{maxWidth: '50%'}}>Claimable: { reward } MvDollar</p>
                </Box>
              </>
            }
            {
              selectedNftsInWallet.length > 0 && <>
                 <Box
                  classes={{
                    root: 'nft-button-box'
                  }} 
                >
                  <div>
                  <Button
                      variant='contained' 
                      color="primary" 
                      onClick={approve}
                      classes={{
                        root: classes.stakeButtons,
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant='contained' 
                      color="primary" 
                      classes={{
                        root: classes.stakeButtons,
                      }}
                      onClick={stake}
                    >
                      Stake
                    </Button>
                  </div>
                </Box>
              </>
            }
          </Box>
          <Box style={{
            background: 'gray',
            height: '300px',
            padding: '1rem',
            borderRadius: '4px',
            marginTop: '2rem',
            overflowY: 'auto',
          }}>
            <p>
              { nftsStaked.length } NFT(s) staked
            </p>
            <Box classes={{
              root: 'nft-item-box'
            }}> 
              {
                nftsStaked.map(({image, name}, index) => 
                  <Box style={{
                    marginRight: '1rem',
                  }}>
                    <img 
                      src={image}
                      width="150"
                      style={{
                        border: index === indexOfSelectedNft ? '2px solid blue' : '',
                        width: '150px',
                        height: '150px',
                      }}
                      onClick={() => selectNftStaked(index)}
                      alt="NFT"
                    />
                    <p> { name } </p>
                  </Box>
                )
              }
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cemetery;
