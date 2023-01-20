import { Occasion } from "../models";
import { MessageContext } from "../types";
import { declension } from "../utils";

async function handleMe(ctx: MessageContext) {
  const chat_id = ctx.message.chat.id;
  const user_id = ctx.message.from.id;

  const [result] = await Occasion.aggregate()
    .match({ chat_id, user_id })
    .group({
      _id: null,
      occasion_result: { $sum: "$result" },
      count: { $sum: 1 },
      username: { $last: "$username" },
    });

  if (!result) {
    return;
  }

  const { username, count, occasion_result } = result;
  ctx.replyWithHTML(
    `${username}, ты шмокнул ${count} ${declension(count, [
      "джоинт",
      "джоинта",
      "джоинтов",
    ])} общим весом ${occasion_result.toFixed(1)} г.`
  );
}

export default handleMe;
