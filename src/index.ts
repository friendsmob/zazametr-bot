import { Telegraf } from "telegraf";
import mongoose from "mongoose";

import handleZaza from "./commands/zaza";
import handleTop from "./commands/top";
import handleMe from "./commands/me";

mongoose.set("strictQuery", false);

const bot = new Telegraf(process.env.TOKEN);
bot.command("zaza", handleZaza);
bot.command("top", handleTop);
bot.command("me", handleMe);

start();

async function start() {
  try {
    await mongoose.connect(process.env.DB_URI);
    await bot.launch();

    console.log("bot started");
  } catch (error) {
    console.log("error: ", error);
  }
}

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
