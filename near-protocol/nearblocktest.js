// Importo la libreria near api js
const { providers } = require("near-api-js");

//network config (replace testnet with mainnet or betanet)
const provider = new providers.JsonRpcProvider(
  "https://near-testnet.lava.build/lava-referer-ae3ff08f-5167-4cb0-9e6c-bf8ea9cbe09d/"
);

// Creo una variabile globale per il contatore
let counter = 0;

// Definisco una funzione asincrona per ottenere il numero del blocco
async function getBlockNumber() {
  try {
    // Ottengo il blocco corrente dalla rete
    const block = await provider.block({ finality: "final" });
    // Stampo il numero del blocco e il contatore
    console.log("Block number:", block.header.height, "Counter:", counter);
    // Incremento il contatore
    counter++;
  } catch (error) {
    // Gestisco eventuali errori
    console.error(error);
    // Aspetto 40 secondi prima di riprovare
    await new Promise(resolve => setTimeout(resolve, 40000));
  }
}

// Definisco una funzione per ripetere il ciclo ogni 20 secondi
function repeatCycle() {
  // Invoco la funzione per ottenere il numero del blocco
  getBlockNumber();
  // Imposto un timer per richiamare la funzione dopo 20 secondi
  setTimeout(repeatCycle, 20000);
}

// Avvio il ciclo
repeatCycle();
