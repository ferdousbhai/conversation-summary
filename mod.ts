import { openAI } from "./config.ts";

export interface Message {
  role: "user" | "system" | "assistant";
  name?: string;
  content: string;
}

export interface summarizeConversationOptions {
  context?: string;
  model?: string;
  temperature?: number;
}

export async function summarizeConversation(
  messages: Message[],
  options?: summarizeConversationOptions,
): Promise<string> {
  // Summarize conversation
  let systemPrompt =
    "You are a chat assistant capable of summarizing conversations, keeping all the details.\n\n";
  systemPrompt += options?.context
    ? `You are given a context and a conversation that follows. Write a paragraph summarizing the context and the conversation. Start by repeating the context. Be concise.\n\nContext:\n${options.context}\n\nConversation:\n`
    : "Summarize the following conversation.";

  try {
    const chatCompletion = await openAI.createChatCompletion({
      model: options?.model || "gpt-3.5-turbo",
      temperature: options?.temperature || 0.1,
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
