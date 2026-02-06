# Ask the Algorithm Feature - Complete Guide

## Overview
"Ask the Algorithm" is an AI-powered tutor that answers questions about algorithm execution in real-time. It combines template-based responses for algorithm-specific questions with Gemini API for open-ended inquiries.

## Features

### 🤖 Two-Mode System

#### Mode 1: Template Mode (No API Needed)
Handles algorithm-specific questions with pre-built responses:
- Algorithm behavior explanations
- Step-by-step reasoning
- Performance comparisons
- Common mistakes
- Next step guidance

#### Mode 2: Gemini Mode (With API Key)
Handles any question with AI:
- General algorithm questions
- Real-world applications
- Complex explanations
- Non-algorithm topics
- Extended discussions

### 📍 Context Awareness
The tutor understands:
- **Current Algorithm**: BFS, DFS, Dijkstra, or A*
- **Execution Status**: Running, paused, or idle
- **Current Step**: Which iteration in the execution
- **Current Node**: Position being processed
- **Frontier State**: What's in the queue/stack/priority queue
- **Visited Nodes**: How many nodes have been explored

## Getting Started

### Setup

1. **Get Gemini API Key** (optional for basic use):
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Click "Create API Key"
   - Copy the key

2. **Configure Environment** (optional):
   - Create `.env.local` in project root
   - Add: `VITE_GEMINI_API_KEY=your_key_here`
   - Restart dev server

3. **Ready to Use**:
   - No setup needed for template mode
   - Gemini setup optional but recommended

### Opening the Tutor

1. **Click "Ask the Algorithm" button** in bottom-right corner
2. **Drawer opens** with chat interface and quick questions
3. **Ask a question** using the input field or quick buttons

## Example Conversations

### Template Mode Example (No API Key)

**User**: "Why does BFS explore level by level?"

**Tutor**: "BFS uses a FIFO queue to explore in widening circles. Each node is visited exactly once in order of distance from the start. This guarantees the shortest path in unweighted grids because you explore all nodes at distance k before any at distance k+1."

### Gemini Mode Example (With API Key)

**User**: "How is BFS used in social networks?"

**Tutor** (via Gemini): "BFS is crucial in social networks for several applications:
1. Finding shortest connection paths between users
2. Degrees of separation (Six Degrees of Separation)
3. Network influence propagation
4. Friend recommendations within N degrees
5. Detecting cliques and communities

The level-by-level exploration makes BFS perfect for these distance-based queries."

## Using Quick Questions

The drawer shows 4-5 suggested questions for the current algorithm:

**For BFS:**
- "Why use BFS over DFS here?"
- "What's the frontier right now?"
- "What happens next?"

**For DFS:**
- "How does backtracking work?"
- "Why is DFS faster?"
- "What are common mistakes?"

Click any to instantly ask.

## Input Details

### Chat Input Field
- Type your question
- Press Enter or click "Ask" button
- Can ask while algorithm is running or paused
- Works with incomplete sentences

### Suggested Questions
- Pre-built for each algorithm
- Context-aware (change as you run steps)
- One-click activation
- Help if you're unsure what to ask

## Understanding the Response

### Response Components

1. **Badge**: Shows response source
   - "Tutor" = Template mode
   - "Gemini" = API response

2. **Intent Label**: Shows question category
   - `step-reasoning`: Why this step?
   - `next-step`: What happens next?
   - `behavior`: How does it work?
   - `comparison`: Algorithm comparison
   - `mistakes`: Common errors

3. **Main Answer**: Body text with explanation

4. **Extra Points**: Bullet list with details

5. **Text-to-Speech**: Hear the answer read aloud

## Context Shared with Gemini

When asking Gemini, the tutor sends:

```
- Algorithm: bfs (or dfs, dijkstra, astar)
- Step index: Current execution step (0-based)
- Current node: (row, col) being processed
- Frontier type: queue, stack, or priority queue
- Frontier head: Next item to process
- Frontier sample: First 5 items (with 3 dots if more)
- Visited count: Number of explored nodes
- Is running: true/false
- Is paused: true/false
```

This gives Gemini full context for relevant answers.

## API Integration Details

### How It Works

1. **User asks question**
2. **System detects intent**:
   - If matches algorithm patterns → Use template
   - If unrelated → Use Gemini API
3. **Gemini receives**:
   - Question + full algorithm context
   - Generates concise answer (<80 words)
4. **Response displayed** in chat

### Prompt Template

```
You are Algorithm Tutor. Be concise and helpful.
If the question is unrelated to algorithms, answer briefly.

Context:
- Algorithm: {algorithm}
- Step index: {stepIndex}
- Current node: {currentNode}
- Frontier type: {frontierType}
- Frontier head: {frontierHead}
- Frontier sample: {sample}
- Visited count: {visitedCount}
- Is running: {isRunning}
- Is paused: {isPaused}

Question: {userQuestion}

Keep answers under 80 words.
```

## Tips for Best Results

### ✅ Do:
- Be specific: "Why is this node visited now?" vs "Why BFS?"
- Ask while running: More context = better answers
- Use quick questions: They're already optimized
- Ask about frontier: "What's in the queue?"
- Ask about next: "What's the next step?"

### ❌ Don't:
- Ask overly complex questions: Keep it focused
- Ask off-topic without API key: Won't work
- Ask while idle: No execution context
- Submit empty: Input must have content
- Spam questions: Wait for response first

## Troubleshooting

### Issue: "No Gemini key set" message
**Cause**: Trying to ask off-topic question without API key

**Solution**: 
- Either ask algorithm-related question
- Or set up Gemini API key in `.env.local`

### Issue: "Gemini unavailable" error
**Cause**: API communication failed

**Solution**:
- Check internet connection
- Verify API key is correct
- Check Google Cloud quota
- Try again after 10 seconds

### Issue: Slow responses
**Cause**: Network latency or rate limiting

**Solution**:
- Ask simpler questions
- Wait between requests
- Check internet speed
- Upgrade to paid Gemini tier if needed

### Issue: Confusing answers
**Cause**: Gemini may misunderstand context

**Solution**:
- Try template mode questions first
- Be more specific
- Ask simpler version
- Use quick questions instead

## Advanced Usage

### Custom Prompts
Edit `AlgorithmTutor.tsx` fetchGeminiAnswer function to customize:
- System message (tutor personality)
- Context details sent
- Word limit (currently 80)
- Temperature/creativity (not exposed)

### Using Different APIs
To use Claude, ChatGPT, etc:

1. Copy `fetchGeminiAnswer` function
2. Replace API endpoint
3. Adjust request format
4. Update response parsing
5. Test thoroughly

## Performance Tips

### For Better Responses:
1. Run simulation first (provides context)
2. Pause at interesting step
3. Ask specific question
4. Use quick questions for common queries
5. Ask about frontier/next step

### For Faster Responses:
1. Use template mode (no API latency)
2. Keep questions concise
3. Avoid meta-questions about the tutor
4. Ask during non-peak hours
5. Use free tier for development

## Use Cases

### 1. Learning Algorithm Theory
- "What's the difference between BFS and DFS?"
- "Why is Dijkstra better for weighted graphs?"

### 2. Understanding Current Execution
- "Why visit this node now?"
- "What's in the frontier?"
- "How many nodes visited so far?"

### 3. Problem Solving
- "What's the next step?"
- "Is this correct so far?"
- "Why explore here instead of there?"

### 4. Interview Prep
- "What are common mistakes?"
- "How would I optimize this?"
- "Can you explain the complexity?"

## FAQ

**Q: Does it work without Gemini API?**
A: Yes! Template mode works fully. Gemini only needed for off-topic questions.

**Q: Can it answer any question?**
A: Template mode answers algorithm questions. Gemini can answer anything.

**Q: How many questions can I ask?**
A: Free tier: 15/minute. Paid tiers have higher limits.

**Q: Is my API key secure?**
A: Currently in browser. For production, use backend proxy.

**Q: Can I turn off Gemini?**
A: Yes, just don't set API key. Only template mode will work.

**Q: What if I ask something inappropriate?**
A: Gemini applies content filters. Inappropriate content rejected.

**Q: Can I save conversations?**
A: Not yet. Consider future feature development.

**Q: Works on mobile?**
A: Yes! Full responsive design.

## Related Features

- **Simulator**: Visualize algorithm execution
- **Information**: Algorithm-specific theoretical content
- **DSA Notes**: Complete DSA curriculum
- **Practice**: LeetCode problems
- **Text-to-Speech**: Hear answers read aloud

## Next Steps

1. **Click "Ask the Algorithm"** button
2. **Try a quick question** to get started
3. **Run the simulator** for better context
4. **Set up Gemini API** for full capabilities
5. **Explore all algorithms** with the tutor

---

For setup help, see [GEMINI_SETUP.md](./GEMINI_SETUP.md)
