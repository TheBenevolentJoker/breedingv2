import React from 'react'
import nftImage from '../../assets/nft.png'
import NftInfo from '../NftInfo'
import './style.css'

const Nft2 = () => {
  return (
    <div className="nft">
      <h1>MiniFren #123</h1>

      <div className="container">
        <section>
          <div className="nft-image">
            <img src={nftImage} alt="nft" />
          </div>
          <div className="nft-info">
            <span>Base Level: 12</span>
            <span>Job Level: 1</span>
            <span>Heist Level: 0</span>
          </div>
        </section>
        <section>
          <NftInfo title="Level Up" subTitle="Base Level" hasQuestion />
          <NftInfo title="Level Up" subTitle="Job Level" hasQuestion />
          <NftInfo title="Fruit" subTitle="Heist" hasQuestion />
          <NftInfo
            title="Breed"
            miniTitle="(Needs 1 Other MiniVerse NFT in Wallet)"
            hasQuestion
          />
          <NftInfo title="Claim" subTitle="MvGLD" />
        </section>
      </div>
    </div>
  )
}

export default Nft2
