import { openAI } from "./config.ts";

export interface Message {
  role: "user" | "system" | "assistant";
  name?: string;
  content: string;
}

export async function summarizeConversation(
  messages: Message[],
  previousSummary?: string,
): Promise<string> {
  // Summarize conversation
  let systemPrompt =
    "You are capable of summarizing conversations minimizing any loss of information.\n\n";
  systemPrompt += previousSummary
    ? `Summarize the following conversation, providing lots of specific details from its context.\n\nContext:\n${previousSummary}\n\nConversation:\n`
    : "Summarize the following conversation.";

  try {
    const chatCompletion = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.6,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    });
    const assistantMessage = chatCompletion.choices[0].message;
    return assistantMessage.content;
  } catch (error) {
    return error.message;
  }
}
