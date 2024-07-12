import express from "express";
import bodyParser from "body-parser";
import { auditSmartContract } from "./auditService.js";
import open from "open";
import cors from "cors"; // Import CORS package

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors()); // Enable CORS for all origins

// Routes
app.post("/audit", async (req, res) => {
  const { contractAddress } = req.body;
  try {
    const auditResult = await auditSmartContract(contractAddress);
    res.json(auditResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  open(`http://localhost:${port}`);
});
