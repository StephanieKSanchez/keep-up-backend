import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {
  addDestination,
  deleteDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  updateDestinationCategory,
} from "./src/destinations.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  req.send("🔥 This is working");
});

app.get("/destinations", getAllDestinations);
app.get("/destinations/:destinationId", getDestinationById);
app.get("/destinations", addDestination);
app.patch("/destinations/:/destinationId", updateDestination);
app.delete("/destinations/:destinationId", deleteDestination);
app.patch("/destinations/:destinationId/category", updateDestinationCategory);

export const api = functions.https.onRequest(app);
