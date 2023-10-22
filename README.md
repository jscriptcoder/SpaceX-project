# SpaceX project
This project consist of two pages:
1. **Home**, where you can search and navigate through different Star War entienes: People, Planets, Starships, Species and Vehicles. It allows you to search by name and filter by category (or entity). Makes use of the public API [Swapi](https://swapi.dev/).
2. **Deposits**, where you can watch the latest deposits happening in the [Ethereum staking contract](https://etherscan.io/address/0x00000000219ab540356cBB839Cbe05303d7705Fa). The user must have their wallet connected to the Ethereum mainnet network to be able to view this page.

Latest deployment: https://space-x-project-seven.vercel.app/

## Getting Started

First, install all the dependencies:
```bash
$ npm install
```

Next, you have to rename **.env.example** to **.env.loca** and populate the env vars with values.

Lastly, run the development server:
```bash
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for production

Run the following:
```bash
$ npm run build
```

### Tests

To run the unit tests:
```bash
$ npm test
```
