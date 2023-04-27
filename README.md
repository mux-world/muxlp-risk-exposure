# MUXLP Delta Values

## Rationale

The liquidity pool on MUX (MUXLP pool) holds a portfolio of assets; thus, MUXLP stakers have risk exposure on ETH, BTC and other pooled assets. In addition, the MUXLP pool is the counterparty of traders, and the pool will hold positions against traders in the opposite direction. Therefore, MUXLP stakers will also have risk exposure on trader’s positions.

The following code example shows how to calculate LP exposure.

## How to use

```
npm install
node main.js
```

Example output:

```
Delta values per MUXLP
0.0000810098058726581 ETH
0.00000379198364680385 BTC
0.00988380425627444653 ARB
0.20944254208111257074 USDC
0.13424012785159929369 USDT
...
```

The above list represents the delta values of 1 MUXLP, in terms of the risk metric called delta (Δ), which estimates the price change of MUXLP. For instance, if the price of ETH increases by $1, the price of MUXLP is expected to rise by $0.0000810098058726581.

