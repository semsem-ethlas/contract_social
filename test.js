import axios from "axios";
import { openaiApiKey, etherscanApiKey } from "./config.js";
import { Configuration, OpenAIApi } from "openai";

// Create OpenAI configuration
const configuration = new Configuration({
  apiKey: openaiApiKey,
});

// Create OpenAI API instance
const openai = new OpenAIApi(configuration);

export async function auditSmartContract(address) {
  try {
    const etherscanResponse = await axios.get(`https://api.etherscan.io/api`, {
      params: {
        module: "contract",
        action: "getsourcecode",
        address: address,
        apikey: etherscanApiKey,
      },
    });

    console.log("Etherscan response:", etherscanResponse.data);

    if (etherscanResponse.data.status !== "1") {
      throw new Error("Failed to fetch contract source code from Etherscan");
    }

    const sourceCode = etherscanResponse.data.result[0].SourceCode;
    const ContractName = etherscanResponse.data.result[0].ContractName;
    const chatGPTAnalysis = await analyzeWithChatGPT(sourceCode, ContractName);

    return chatGPTAnalysis;
  } catch (error) {
    console.error(`Error auditing address ${address}:`, error.message);
    throw new Error(`Failed to fetch contract source code: ${error.message}`);
  }
}

async function analyzeWithChatGPT(sourceCode, ContractName) {
  // const prompt = `Analyze the following Solidity smart contract code and identify any potential vulnerabilities. Provide detailed explanations and suggested fixes for each vulnerability.\n\n${sourceCode}`;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4-0613",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that helps analyze Solidity smart contracts.",
        },
        {
          role: "user",
          content: `You are a smart contract auditor. Analyze the following Solidity code if it's contain a modifiers, and if there's any write function using these modifiers.\n\n${sourceCode} \n\n after that please use the contract name address: ${ContractName} to find the contract main web page and contact page and person and provide all sociall network related to it`,
        },
      ],
    });

    console.log("OpenAI response:", response.data);

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error analyzing with ChatGPT:", error);
    throw new Error(`Failed to analyze with ChatGPT: ${error.message}`);
  }
}
