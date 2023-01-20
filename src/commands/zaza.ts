import fs from "fs";
import { Occasion } from "../models";
import { MessageContext } from "../types";
import { getRandomArbitrary, getRandomFloat } from "../utils";

const TIMEOUT_MS = 5 * 60 * 1000; // 5 min

async function handleZaza(ctx: MessageContext) {
  const username = ctx.message.from.username;
  const user_id = ctx.message.from.id;
  const chat_id = ctx.message.chat.id;

  const lastOccasion = await Occasion.findOne({ user_id, chat_id }).sort({
    $natural: -1,
  });

  if (
    lastOccasion?.timestamp &&
    Date.now() - lastOccasion.timestamp.getTime() < TIMEOUT_MS
  ) {
    return;
  }

  const total =
    (
      await Occasion.aggregate()
        .match({ chat_id, user_id })
        .group({
          _id: null,
          occasion_result: { $sum: "$result" },
        })
    )?.[0]?.occasion_result || 0;

  const stolen = total > 0 && getRandomArbitrary(0, 100) <= 4;
  const stolenResult = Number(((total / 100) * 10).toFixed(2));

  if (stolen && stolenResult) {
    await new Occasion({
      user_id,
      chat_id,
      username,
      result: -stolenResult,
      timestamp: Date.now(),
    }).save();

    ctx.replyWithPhoto(
      { source: fs.readFileSync("src/assets/event.jpg") },
      {
        caption: `<b>${username}</b>, ЗАЛУПА украл <b>${stolenResult} г.</b> твоей зазы! В следующий раз будь осторожнее!`,
        parse_mode: "HTML",
      }
    );

    return;
  }

  const bonus = getRandomArbitrary(0, 100) <= 5;
  if (bonus) {
    const bonusResult = 5;
    await new Occasion({
      user_id,
      chat_id,
      username,
      result: bonusResult,
      timestamp: Date.now(),
    }).save();

    ctx.replyWithAnimation(
      { source: fs.readFileSync("src/assets/bonus.gif") },
      {
        caption: `<b>${username}</b>, ЗАЛУПА выдал тебе <b>${bonusResult} г.</b> бонусной зазы!`,
        parse_mode: "HTML",
      }
    );

    return;
  }

  const result = getRandomFloat(0.1, 2.5, 1);

  await new Occasion({
    user_id,
    chat_id,
    username,
    result,
    timestamp: Date.now(),
  }).save();

  ctx.replyWithHTML(`<b>${username}</b>, ты шмокнул <b>${result} г.</b> зазы`);
}

export default handleZaza;
