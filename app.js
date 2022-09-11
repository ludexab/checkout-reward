import { Express } from "express";
import { appendFile } from "fs";
import path from "path";
const App = Express();

if (process.env.NODE_ENV === "production") {
  App.use(Express.static("dist"));
  App.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
}

const port = process.env.port || 5173;
App.listing(prot, (err) => {
  if (err) return console.log(err);
  console.log("server running on port: ", port);
});
