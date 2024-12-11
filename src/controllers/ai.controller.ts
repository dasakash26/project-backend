import secrets from "../utils/secrets";
import { GoogleGenerativeAI } from "@google/generative-ai";

//@ts-ignore
const genAI = new GoogleGenerativeAI(secrets.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const offer = `[{"id":"0cfbff8a-399b-41e6-bd44-9e273d52bdb6","cropName":"Cotton","description":"High-quality cotton for textiles","cropType":"COTTON","price":5000,"quantity":500,"harvestTime":"2024-10-01T00:00:00.000Z","location":"Farm J","offerDuration":270,"paymentTerms":"Cash on delivery","createdBy":"eb462bcb-28f7-4897-ad3a-d3ee51a420cc","createdByUser":{"id":"eb462bcb-28f7-4897-ad3a-d3ee51a420cc","name":"test","email":"test@farmer.ap","password":"$2b$10$1LyZ0.4U4Fz3qJAKu3xsE.fqVSxzDNpHefEjJr.9CH9bFNp.a4C4C","role":"FARMER","createdAt":"2024-11-26T13:33:45.121Z","updatedAt":"2024-11-26T13:33:45.121Z"},"contracts":[],"negotiations":[],"createdAt":"2024-11-26T14:28:23.170Z","updatedAt":"2024-11-26T14:28:23.170Z"}]
`;

const offerData = JSON.parse(offer)[0]; // Parse JSON and get first offer

const prompt = `Please analyze this crop offer and provide a detailed review with the following aspects:
1. Price Analysis: Is the price of ${offerData.cropName} at ${offerData.price} per unit competitive in the current market?
2. Market Timing: Given the harvest time of ${offerData.harvestTime}, is this a good time to sell?
3. Quantity Assessment: Is the offered quantity of ${offerData.quantity} units appropriate?
4. Payment Terms: Evaluate the proposed payment terms "${offerData.paymentTerms}"
5. Recommendations: What specific suggestions would you give to improve this offer?
6. Rating: Rate this offer out of 10

Please provide your analysis in a clear, structured format addressing each point separately.

Additional context:
- Crop Type: ${offerData.cropType}
- Description: ${offerData.description}
- Location: ${offerData.location}
- Offer Duration: ${offerData.offerDuration} days

Please analyze this offer and provide actionable insights for the farmer.
int bullet points each point in one sentence no redundant words
`;

export const getResponse = async (req: Request, res: Response) => {
  try {
    const result = await model.generateContent(prompt);
    //@ts-ignore
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};