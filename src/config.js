const config = {
  chainId: 250,
  defaultProvider: 'https://rpc.ftm.tools/',
  contracts: require("./contract_api/contract_info.json"),
  claimRates1: [
    1.00,
    4.00,
    7.00,
    15.00,
    18.00,
    33.00,
    39.00,
    45.00,
    51.00,
    73.00,
    82.00,
    91.00,
    100.00,
  ],
  claimRates2: {
    0: [
      1.25,
      5.00,
      8.75,
      12.50
    ],
    2: [
      4.12,
      12.31,
      21.55,
      30.79
    ],
    3: [
      7.75,
      21.54,
      37.70,
      53.86
    ],
    4: [
      15.00,
      40.00,
      70.00,
      100.00
    ]
  },
};

export default config;