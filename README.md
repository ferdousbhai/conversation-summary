# Summarize conversation with ChatGPT using ChatGPT!

When interacting with large language models such as ChatGPT, a common task is to summarize a message, or a list of messages. This module provides a helper function `summarizeConversation` that does just that!

### Usage
```
import { summarizeConversation } from "./mod.ts";


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
], "A man is sad."); // The man expresses his sadness to a doctor, describing life as harsh, unforgiving, and cruel. The doctor suggests that he goes to see the great clown Pagliacci who is in town tonight, thinking it would help him feel better. The man responds with the revelation that he is Pagliacci, implying that he is the one who is supposed to bring joy to others, but he himself is unable to find happiness.
```
