/**
 * controllers/ai.controller.js
 *
 * Handles AI natural language search using Hugging Face Inference API
 * with intelligent local rule-based fallback.
 */

const Product = require('../models/product.model');
const { success } = require('../utils/apiResponse');

const HF_MODEL_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3';

const aiSearch = async (req, res) => {
  const query = req.body.query || req.body.prompt;
  if (!query) {
    return res.status(400).json(success(null, 'Query or prompt is required', 400));
  }

  const hfApiKey = process.env.HUGGINGFACE_API_KEY;

  let filters = {};

  if (hfApiKey) {
    const systemPrompt = `You are an AI assistant for a B2B Textile Marketplace.
Convert user natural language query into JSON filters for a Product model.
Valid JSON keys: "category", "maxPrice", "color", "text".
Categories: 'Cotton', 'Silk', 'Linen', 'Polyester', 'Wool', 'Blends', 'Sustainable'.
User Query: "${query}"
Return ONLY raw valid JSON:`;

    try {
      const fetch = (await import('node-fetch')).default || global.fetch;
      const response = await fetch(HF_MODEL_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: systemPrompt,
          parameters: { max_new_tokens: 150, temperature: 0.1, return_full_text: false }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        let generatedText = data[0]?.generated_text || '';
        generatedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
        filters = JSON.parse(generatedText);
      }
    } catch (e) {
      console.warn('HF API call bypassed or failed, using intelligent rule parser:', e.message);
    }
  }

  // Intelligent local NLP parser fallback if HF returns empty or key is missing
  if (Object.keys(filters).length === 0) {
    const lowerQuery = query.toLowerCase();

    // Check price filters: "under 200", "< 200", "below 200"
    const priceMatch = lowerQuery.match(/(?:under|below|<|less than|max)\s*(?:₹|rs\.?|inr)?\s*(\d+)/i) || lowerQuery.match(/(\d+)\s*(?:rs|rupees|inr)/i);
    if (priceMatch && priceMatch[1]) {
      filters.maxPrice = Number(priceMatch[1]);
    }

    // Check categories
    const categories = ['Cotton', 'Silk', 'Linen', 'Polyester', 'Wool', 'Blends', 'Sustainable'];
    for (const cat of categories) {
      if (lowerQuery.includes(cat.toLowerCase())) {
        filters.category = cat;
        break;
      }
    }

    // Check common colors
    const colors = ['white', 'black', 'red', 'blue', 'green', 'yellow', 'grey', 'gray', 'pink', 'purple', 'beige'];
    for (const col of colors) {
      if (lowerQuery.includes(col)) {
        filters.color = col;
        break;
      }
    }

    // Remaining words for text search
    if (!filters.category && !filters.color) {
      filters.text = query;
    }
  }

  // Build MongoDB query
  const mongoQuery = { isActive: true };

  if (filters.category) {
    mongoQuery.category = { $regex: new RegExp(filters.category, 'i') };
  }
  if (filters.maxPrice) {
    mongoQuery.pricePerMeter = { $lte: Number(filters.maxPrice) };
  }
  if (filters.color) {
    mongoQuery.color = { $regex: new RegExp(filters.color, 'i') };
  }
  if (filters.text) {
    mongoQuery.$or = [
      { title: { $regex: new RegExp(filters.text, 'i') } },
      { description: { $regex: new RegExp(filters.text, 'i') } },
      { fabric: { $regex: new RegExp(filters.text, 'i') } }
    ];
  }

  try {
    const products = await Product.find(mongoQuery)
      .populate('supplier', 'name companyName')
      .limit(20);

    return res.json(success(products, 'AI search completed successfully'));
  } catch (error) {
    console.error('AI Search Execution Error:', error);
    return res.status(500).json(success(null, 'Error performing search', 500));
  }
};

module.exports = { aiSearch };
