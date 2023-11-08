# Warframe Market Guard

**Warframe Market Guard** is a script that scan your sale orders on [warframe.market](https://warframe.market/) and display other offers of the same items.
The app helps you keep an eye on market changes and update your offers more easily.
Results are sorted into two groups:

- Good offer - if your auction is not the cheapest on the market
- Bad offer - otherwise (even if your offer is much more expensive than others)

The scripts doesn't need any authorization.
Publicly accesible, undocumented API endpoints are used.
You can easily scan someone else profile if you want.

## Demo

```bash
🐧 npm start Hagisus

> warframe-market-guard@1.0.0 start
> node index.js "Hagisus"

Your bad offers:
┌─────────┬─────────────────────────┬────────────┬────────────────────┐
│ (index) │           id            │ Your price │ Cheapest on market │
├─────────┼─────────────────────────┼────────────┼────────────────────┤
│    0    │   'soma_prime_stock'    │     19     │         20         │
│    1    │ 'karak_wraith_receiver' │     15     │         19         │
│    2    │   'purifying_flames'    │     59     │         60         │
└─────────┴─────────────────────────┴────────────┴────────────────────┘

Your good offers:
┌─────────┬────────────────────────────────┬────────────┬────────────────────┐
│ (index) │               id               │ Your price │ Cheapest on market │
├─────────┼────────────────────────────────┼────────────┼────────────────────┤
│    0    │    'twin_vipers_wraith_set'    │     58     │         54         │
│    1    │ 'twin_vipers_wraith_blueprint' │     15     │         12         │
│    2    │   'twin_vipers_wraith_link'    │     18     │         13         │
│    3    │    'trinity_prime_systems'     │     14     │         10         │
│    4    │  'furax_wraith_left_gauntlet'  │     9      │         7          │
│    5    │     'latron_wraith_barrel'     │     49     │         15         │
│    6    │      'modified_munitions'      │     10     │         4          │
│    7    │      'waveband_disruptor'      │     10     │         5          │
│    8    │         'augur_seeker'         │     9      │         8          │
└─────────┴────────────────────────────────┴────────────┴────────────────────┘
```

## Installation and usage

### Prerequests

[Node.js](https://nodejs.org/) environment installed.
Tested on `Node v16.6.0` and `npm 8.11.0`

```bash
# clone the repo
🐧 git clone https://github.com/KGrzeg/warframe-market-guard.git

# install dependencies
🐧 npm install

# run script
🐧 npm start <your_nickname>
```

## License

[MIT](https://github.com/KGrzeg/warframe-market-guard/blob/master/LICENSE)
