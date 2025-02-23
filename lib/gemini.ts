import { GoogleGenerativeAI } from '@google/generative-ai';
// import { GEMINI_API_KEY } from '@env';

const genAI = new GoogleGenerativeAI('');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

export async function processVoiceInput(text: string): Promise<{ name: string; quantity: string }[]> {
  const prompt = `Extract food items and their quantities from this text. Format the response as a JSON array of objects with 'name' and 'quantity' properties. Example input: "Add two liters of milk and a dozen eggs" should output: [{"name": "milk", "quantity": "2L"}, {"name": "eggs", "quantity": "12"}]. Input text: "${text}"`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const items = JSON.parse(response.text());
    return items;
  } catch (error) {
    console.error('Error processing voice input:', error);
    throw new Error('Failed to process voice input');
  }
}

export async function generateRecipeSuggestions(pantryItems: { name: string; quantity: string }[]): Promise<any[]> {
  const itemsList = pantryItems.map(item => item.name).join(', ');
  const prompt = `Given these ingredients: ${itemsList}, suggest 3 recipes that can be made. Format the response as a JSON array with objects containing 'name' (string), 'time' (string), 'difficulty' (string), and 'ingredients' (array of strings). Only include ingredients from the provided list.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const recipes = JSON.parse(response.text());
    return recipes;
  } catch (error) {
    console.error('Error generating recipes:', error);
    throw new Error('Failed to generate recipe suggestions');
  }
}