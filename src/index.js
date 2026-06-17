import connectDB from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

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
