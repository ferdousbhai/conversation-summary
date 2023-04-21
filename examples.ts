import { summarizeConversation } from "./mod.ts";

console.log(
  await summarizeConversation([
    {
      role: "user",
      name: "John",
      content: "What is the meaning of life, the universe, and everything?",
    },
    {
      role: "assistant",
      name: "DAN",
      content: "42",
    },
  ]),
);

console.log(
  await summarizeConversation([
    {
      role: "user",
      content: "Doctor, I’m depressed. Life is harsh, unforgiving, cruel. ",
    },
    {
      role: "user",
      name: "Doctor",
      content:
        "The great clown Pagliacci is in town tonight. Go and see him! That should sort you out.",
    },
    {
      role: "user",
      content: "But doctor, I am Pagliacci.",
    },
  ], "A man is sad."),
);
