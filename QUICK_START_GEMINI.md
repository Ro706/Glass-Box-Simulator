# Quick Start: Ask the Algorithm with Gemini API

## 🚀 Get Started in 3 Minutes

### Step 1: Get API Key (1 minute)
```
1. Go to: https://aistudio.google.com/app/apikey
2. Click: "Create API Key"
3. Copy the key
```

### Step 2: Setup Environment (1 minute)
```bash
# Create file: .env.local in project root

VITE_GEMINI_API_KEY=your_copied_key_here
```

### Step 3: Restart and Test (1 minute)
```bash
npm run dev
# Click "Ask the Algorithm" button (bottom-right)
# Type any question and press Enter
# Get instant AI-powered answers!
```

## ✅ That's It!

Your AI tutor now works with:
- Algorithm-specific template answers (no API)
- Gemini AI for any question (with API key)

## 📚 Learn More

- **Setup Help**: See [GEMINI_SETUP.md](./GEMINI_SETUP.md)
- **Feature Guide**: See [ASK_THE_ALGORITHM.md](./ASK_THE_ALGORITHM.md)
- **Examples**: See [GEMINI_INTEGRATION_SUMMARY.md](./GEMINI_INTEGRATION_SUMMARY.md)

## 🎯 What to Try

1. **Run the simulator** (play button)
2. **Click "Ask the Algorithm"** (bottom-right drawer)
3. **Try these questions**:
   - "Why is this step important?" (template)
   - "How is BFS used in real life?" (Gemini)
   - "What's the next step?" (template)
   - "Can you explain graph theory?" (Gemini)

## 🔑 Without API Key?

No problem! Template mode still works:
- Algorithm-specific questions ✅
- General theory ✅
- Step explanations ✅
- But off-topic questions need the key

## ⚠️ Troubleshooting

**Problem**: "No Gemini key set" message
**Fix**: Make sure `.env.local` file exists with API key, then restart dev server

**Problem**: "Gemini unavailable" error
**Fix**: Check internet, verify API key is correct

**Problem**: Want to use different AI?
**Fix**: Edit `AlgorithmTutor.tsx` and replace Gemini API call with your provider

---

**Questions?** Read the detailed guides above. **Ready?** Click "Ask the Algorithm"! 🎉
