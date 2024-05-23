import express from "express";
import * as cron from "node-cron";
import { sendPromoController } from "./controllers/birthdayPromoController";
import { logger } from "./config/logging";
import { sendBirthdayPromos } from "./services/birthdayPromoService";

const app = express();

app.post("/sendPromo", sendPromoController);

const PORT = process.env.PORT || 3000;

// Override console.log and console.error
console.log = (...args) => {
  logger.info(args.join(" "));
};

console.error = (...args) => {
  logger.error(args.join(" "));
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Schedule cron job to send birthday promos every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    await sendBirthdayPromos();
    console.log("Birthday promos sent successfully!");
  } catch (error) {
    console.error("Error sending birthday promos:", error);
  }
});
