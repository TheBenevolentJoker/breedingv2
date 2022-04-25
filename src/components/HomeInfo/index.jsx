import React, { useEffect, useContext, useState } from 'react'
import { useWallet } from 'use-wallet'
import { Context as ContractAPIContext } from '../../contexts/ContractAPIProvider/ContractAPIProvider'
import './style.css'

const INFOS = {
  MvGLD: '100',
  MvDOLLAR: '3000',
  MiniCandy: '13',
  MiniCoffe: 2,
  MiniManual: 1,
}

const FRUITS = {
  BlueBerry: '1',
  Grape: '0',
  Apple: '0',
  Watermelon: '0',
}

const HomeInfo = () => {
  const { contractAPI } = useContext(ContractAPIContext);
  const [infos, setInfos] = useState({});
  const [fruits, setFruits] = useState({});
  const { account } = useWallet();

  const getAccountInfos = async () => {
    try {
      setInfos(await contractAPI.getAccountInfos(account));
      setFruits(await contractAPI.getFruits(account));
      setTimeout(getAccountInfos, 3000);
    } catch(error) {
      
    }
  }

  useEffect(() => {
    if (account && contractAPI) {
      setTimeout(getAccountInfos, 3000);
    }
  }, [account, contractAPI]);

  return (
    <div className="homeInfo">
      <section>
        {Object.entries(infos).map(([key, value]) => (
          <span className="info">
            {key}: {value}
          </span>
        ))}
      </section>
      <section>
        <span className="info">Fruit -</span>
        {Object.entries(fruits).map(([key, value]) => (
          <span className="info">
            {key}: {value}
          </span>
        ))}
      </section>
    </div>
  )
}

export default HomeInfo
