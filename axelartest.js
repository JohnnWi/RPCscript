const { AxelarGMPRecoveryAPI, Environment } = require("@axelar-network/axelarjs-sdk");

let callCount = 0;

async function queryTxStatus() {
  const sdk = new AxelarGMPRecoveryAPI({
    axelarRpcUrl: "https://tm.axelar-testnet.lava.build/lava-referer-ae3ff08f-5167-4cb0-9e6c-bf8ea9cbe09d/",
    environment: Environment.TESTNET,
  });

  const txHash = "0x96333dbf51017992a4260b0a83c0cbb3b835b9c8885345c629713427705ddb86";
  try {
    const result = await sdk.queryTransactionStatus(txHash);

    callCount++;
    console.log(result.status);
    console.log(`Chiamata numero: ${callCount}`)

    setTimeout(queryTxStatus, 15000);
  } catch (error) {
    console.error(error);
    setTimeout(queryTxStatus, 10000);
  }
}

queryTxStatus();
