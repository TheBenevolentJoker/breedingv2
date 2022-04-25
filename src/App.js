import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider as TP } from '@material-ui/core/styles';
import { ThemeProvider as TP1 } from 'styled-components';
import { UseWalletProvider } from 'use-wallet'
import config from './config'
import BreedingFaq from './pages/BreedingFaq'
import ChillaInfo from './pages/ChillaInfo'
import Heist1 from './pages/Heist1'
import Heist2 from './pages/Heist2'
import Home from './pages/Home'
import HowToCreate from './pages/HowToCreate'
import HowToEarnGold from './pages/HowToEarnGold'
import HowToEarnFruit from './pages/HowToFruit'
import HowToLevelup from './pages/HowToLevelUp'
import HowToUnblacklist from './pages/HowToUnlaclist'
import JobLeveling from './pages/JobLeveling'
import LandInfo from './pages/LandInfo'
import Market from './pages/Market'
import MiniFrenLeveling from './pages/MiniFrenLeveling'
import Nft3 from './pages/Nft3'
import Nft4 from './pages/Nft4'
import Nft5 from './pages/Nft5'
import { ContractAPIProvider } from './contexts/ContractAPIProvider'
import theme from './theme'
import newTheme from './newTheme'

const App = () => {
  return (
    <TP1 theme={theme}>
      <TP theme={newTheme}>
        <UseWalletProvider
          chainId={config.chainId}
          connectors={{
          }}
        >
          <ContractAPIProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chillainfo" element={<ChillaInfo />} />
                <Route path="/landinfo" element={<LandInfo />} />
                <Route path="/nft3" element={<Nft3 />} />
                <Route path="/nft4" element={<Nft4 />} />
                <Route path="/nft5" element={<Nft5 />} />
                <Route path="/market" element={<Market />} />
                <Route path="/minifrenleveling" element={<MiniFrenLeveling />} />
                <Route path="/jobleveling" element={<JobLeveling />} />
                <Route path="/heist1" element={<Heist1 />} />
                <Route path="/heist2" element={<Heist2 />} />
                <Route path="/breedingfaq" element={<BreedingFaq />} />
                <Route path="/howtocreate" element={<HowToCreate />} />
                <Route path="/howtoearngold" element={<HowToEarnGold />} />
                <Route path="/howtounblacklist" element={<HowToUnblacklist />} />
                <Route path="/howtolevelup" element={<HowToLevelup />} />
                <Route path="/howtoearnfruit" element={<HowToEarnFruit />} />
              </Routes>
            </BrowserRouter>
          </ContractAPIProvider>
        </UseWalletProvider>
      </TP>
    </TP1>
  )
}

export default App
