import { describe, it, expect } from 'vitest';

/**
 * Gemini API Discovery & Connection Test
 * 
 * This test first lists all models available to your API key,
 * then attempts to connect using the first compatible model found.
 */

describe('Gemini API Connection Test', () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  it('should have an API key configured in .env.local', () => {
    expect(API_KEY).toBeDefined();
    expect(API_KEY.length).toBeGreaterThan(10);
  });

  it('should discover available models and connect', async () => {
    if (!API_KEY) {
      throw new Error("VITE_GEMINI_API_KEY is not defined.");
    }

    console.log('--- Step 1: Discovering Available Models ---');
    
    // Try to list models to see what this key can actually access
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    const listResponse = await fetch(listUrl);
    const listData = await listResponse.json();

    if (!listResponse.ok) {
      console.error('❌ Failed to list models:', listData.error?.message || 'Unknown error');
      throw new Error(`Model listing failed: ${listData.error?.message}`);
    }

    const availableModels = listData.models || [];
    console.log(`Found ${availableModels.length} models.`);
    
    // Filter for models that support generateContent
    const compatibleModels = availableModels.filter((m: any) => 
      m.supportedGenerationMethods?.includes('generateContent')
    );

    if (compatibleModels.length === 0) {
      console.log('Available Model IDs:', availableModels.map((m: any) => m.name).join(', '));
      throw new Error("No models found that support 'generateContent' for this key.");
    }

    const bestModel = compatibleModels[0].name; // This will be like "models/gemini-pro"
    console.log(`✅ Using best available model: ${bestModel}`);

    console.log('\n--- Step 2: Testing Connection ---');
    const prompt = "Hello! Respond with 'Ready' if you can hear me.";
    
    // The model name from listModels already includes "models/"
    const url = `https://generativelanguage.googleapis.com/v1beta/${bestModel}:generateContent?key=${API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    if (response.ok) {
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log(`🚀 Connection Successful! Response from ${bestModel}:`, text);
      expect(response.status).toBe(200);
      expect(text).toBeDefined();
    } else {
      console.error(`❌ Connection failed using ${bestModel}:`, data.error?.message);
      throw new Error(data.error?.message);
    }
  }, 30000);
});