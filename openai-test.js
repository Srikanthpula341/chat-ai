import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: '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' // Use the API key from an environment variable
});

async function main() {
    const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: "tellaboutjava" }],
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

main();