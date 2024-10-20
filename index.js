import express from "express";

import { JSONFilePreset } from "lowdb/node";

const app = express();

const PORT = 3000;

const db = await JSONFilePreset("db.json", { responses: [] });

app.use(express.static("public"));
app.use(express.json());

app.listen(PORT, async () => {
  console.log(`Now listening on port ${PORT}`);
});

app.post("/submit", async (req, res) => {
  const { input } = req.body;
  await db.update(({ responses }) => responses.push(input));
  res.send(db.data.responses);
});
