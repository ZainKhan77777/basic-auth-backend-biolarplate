import connectDB from "./db/index.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app = express();
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongo db connection FAILED", error);
    process.exit(1);
  });
