const axios = require("axios");
const axiosThrottle = require("axios-request-throttle");
const axiosRetry = require("axios-retry");
const jq = require("node-jq");

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});
axiosThrottle.use(axios, { requestsPerSecond: 5 });

function printHelpAndQuit() {
  console.log("Warframe Market Guard");
  console.log("Simple script that scan your offers and display offers");
  console.log("that are the cheapest on the market. Then you should");
  console.log("probably rise price up :)");

  console.log("\nSignature:");
  console.log("🐧 node index.js <nickname>");

  console.log("\nExample usage:");
  console.log("🐧 node index.js Hagisus");

  process.exit(1);
}

function makeRequest(url, filter) {
  const jq_options = { input: "json" };
  return axios
    .get(url)
    .then((result) => result.data)
    .then((data) => jq.run(filter, data, jq_options));
}

function getOrdersOfUser(username) {
  const url = `https://api.warframe.market/v1/profile/${username}/orders`;
  const jqFilter = `[.payload.sell_orders[] | {
      id: .item.url_name,
      platinum: .platinum,
      visible: .visible,
      quantity: .quantity
  }]`;

  return makeRequest(url, jqFilter);
}

function getLastOrdersOfItem(itemID) {
  const url = `https://api.warframe.market/v1/items/${itemID}/orders/top`;
  const jqFilter = `[.payload.sell_orders[] | {
      platinum: .platinum,
      quantity: .quantity
  }] | sort_by( .platinum )`;

  return makeRequest(url, jqFilter);
}

function printNaiveAuction(auctions) {
  const toTableTransformer = (a) => {
    try {
      return {
        id: a.id,
        "Your price": a.platinum,
        "Cheapest on market":
          a.auctions[0]?.platinum || "No other offers / error",
      };
    } catch (err) {
      console.error(`Bonked by: ${JSON.stringify(a)}`);
    }
  };
  const naiveAuctionsFilter = (a) => {
    //if there are only your auction
    //you can probably rise the price up
    if (a.auctions.length == 0) return true;

    //someone is selling cheaper!!
    if (a.platinum < a.auctions[0].platinum) return true;

    return false;
  };

  const naiveAuctions = auctions.filter(naiveAuctionsFilter);
  const goodAuctions = auctions.filter((a) => !naiveAuctionsFilter(a));

  console.log("Your bad offers: ");
  console.table(naiveAuctions.map(toTableTransformer));

  console.log("\nYour good offers: ");
  console.table(goodAuctions.map(toTableTransformer));
}

async function main(username) {
  const myOrders = JSON.parse(await getOrdersOfUser(username));
  const globalOrders = await Promise.all(
    myOrders.map(async (order) => {
      const orders = await getLastOrdersOfItem(order.id);

      let auctions = [];
      try {
        auctions = JSON.parse(orders);
      } catch (err) {
        console.error(`Can't parse orders for ${order.id}`);
      }
      return {
        ...order,
        auctions,
      };
    })
  );

  try {
    printNaiveAuction(globalOrders);
  } catch (err) {
    console.error(err);
  }
}

const username = process.argv[2];
if (!username) {
  console.error("Please provide the username!");
  printHelpAndQuit();
}

main(username);
