import React from 'react'
import nftImage from '../../assets/nft.png'
import './style.css'

const Nft3 = () => {
  return (
    <div className="nft">
      <h1>Heist Level Up MiniFren #123</h1>

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
          <h2>Choose Which MiniFren To Burn</h2>
          <div className="miniFrens">
            <div className="miniFren">
              <p className="name">MiniFren #234</p>
              <p className="level">Base Level: 12</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Nft3
