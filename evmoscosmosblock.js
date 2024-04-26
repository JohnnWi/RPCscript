const { SigningStargateClient } = require('@cosmjs/stargate');

// Replace 'yourRpcUrl' with the actual RPC URL for Evmos
const evmosRpcUrl = 'https://tm.evmos.lava.build/lava-referer-ae3ff08f-5167-4cb0-9e6c-bf8ea9cbe09d/';

let counter = 0;

async function getEvmosData() {
  try {
    // Create a Stargate client without a signer
    const client = await SigningStargateClient.connect(evmosRpcUrl);

    // Use the client to query the latest block information
    const latestBlockHeight = await client.getHeight();

    // Print block details
    console.log('Evmos Block Height:', latestBlockHeight);

    // Increment the counter by one
    counter++;
    // Print the counter
    console.log('The counter is:', counter);

  } catch (error) {
    console.error('Error retrieving Evmos data:', error);
  }
}

// Define a function to run the loop every 45 seconds
function loop() {
  // Call the getEvmosData function and handle any errors
  getEvmosData()
    .then(() => {
      // If there are no errors, set a timer to call the loop function after 45 seconds
      setTimeout(loop, 35000);
    })
    .catch((error) => {
      // If there is an error, print the error
      console.error(error);
      // Set a timer to call the loop function after 60 seconds
      setTimeout(loop, 50000);
    });
}

// Call the loop function to start the loop
loop();