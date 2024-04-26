const { AxelarGMPRecoveryAPI, Environment } = require("@axelar-network/axelarjs-sdk");

let callCount = 0;

async function queryTxStatus() {
  const sdk = new AxelarGMPRecoveryAPI({
    axelarRpcUrl: "https://tm.axelar.lava.build/lava-referer-ae3ff08f-5167-4cb0-9e6c-bf8ea9cbe09d/",
    environment: Environment.MAINNET,
  });

  const txHash = "0x7a81fb8293d143b1d7c81d737784fb204645f62247ef6348a6166dab165bebc2";
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
