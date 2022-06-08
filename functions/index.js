import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { addDestination, getAllDestinations } from "./src/destinations";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  req.send("🔥 This is working");
});

app.get("/destinations", getAllDestinations);
app.get("/destinations", addDestination);

export const api = functions.https.onRequest(app);
