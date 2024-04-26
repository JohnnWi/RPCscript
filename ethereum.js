// Importa la libreria web3
const { Web3 } = require('web3');
// Crea un'istanza di web3 con un provider
const web3 = new Web3("https://eth1.lava.build/lava-referer-ae3ff08f-5167-4cb0-9e6c-bf8ea9cbe09d/");
// Imposta una variabile per il contatore
let counter = 0;

// Definisci una funzione che richieda i dati di ethereum
async function getEthereumData() {
  // Usa il metodo web3.eth.getBlockNumber per ottenere il numero del blocco corrente
  const blockNumber = await web3.eth.getBlockNumber();
  // Stampa il numero del blocco
  console.log("Il numero del blocco di ethereum è: " + blockNumber);

  // Usa il metodo web3.eth.getGasPrice per ottenere il prezzo medio del gas
  const gasPrice = await web3.eth.getGasPrice();
  // Converte il prezzo del gas da wei a ether
  const gasPriceEther = web3.utils.fromWei(gasPrice, "ether");
  // Stampa il prezzo del gas
  console.log("Il prezzo medio del gas è: " + gasPriceEther + " ether");

  // Incrementa il contatore di uno
  counter++;
  // Stampa il contatore
  console.log("Il contatore è: " + counter);
}

// Definisci una funzione che esegua il ciclo ogni 45 secondi
function loop() {
  // Chiama la funzione getEthereumData e gestisci gli eventuali errori
  getEthereumData()
    .then(() => {
      // Se non ci sono errori, imposta un timer per richiamare la funzione loop dopo 45 secondi
      setTimeout(loop, 35000);
    })
    .catch((error) => {
      // Se c'è un errore, stampa l'errore
      console.error(error);
      // Imposta un timer per richiamare la funzione loop dopo 60 secondi
      setTimeout(loop, 50000);
    });
}

// Chiama la funzione loop per avviare il ciclo
loop();
