import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(result.choices[0].message));
