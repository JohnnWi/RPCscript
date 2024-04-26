const { providers } = require("near-api-js");

//network config (replace testnet with mainnet or betanet)
const provider = new providers.JsonRpcProvider(
  "https://near.lava.build/lava-referer-ae3ff08f-5167-4cb0-9e6c-bf8ea9cbe09d/"
);

const TX_HASH = "6kFKWRqCZE3HohdFq77XEcquqZntTNHc8JzNKbXFY7Yy";
// account ID associated with the transaction
const ACCOUNT_ID = "sender.testnet";

// declare a counter variable
let counter = 0;

// declare a timer variable
let timer = null;

// define a function to start the timer
function startTimer() {
  // set the timer to call getState every 10 seconds
  timer = setInterval(() => {
    getState(TX_HASH, ACCOUNT_ID);
  }, 20000);
}

// define a function to stop the timer
function stopTimer() {
  // clear the timer
  clearInterval(timer);
}

async function getState(txHash, accountId) {
  try {
    // increment the counter
    counter++;

    // get the result from the provider
    const result = await provider.txStatus(txHash, accountId);

    // log the result and the counter
    console.log("Result: ", result);
    console.log("Counter: ", counter);

    // reset the counter
    counter += 0;
  } catch (error) {
    // log the error
    console.error("Error: ", error);

    // stop the timer
    stopTimer();

    // wait for 20 seconds
    await new Promise((resolve) => setTimeout(resolve, 40000));

    // restart the timer
    startTimer();
  }
}

// start the timer
startTimer();
