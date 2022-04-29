import { Contract, ethers, BigNumber } from 'ethers'

class ContractAPI {
  constructor({ config, provider }) {
    const { contracts, chainId } = config;

    this.config = config;
    this.provider = new ethers.providers.Web3Provider(provider, chainId);
    this.signer = this.provider.getSigner(0);
    this.contracts = {};
    Object.entries(contracts).forEach(([name, contract]) => {
      this.contracts[name] = new Contract(contract.address, contract.abi, this.provider);
      this.contracts[name] = this.contracts[name].connect(this.signer);
    });
  }

  async approveAll(owner) {
    const breederAddr = this.config.contracts['Breeder'].address;
    const miniMarketAddr = this.config.contracts['MiniMarket'].address;
    const MAX_VALUE = BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

    const mvDollarAllowance = await this.contracts['Mvdollar'].allowance(owner, breederAddr);
    if (mvDollarAllowance.eq(0)) {
      await this.contracts['Mvdollar'].approve(breederAddr, MAX_VALUE);
    }

    const mvGLDAllowance = await this.contracts['MVGLD'].allowance(owner, breederAddr);
    if (mvGLDAllowance.eq(0)) {
      await this.contracts['MVGLD'].approve(breederAddr, MAX_VALUE);
    }

    const mvGLDMarketAllowance = await this.contracts['MVGLD'].allowance(owner, miniMarketAddr);
    if (mvGLDMarketAllowance.eq(0)) {
      await this.contracts['MVGLD'].approve(miniMarketAddr, MAX_VALUE);
    }

    if (!(await this.contracts['MiniMarket'].isApprovedForAll(owner, breederAddr))) {
      await this.contracts['MiniMarket'].setApprovalForAll(breederAddr, true);
    }
  }

  async getGenesisNFTItems(owner) {
    const chillaTokenIds = await this.contracts['Chilla'].walletOfOwner(owner);
    const guineaTokenIds = await this.contracts['Guinea'].walletOfOwner(owner);
    const landTokenIds = await this.contracts['Land'].walletOfOwner(owner);

    const chillaTokens = await Promise.all(chillaTokenIds.map(async (tokenId) => {
      return {
        tokenType: 'Chilla',
        tokenId: tokenId.toNumber(),
        tokenURI: await this.contracts['Chilla'].tokenURI(tokenId.toNumber())
      }
    }));
    const guineaTokens = await Promise.all(guineaTokenIds.map(async (tokenId) => {
      return {
        tokenType: 'Guinea',
        tokenId: tokenId.toNumber(),
        tokenURI: await this.contracts['Guinea'].tokenURI(tokenId.toNumber())
      }
    }));
    const landTokens = await Promise.all(landTokenIds.map(async (tokenId) => {
      return {
        tokenType: 'Land',
        tokenId: tokenId.toNumber(),
        tokenURI: await this.contracts['Land'].tokenURI(tokenId.toNumber())
      }
    }));

    return [
      ...chillaTokens,
      ...guineaTokens,
      ...landTokens
    ]
  }


  async getMiniFrenNFTItems(owner) {
    const miniFrenTokenIds = await this.contracts['Breeder'].walletOfOwner(owner);
    const miniFrenTokens = await Promise.all(miniFrenTokenIds.map(async (tokenId) => {
      return {
        tokenType: 'Fren',
        tokenId:  tokenId.toNumber(),
        tokenGen: await this.getGeneration(tokenId),
        tokenBaseLevel: await this.getBaseLevel(tokenId),
        tokenURI: await this.contracts['Breeder'].tokenURI(tokenId.toNumber())
      }
    }));
    return miniFrenTokens;
  }

  async getGenesisNFTItemLevel(tokenId, tokenType) {
    const contract = this.contracts['MiniMarket'];

    if (tokenType === 'Chilla') {
      return await contract.genesisLevelCheckChilla(tokenId);
    } else if (tokenType === 'Guinea') {
      return await contract.genesisLevelCheckGuinea(tokenId);
    } else if (tokenType === 'Land') {
      return await contract.genesisLevelCheckLand(tokenId);
    }
  }
  
  async levelUpGenesisNFTItem(tokenId, tokenType) {
    const contract = this.contracts['MiniMarket'];

    if (tokenType === 'Chilla') {
      await contract.genesisLevelUpChillaInterface(tokenId);
    } else if (tokenType === 'Guinea') {
      await contract.genesisLevelUpGuineaInterface(tokenId);
    } else if (tokenType === 'Land') {
      await contract.genesisLevelUpLandInterface(tokenId);
    }
  }

  async mintFren(tokenId, tokenType) {
    const contract = this.contracts['Breeder'];

    if (tokenType === 'Chilla') {
      await contract.mintChilla(tokenId);
    } else if (tokenType === 'Guinea') {
      await contract.mintGuinea(tokenId);
    } else if (tokenType === 'Fren') {
      await contract.mintFren(tokenId);
    }
  }

  async clearBlacklist(tokenId, tokenType) {
    const contract = this.contracts['Breeder'];

    if (tokenType === 'Chilla') {
      await contract.clearBlacklist2(tokenId);
    } else if (tokenType === 'Guinea') {
      await contract.clearBlacklist1(tokenId);
    } else if (tokenType === 'Fren') {
      await contract.clearBlacklist3(tokenId);
    }
  }

  async checkBlacklist(tokenId, tokenType) {
    const contract = this.contracts['Breeder'];

    if (tokenType === 'Chilla') {
      return await contract.checkBlacklist2(tokenId);
    } else if (tokenType === 'Guinea') {
      return await contract.checkBlacklist1(tokenId);
    } else if (tokenType === 'Fren') {
      return await contract.checkBlacklist3(tokenId);
    }
  }

  async getBaseLevel(tokenId) {
    return await this.contracts['Breeder'].baseLevelCheck(tokenId);
  }

  async getJobLevel(tokenId) {
    return await this.contracts['Breeder'].jobLevelCheck(tokenId);
  }

  async getHeistLevel(tokenId) {
    return await this.contracts['Breeder'].fusionLevelCheck(tokenId);
  }

  async getGeneration(tokenId) {
    return await this.contracts['Breeder'].generationCheck(tokenId);
  }

  async baseLevelUp(tokenId) {
    return await this.contracts['Breeder'].frenLevelUp(tokenId);
  }

  async jobLevelUp(tokenId) {
    return await this.contracts['Breeder'].jobLevelUp(tokenId);
  }

  async fusionLevelUp(burning, leveling) {
    return await this.contracts['Breeder'].fusionLevelUp(burning, leveling);
  }

  async claimMVGLD(tokenIds) {
    return await this.contracts['MVGLD'].claim(tokenIds);
  }

  async getClaimable(tokenId) {
    return await this.contracts['MVGLD'].getClaimable(tokenId);
  }
  
  async mintFusionLevelUp(tokenId) {
    return await this.contracts['MiniMarket'].mintFusionLevelUp(tokenId);
  }

  async fusionClaimed(tokenId, heistLevel) {
    return await this.contracts['MiniMarket'].fusionClaimed(tokenId, heistLevel);
  }

  async getAccountInfos(account) {
    return {
      MvGLD: (await this.contracts['MVGLD'].balanceOf(account)).div(BigNumber.from('1000000000000000000')).toString(),
      MvDOLLAR: (await this.contracts['Mvdollar'].balanceOf(account)).div(BigNumber.from('1000000000000000000')).toString(),
      MiniCandy: (await this.contracts['MiniMarket'].balanceOf(account, 0)).toString(),
      MiniCoffe: (await this.contracts['MiniMarket'].balanceOf(account, 1)).toString(),
      MiniManual: (await this.contracts['MiniMarket'].balanceOf(account, 2)).toString()
    }
  }

  async getFruits(account) {
    return {
      BlueBerry: (await this.contracts['MiniMarket'].balanceOf(account, 3)).toString(),
      Grape: (await this.contracts['MiniMarket'].balanceOf(account, 4)).toString(),
      Apple: (await this.contracts['MiniMarket'].balanceOf(account, 5)).toString(),
      Watermelon: (await this.contracts['MiniMarket'].balanceOf(account, 6)).toString()
    }
  }

  async buyMiniItems(title, amount) {
    const contract = this.contracts['MiniMarket'];

    if (title === '6 mvgld MiniCandy') {
      await contract.mintMiniCandy(amount);
    } else if (title === '10 mvgld MiniCoffe') {
      await contract.mintUnBlacklist(amount);
    } else if (title === '20 mvgld MiniManual') {
      await contract.mintJobLevelUp(amount);
    }
  }

  async getNFTsInWallet(address, nftContract) {
    const tokenIds = await this.contracts[nftContract].walletOfOwner(address);

    return await Promise.all(tokenIds.map(async tokenId => {
        return {
          tokenId,
          metaDataJson: await this.contracts[nftContract].tokenURI(tokenId),
        };
      })
    );
  }
  
  async getNFTsStaked(address, nftContract, stakingContract) {
    const tokenIds = await this.contracts[stakingContract].depositsOf(address);

    return await Promise.all(tokenIds.map(async tokenId => {
        return {
          tokenId,
          metaDataJson: await this.contracts[nftContract].tokenURI(tokenId),
        };
      })
    );
  }

  async getNFTsLandStaked(address) {
    const tokenIds = await this.contracts['Land Staking'].depositsOf(address);

    return await Promise.all(tokenIds.map(async tokenId => {
        return {
          tokenId,
          metaDataJson: await this.contracts['Land'].tokenURI(tokenId),
        };
      })
    );
  }

  async nftTotalSupply(contract = 'WalletNFT') {
    const totalSupply = await this.contracts[contract].totalSupply();
    return totalSupply.toNumber();
  }

  async nftStakedTotalSupply(contract = 'StakingNFT') {
    const totalSupply = await this.provider.getBalance(this.config.contracts[contract].address);
    console.log(this.config.contracts[contract].address);
    return totalSupply.toNumber();
  }

  async calculateReward(address, tokenId, contract = 'StakingNFT') {
    const reward = await this.contracts[contract].calculateReward(address, tokenId);

    return reward.toString();
  }

  async unStake(tokenId, contract = 'StakingNFT') {
    await this.contracts[contract].withdraw([tokenId]);
  }

  async claim(tokenIds, contract = 'StakingNFT') {
    await this.contracts[contract].claimRewards(tokenIds);
  }

  async stakeNfts(tokenIds, contract = 'StakingNFT') {
    console.log("Token Ids:", tokenIds);
    await this.contracts[contract].deposit(tokenIds);
  }

  async approve(nftContract, stakingContract) {
    const stakingAddress = this.config.contracts[stakingContract].address;

    await this.contracts['MVGLD'].approve(stakingAddress, BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'));
    await this.contracts['Mvdollar'].approve(stakingAddress, BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'));
    await this.contracts[nftContract].setApprovalForAll(stakingAddress, true);
  }

  async landStakingClaim1() {
    await this.contracts['LandStakingv1'].claimEmissions1();
  }

  async landStakingClaim2() {
    await this.contracts['LandStakingv1'].claimEmissions2();
  }

  async getLandNFTsInWallet(address) {
    const tokenIds = await this.contracts['Land'].walletOfOwner(address);

    return await Promise.all(tokenIds.map(async tokenId => {
        return {
          tokenId,
          metaDataJson: await this.contracts['Land'].tokenURI(tokenId),
        };
      })
    );
  }
}

export default ContractAPI;