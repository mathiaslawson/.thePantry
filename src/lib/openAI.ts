import {OpenAI} from "openai";

const openAI = new OpenAI({
  apiKey: process.env.AIML_API_KEY,
  organization: "https://api.aimlapi.com",
});

export default openAI;