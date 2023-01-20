import { Occasion } from "../models";
import { MessageContext } from "../types";
import { declension } from "../utils";

async function handleTop(ctx: MessageContext) {
  const chat_id = ctx.message.chat.id;

  const result = (
    await Occasion.aggregate()
      .match({ chat_id })
      .group({
        _id: "$user_id",
        occasion_result: { $sum: "$result" },
        count: { $sum: 1 },
        username: { $last: "$username" },
      })
      .sort({ occasion_result: -1 })
      .limit(10)
  )
    .map(
      ({ username, occasion_result, count }, index) =>
        `${index + 1}. <b>${username}</b> - ${occasion_result.toFixed(
          1
        )} г. - ${count} ${declension(count, [
          "джоинт",
          "джоинта",
          "джоинтов",
        ])}`
    )
    .join("\n");

  ctx.replyWithHTML(`<b>Топ шмокеров чата:</b>\n${result}`);
}

export default handleTop;
