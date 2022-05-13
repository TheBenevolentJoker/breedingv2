import React, { useContext, useEffect, useState } from 'react'
import {MenuItem, Modal, Select, TextField, Button, Box, Grid, Chip} from '@material-ui/core';
import breedImage from '../../assets/breed.png'
import NftInfo from '../NftInfo'
import { Context as ContractAPIContext } from '../../contexts/ContractAPIProvider/ContractAPIProvider';
import InfoModal from '../InfoModal'

import './style.css'
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(({theme}) => ({
  chip: {
    color: 'white',
    margin: '.5rem',
  }
}));

const NFTViewrModal = ({open, handleClose}) => {
  const [item, setItem] = useState(null);
  const [itemType, setItemType] = useState('Chilla');
  const [itemId, setItemId] = useState('');
  const { contractAPI } = useContext(ContractAPIContext);
  const [loading, setLoading] = useState(false);
  const classes = useStyle();

  const handleChange = (event) => {
    setItemId(event.currentTarget.value);
  }

  const viewItem = async () => {
    setLoading(true);
    setItem(await contractAPI.getNFTInfo(itemType, itemId));
    setLoading(false);
  }

  const selectItemType = (event) => {
    setItemType(event.target.value);
  }

  return (
    <Modal
      aria-labelledby="connect a wallet"
      aria-describedby="connect your crypto wallet"
      open={open}
      style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      onClose={handleClose}
    >
      <div className="genesis-nft">
        <Box
          display="flex"
          alignItems="center"
        >
          <Select 
            label="ITEM TYPE" 
            onChange={selectItemType} 
            value={itemType} 
            variant="outlined"
            className="mr-2"
          >
            <MenuItem value="Chilla">Mini Chilla</MenuItem>
            <MenuItem value="Guinea">Mini Guinea</MenuItem>
            <MenuItem value="Land">Mini Land</MenuItem>
            <MenuItem value="Fren">Mini Fren</MenuItem>
          </Select>

          <TextField
            variant='outlined'
            label="ITEM ID" 
            value={itemId} 
            onChange={handleChange}
            className="mr-2"
          />
          <Button variant="contained" color="priamry" onClick={viewItem}>View</Button>
        </Box>
        {
          loading && <p> Loading ... </p>
        }
        {
          item && !loading &&
            <Grid container>
              <Grid item md={5}>
                <div className="nft-image">
                  <img src={item.metaData.image.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')} alt="nft" width="100%" height="100%"/>
                </div>
                <br />
                <p>Base Level: { item.stats.baseLevel.toNumber() }</p>
                <p>Breed Count: { item.stats.breedCount.toNumber() }</p>
                { item.stats.jobLevel && <p> Job Level: { item.stats.jobLevel.toNumber() }</p> }
                { item.stats.heistLevel && <p> Heist Level: { item.stats.heistLevel.toNumber() }</p> }
              </Grid>
              <Grid item md={1}></Grid>
              <Grid item md={6}>
                <p>Name: { item.metaData.name }</p>
                <p>Edition: { item.metaData.edition }</p>
                <br/>
                <div> Attributes: 
                  {
                    item.metaData.attributes.map(attr => <Chip classes={{ root: classes.chip }} label={`${attr.trait_type}:${attr.value}`} color="primary"></Chip>)
                  }
                </div>
              </Grid>
              
            </Grid>
        }
      </div>
    </Modal>
  )
}

export default NFTViewrModal
