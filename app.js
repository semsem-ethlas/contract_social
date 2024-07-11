import express from "express";
import bodyParser from "body-parser";
import { auditSmartContract } from "./auditService.js";
import open from "open";

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("../audit", async (req, res) => {
  const { contractAddress } = req.body;
  try {
    const auditResult = await auditSmartContract(contractAddress);
    res.json(auditResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  open(`http://localhost:${port}`);
});
