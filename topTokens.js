import Web3 from "web3";
import fs from "fs";

// Initialize Web3 with a provider (like Infura or a local node)
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/your_infura_project_id"
  )
);

// Replace with your contract address
const contractAddress = "0x123...";

// Load ABI from external file
const abiFile = "./abi.json";
const abi = JSON.parse(fs.readFileSync(abiFile));

// Instantiate the contract object
const contract = new web3.eth.Contract(abi, contractAddress);

// Fetch name and symbol
async function fetchNameAndSymbol() {
  try {
    const name = await contract.methods.name().call();
    const symbol = await contract.methods.symbol().call();
    console.log("Contract Name:", name);
    console.log("Contract Symbol:", symbol);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the function to fetch data
fetchNameAndSymbol();
