const axios = require('axios')
const BigNumber = require('bignumber.js')

async function main() {
  const response = await axios.get('https://app.mux.network/api/liquidityAsset')
  const totalMlp = new BigNumber(response.data['muxLPTotalBalance'])
  for (let asset of response.data['assets']) {
    const symbol = asset['symbol']
    const lpExposure = new BigNumber(asset['lpBalance']).plus(asset['credit']).div(totalMlp)
    const traderExposure = new BigNumber(asset['shorts']).minus(asset['longs']).div(totalMlp)
    console.log(
      'LP exposure:', lpExposure.toFixed(), symbol, 'per MUXLP.',
      'LP+Trader exposure:', lpExposure.plus(traderExposure).toFixed(), symbol, 'per MUXLP'
    )
  }
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('error', error)
    process.exit(1)
  })
