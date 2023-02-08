# MUXLP Risk Exposure Calculator

## Rationale

The liquidity pool on MUX holds a portfolio of assets, thus MUXLP stakers have risk exposure on ETH, BTC, etc. On the other hand, the MUXLP pool is the counterparty of traders, the pool will hold positions against traders in the opposite direction, MUXLP stakers will also have risk exposure on trader's positions.

In this code example, we show how to calculate both LP exposure and position exposure.

## How to use

```
npm install
node main.js
```

Example output:

```
LP exposure: 0.00018639271630371444 ETH per MUXLP.  LP+Trader exposure 0.00014537781178226221 ETH per MUXLP.
LP exposure: 0.00000587356147538440 BTC per MUXLP.  LP+Trader exposure 0.00000539707892698411 BTC per MUXLP.
LP exposure: 0.00097308311647221601 AVAX per MUXLP. LP+Trader exposure 0.00084693954484690035 AVAX per MUXLP.
LP exposure: 0.00006169916213045899 BNB per MUXLP.  LP+Trader exposure 0.00006571107537208727 BNB per MUXLP.
LP exposure: 0.02713897503985868554 FTM per MUXLP.  LP+Trader exposure 0.00540661135742698940 FTM per MUXLP.
LP exposure: 0.01335454655238281779 OP per MUXLP.   LP+Trader exposure 0.01303803265281304572 OP per MUXLP.
```

The output means if you holds 1 MUXLP, it is equivalent to holding 0.00018 ETH + 0.0000058 BTC + ... when you only consider the pool liquidity, or holding 0.00014 ETH + 0.0000053 BTC + ... when you consider both the pool liquidity and trader's positions.
