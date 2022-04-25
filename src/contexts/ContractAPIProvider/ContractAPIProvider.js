import React, { useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { ContractAPI } from '../../contract_api'
import config from '../../config'

export const Context = React.createContext({
  contractAPI: {

  }
})

export const ContractAPIProvider = ({ children }) => {
  const [contractAPI, setContractAPI] = useState()
  const { account, ethereum } = useWallet();

  useEffect(() => {
    if (account && ethereum) {
      (async () => {
        const contractAPI = new ContractAPI({config, provider: ethereum});
        await contractAPI.approveAll(account);
        setContractAPI(contractAPI);
      })();
    }
  }, [account, ethereum]);

  return (
    <Context.Provider value={{contractAPI}}>
      { children }
    </Context.Provider>
  )
}