import React from 'react'
import { Button, Modal } from "@material-ui/core"

import './style.css'

const InfoModal = ({
  img,
  url,
  open,
  handleClose
}) => {
  return (
    <Modal
      aria-labelledby="Info Modal"
      aria-describedby="Info Modal"
      open={open}
      style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      onClose={handleClose}
    >
      <div className='info-modal'>
        <img src={img} width="100%" height="95%" alt=""/>
        <Button href={url} target="_blank" variant="contained" color="primary" classes={{
          root: 'learn-more-btn'
        }}>
          Learn more...
        </Button>
      </div>
    </Modal>
  )
}

export default InfoModal;