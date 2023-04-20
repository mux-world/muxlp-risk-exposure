# MUXLP Risk Exposure Calculator

## Rationale

The liquidity pool on MUX (MUXLP pool) holds a portfolio of assets; thus, MUXLP stakers have risk exposure on ETH, BTC and other pooled assets. In addition, the MUXLP pool is the counterparty of traders, and the pool will hold positions against traders in the opposite direction. Therefore, MUXLP stakers will also have risk exposure on trader’s positions.

The following code example shows how to calculate both LP exposure and position exposure.

## How to use

```
npm install
node main.js
```

Example output:

```
LP exposure without trader's position per MUXLP
0.00015144490643590913 ETH
0.00000462201438306677 BTC
0.07469286750783622934 ARB
0.20944254208111257074 USDC
0.13424012785159929369 USDT
...

LP exposure with trader's position per MUXLP
0.0000810098058726581 ETH
0.00000379198364680385 BTC
0.00988380425627444653 ARB
0.20944254208111257074 USDC
0.13424012785159929369 USDT
...
```

The output means if you hold 1 MUXLP, it is equivalent to hold 0.00015 ETH + 0.0000046 BTC + ... when you only consider the pool liquidity, or hold 0.000081 ETH + 0.0000037 BTC + ... when you consider both the pool liquidity and trader's positions.
