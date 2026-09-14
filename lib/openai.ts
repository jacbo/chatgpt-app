import OpenAI from "openai";
const client = new OpenAI(
    { apiKey: process.env['API_KEY'],baseURL: process.env['BASE_URL'] }
);

export default client;