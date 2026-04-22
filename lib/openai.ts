import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateChatCompletion(
  messages: { role: string; content: string }[]
) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages as any,
    });

    return {
      success: true,
      content: response.choices[0]?.message?.content || "",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function generateImage(prompt: string) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const images = response.data?.map((img) => ({
      url: img.url,
      revisedPrompt: img.revised_prompt,
    })) || [];

    return {
      success: true,
      images,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
