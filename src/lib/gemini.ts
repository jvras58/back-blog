const { GoogleGenerativeAI } = require("@google/generative-ai");
import "dotenv/config";
import { GEMINI_API_KEY } from "../config/env";

// documentação : https://github.com/google/generative-ai-js
// documentação : https://ai.google.dev/gemini-api/docs/quickstart?hl=pt-br&lang=node
export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    // systemInstruction: "You are a teacher and you are talking to another teacher who wants to create a lesson plan",
});