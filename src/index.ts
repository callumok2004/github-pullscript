import { exec } from "child_process";
import express from "express";

const app = express(),
  sites = {
    dev: "/var/path/to/dir"
  },
  requestAuth = "SOME_RANDOM_STRING";

app.post("/pull", (req, res) => {
  if (req.query.token !== requestAuth) return res.json({ response: false, message: "Authentication failed." });

  let path;

  if (req.query.type === "site") path = sites[req.query.site];
  else return res.json({ response: false, message: "Invalid site." });

  exec(`cd ${path} && git pull`, (err, stdout, stderr) => {
    if (err) return res.json({ response: false, message: "Unable to pull.", error: stderr, out: stdout });

    res.json({ response: true, message: "Pulled successfully." });
  });
});

app.listen(1111, () => console.log(`App listening on port 1111.`));