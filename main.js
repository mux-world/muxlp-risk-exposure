const { getReaderContract, getChainStorage, PreMinedTokenTotalSupply } = require('@mux-network/mux.js')
const ethers = require('ethers')
const BigNumber = require('bignumber.js')

const providerConfigs = [
  { url: 'https://arb1.arbitrum.io/rpc', chainId: 42161 },
  { url: 'https://api.avax.network/ext/bc/C/rpc', chainId: 43114 },
  { url: 'https://bsc-dataseed1.binance.org', chainId: 56 },
  { url: 'https://rpc.ftm.tools/', chainId: 250 },
  { url: 'https://mainnet.optimism.io', chainId: 10 }
]

async function main() {
  const { multiChainLiquidity, muxlpTotalSupply } = await getMultiChainLiquidity()

  console.log("LP exposure without trader's position per MUXLP")
  for (let symbol in multiChainLiquidity) {
    const lpExposure = multiChainLiquidity[symbol].lpBalance.div(muxlpTotalSupply)
    console.log(lpExposure.toFixed(), symbol)
  }
  
  console.log("")
  console.log("LP exposure with trader's position per MUXLP")
  for (let symbol in multiChainLiquidity) {
    const lpExposure = multiChainLiquidity[symbol].lpBalance.div(muxlpTotalSupply)
    const traderExposure = multiChainLiquidity[symbol].totalShortPosition.minus(multiChainLiquidity[symbol].totalLongPosition).div(muxlpTotalSupply)
    console.log(lpExposure.plus(traderExposure).toFixed(), symbol)
  }
}

function getEmptyAsset() {
  return {
    isStable: false,
    lpBalance: new BigNumber(0),
    totalLongPosition: new BigNumber(0),
    totalShortPosition: new BigNumber(0),
  }
}

async function getMultiChainLiquidity() {
  const multiChainLiquidity = {}

  let muxlpTotalSupply = new BigNumber(PreMinedTokenTotalSupply)
  for (const providerConfig of providerConfigs) {
    const provider = new ethers.providers.StaticJsonRpcProvider(providerConfig.url, providerConfig.chainId)
    const singleChainLpDeduct = await getSingleChainLiquidity(provider, multiChainLiquidity)
    muxlpTotalSupply = muxlpTotalSupply.minus(singleChainLpDeduct)
  }

  for (const symbol in multiChainLiquidity) {
    if (!multiChainLiquidity[symbol].isStable) {
      multiChainLiquidity[symbol].lpBalance = multiChainLiquidity[symbol].lpBalance.minus(PreMinedTokenTotalSupply)
    }
  }

  return {
    multiChainLiquidity,
    muxlpTotalSupply,
  }
}

async function getSingleChainLiquidity(provider, multiChainLiquidity) {
  const reader = await getReaderContract(provider)
  const state = await getChainStorage(reader)

  for (const asset of state.assets) {
    if (!(asset.symbol in multiChainLiquidity)) {
      multiChainLiquidity[asset.symbol] = getEmptyAsset()
    }
    const liquidity = multiChainLiquidity[asset.symbol]
    liquidity.isStable = asset.isStable
    liquidity.lpBalance = liquidity.lpBalance
      .plus(asset.spotLiquidity)
      .minus(asset.collectedFee)
      .plus(asset.credit)
    if (!asset.isStable) {
      liquidity.lpBalance = liquidity.lpBalance.plus(asset.deduct)
    }
    liquidity.totalLongPosition = liquidity.totalLongPosition.plus(asset.totalLongPosition)
    liquidity.totalShortPosition = liquidity.totalShortPosition.plus(asset.totalShortPosition)
  }

  for (const dex of state.dexes) {
    dex.assetIds.forEach((assetId, i) => {
      const symbol = state.assets[assetId].symbol
      const liquidity = multiChainLiquidity[symbol]
      liquidity.lpBalance = liquidity.lpBalance.plus(dex.liquidityBalance[i])
    })
  }

  return state.lpDeduct
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('error', error)
    process.exit(1)
  })
