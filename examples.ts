import { summarizeConversation } from "./mod.ts";

// Summarize a list of messages with no prior context.
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

// Progressively summarizing an interaction each turn.
console.log(
  await summarizeConversation([
    {
      role: "user",
      content: "I’m depressed. Life is harsh, unforgiving, cruel. ",
    },
  ], { context: "The user is sad." }),
);

console.log(
  await summarizeConversation([
    {
      role: "assistant",
      name: "Doctor",
      content:
        "The great clown Pagliacci is in town tonight. Go and see him! That should sort you out.",
    },
  ], {
    context:
      "The user expresses feelings of depression and hopelessness, describing life as harsh, unforgiving, and cruel.",
  }),
);

console.log(
  await summarizeConversation([
    {
      role: "user",
      content: "But doctor, I am Pagliacci.",
    },
  ], {
    context:
      "The user expresses feelings of depression and hopelessness, describing life as harsh, unforgiving, and cruel. In response, the doctor suggests that the user go see the great clown Pagliacci who is in town tonight, as it may help to lift their spirits.",
  }),
);
