# Gemini API Integration Guide

## Overview
The Algorithm Tutor uses Google's Gemini API to answer off-topic algorithm questions and provide AI-powered assistance. The system works in two modes:
1. **Template Mode**: For algorithm-specific questions (no API needed)
2. **Gemini Mode**: For general questions (requires API key)

## Setup Instructions

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Choose "Create API key in new project" or use an existing project
4. Copy the generated API key

### Step 2: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

**Important Notes:**
- Never commit this file to version control
- The key should start with `VITE_` to be accessible in Vite
- Keep your API key private and secure

### Step 3: Restart Development Server

After adding the environment variable, restart your dev server:

```bash
npm run dev
```

Vite will pick up the new environment variables automatically.

## How It Works

### When You Ask a Question:

1. **User submits question** via the "Ask the Algorithm" drawer
2. **Intent detection** runs locally:
   - If question matches algorithm patterns → Use template response (no API call)
   - If question is off-topic → Route to Gemini API
3. **Gemini API call** (if needed):
   - Sends prompt with algorithm context (current step, nodes, algorithm type)
   - Receives AI-generated answer
   - Displays response in chat

### Example Context Sent to Gemini:

```
You are Algorithm Tutor. Be concise and helpful.
Context:
- Algorithm: bfs
- Step index: 5
- Current node: (2,3)
- Frontier type: queue
- Frontier head: (2,4)
- Frontier sample: [(2,4), (3,3), (1,3)]
- Visited count: 8
- Is running: true
- Is paused: false

Question: What's the current frontier?
```

## Features

### ✅ Template Responses (No API Needed)
- Algorithm-specific questions
- Performance comparisons
- Common mistakes
- Step explanations
- Next step guidance

Examples:
- "Why is this step important?"
- "What's the difference between BFS and DFS?"
- "What are common mistakes in Dijkstra?"

### ✅ Gemini Responses (With API Key)
- General algorithm questions
- Real-world use cases
- Complex explanations
- Non-algorithm questions
- Extended discussions

Examples:
- "How is BFS used in social networks?"
- "What's a practical example of this algorithm?"
- "Can you explain graph theory in general?"

## Troubleshooting

### Issue: "No Gemini key set" Message
**Solution**: Make sure you've:
1. Created `.env.local` file
2. Added `VITE_GEMINI_API_KEY=your_key`
3. Restarted the development server

### Issue: "Gemini unavailable" Error
**Possible causes:**
- Invalid API key
- Network connectivity issue
- API quota exceeded
- API key not enabled in Google Cloud

**Solutions:**
1. Verify API key is correct in `.env.local`
2. Check internet connection
3. Verify API key in [Google AI Studio](https://aistudio.google.com/app/apikey)
4. Check Google Cloud quota usage

### Issue: Slow Responses
**Possible causes:**
- Network latency
- API rate limiting
- Large context being sent

**Solutions:**
1. Try again after a few seconds
2. Ask simpler questions
3. Check internet speed

## API Usage & Billing

### Free Tier
- 15 requests per minute
- Limited for development/testing
- Sufficient for learning and demos

### Paid Tier
- Higher rate limits
- Production use
- Pay per token used

### Monitoring Usage
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Check API usage and quotas

## Best Practices

### ✅ Do:
- Keep API key in `.env.local` (not in code)
- Use meaningful questions
- Leverage context-aware responses
- Test with template mode first

### ❌ Don't:
- Share or commit API key to version control
- Expose API key in frontend code
- Use invalid or inactive keys
- Leave key in example configs

## Security Considerations

### Client-Side API Calls
The current implementation makes API calls directly from the browser. For production:

1. **Create a Backend Proxy** (Recommended):
   ```typescript
   // Backend endpoint
   POST /api/ask
   Body: { question: string, context: AlgorithmContext }
   Returns: { answer: string }
   ```

2. **Benefits**:
   - API key never exposed to frontend
   - Rate limiting control
   - Request validation
   - Better security

3. **Example Backend (Node.js/Express)**:
   ```javascript
   app.post('/api/ask', async (req, res) => {
     const { question, context } = req.body;
     const response = await fetch(
       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
       {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           key: process.env.GEMINI_API_KEY,
           contents: [{ parts: [{ text: prompt }] }]
         })
       }
     );
     const data = await res.json();
     res.json({ answer: data.candidates[0].content.parts[0].text });
   });
   ```

## Using Gemini API in Different Modes

### Development Mode
```bash
npm run dev
# Gemini API works with VITE_GEMINI_API_KEY from .env.local
```

### Production Mode
```bash
npm run build
# For production, use backend proxy to secure API key
# Set VITE_API_ENDPOINT instead of VITE_GEMINI_API_KEY
```

## Related Environment Variables

If you implement a backend proxy:

```bash
# For direct API (development only)
VITE_GEMINI_API_KEY=your_gemini_key

# For backend proxy (recommended for production)
VITE_API_ENDPOINT=https://your-backend.com/api/ask
```

## FAQ

**Q: Will my API key be exposed?**
A: Currently it's in the browser. For production, use a backend proxy.

**Q: Can I use a different AI API?**
A: Yes, modify `fetchGeminiAnswer` in `AlgorithmTutor.tsx` to use another API.

**Q: How many questions can I ask?**
A: With free tier: 15/minute. With paid: depends on plan.

**Q: Can offline mode work without Gemini?**
A: Yes! Template responses work without API key.

**Q: How do I add custom prompts?**
A: Edit the prompt template in `fetchGeminiAnswer` function in `AlgorithmTutor.tsx`.

## Next Steps

1. Get your API key from Google AI Studio
2. Create `.env.local` file with the key
3. Restart development server
4. Click "Ask the Algorithm" button
5. Try asking a question!

For production deployment, consider implementing a backend proxy for security.
