# Summarize conversation with ChatGPT using ChatGPT!

When interacting with large language models such as ChatGPT, a common task is to
summarize a message, or a list of messages. This module provides a helper
function `summarizeConversation` that does just that.

# Progressively summarize an interaction each turn

A common issue with long chats with many turns is that the LLMs seem to learn
from the interaction on how the conversation _should_ continue (**in-context
few-shot learning**), which overrides system instuctions and derails
conversations. To overcome this, an approach I found that works much better is
to limit the number of messages to pass to Chat assistant, and use a seperate
call to ChatGPT to progressively summarize an interaction, and use that summary
as chat context. The function `summarizeConversation` can take in an optional
parameter that provides the context for conversation, and the outputs a summary
that can be used as context for the next turn of the conversation.

### Usage

```
import { summarizeConversation } from "https://deno.land/x/summarize_conversation/mod.ts";

// Summarize a list of messages with no prior context.
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
]); // John asks the meaning of life, the universe, and everything, and Dan responds with "42."

// Progressively summarizing an interaction each turn.
await summarizeConversation([
  {
    role: "user",
    content: "I’m depressed. Life is harsh, unforgiving, cruel. ",
  },
], { context: "The user is sad." }); // The user expresses feelings of depression and hopelessness, describing life as harsh, unforgiving, and cruel.

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
}); // The user expresses feelings of depression and hopelessness, describing life as harsh, unforgiving, and cruel. In response, the doctor suggests that the user go see the great clown Pagliacci who is in town tonight, as it may help to lift their spirits.

await summarizeConversation([
  {
    role: "user",
    content: "But doctor, I am Pagliacci.",
  },
], {
  context:
    "The user expresses feelings of depression and hopelessness, describing life as harsh, unforgiving, and cruel. In response, the doctor suggests that the user go see the great clown Pagliacci who is in town tonight, as it may help to lift their spirits.",
}); // The context of the conversation is that the user is expressing feelings of depression and hopelessness, and the doctor suggests that they go see the great clown Pagliacci who is in town tonight. However, the conversation takes an unexpected turn when the user reveals that they are actually Pagliacci.

```
