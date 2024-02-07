import OpenAI from "openai";
import readline from "readline";
import dotenv from 'dotenv';

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function askQuestion(query) {
    try {
        console.log("Ho")
        const stream = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: query }],
            stream: true,
        });
        console.log(await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: query }],
            stream: true,
        }))

        for await (const chunk of stream) {
            process.stdout.write(chunk.choices[0]?.delta?.content || "");
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function main() {
    rl.on('line', async (input) => {
        await askQuestion(input);
        rl.prompt(); // Prompt for the next input
    });

    rl.prompt(); // Initial prompt
}

main();
