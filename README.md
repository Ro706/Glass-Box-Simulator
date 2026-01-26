# Algorithmic Glass Box Simulator

> **Stop learning algorithms as black boxes. See inside them.**

An interactive web-based algorithm visualizer that brings pathfinding algorithms to life. Watch **BFS**, **DFS**, **Dijkstra**, and **A\*** execute step-by-step, understand their internal data structures, and build intuition through hands-on experimentation.

Perfect for **students preparing for interviews**, **CS educators** looking for classroom tools, and **anyone curious** about how algorithms really work.

---

## ✨ What Makes This Different

| Problem | Our Solution |
|---------|--------------|
| Algorithms seem magical | Step-by-step visualization shows every decision |
| Hard to visualize data structures | Live queue/stack/priority queue display |
| Difficult to compare algorithms | Side-by-side execution mode |
| Theory without practice | Integrated LeetCode problems for each algorithm |
| Need guidance? | AI tutor answers context-aware questions |

---

## 🎯 Core Features

**Visualization & Interaction**
- Interactive grid: Click to set start/end points, draw walls by dragging
- Step-by-step execution with pause/play/reset controls
- Real-time metrics: nodes explored, path length, execution steps
- Color-coded visualization: start (blue), frontier (yellow), visited (fade), path (green)

**Learning Resources**
- Algorithm notes with definitions, pseudocode, and JavaScript code
- Flow diagrams (Mermaid) showing algorithm logic
- Real-world use cases for each algorithm
- Worked examples to build intuition

**Accessibility & Practice**
- **Text-to-Speech**: Narration of each step (adjustable speed 0.5x–1.5x)
- **Algorithm Comparison Table**: Compare all 4 algorithms across 20+ criteria
- **LeetCode Integration**: Curated problems (Basic 🟢 / Medium 🟡 / Hard 🔴)
- **AI Tutor**: Context-aware questions about the current algorithm and step

**Comparison Mode**
- Run two algorithms side-by-side on the same grid
- Visual pattern comparison to understand different exploration strategies
- Performance metrics to see which algorithm wins for your scenario

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- npm or yarn

### Installation & Setup

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd algorithmic-insight-main

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Optional: Enable AI Tutor with Gemini

Create a `.env.local` file:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

Without this key, the tutor only answers algorithm-focused questions. With it, it can also answer general questions using Gemini.

---

## 💡 Why You Need This

**For Students** 🎓
- Master algorithms before technical interviews
- Build intuition through interactive experimentation
- Reduce time to proficiency from weeks to days

**For Educators** 👨‍🏫
- Replace static slides with engaging, interactive demos
- Support multiple learning styles (visual, auditory, kinesthetic)
- Help students build mental models, not memorize steps

**For Self-Learners** 🚀
- Satisfy curiosity about how algorithms work
- Learn at your own pace with step-by-step guidance
- See the connection between theory and implementation

---

## 🔧 Technology Stack

| Technology | Purpose |
|-----------|---------|
| **React 18 + TypeScript** | Type-safe, component-driven UI |
| **Zustand** | Simple, lightweight state management |
| **Tailwind CSS + shadcn/ui** | Beautiful, accessible components |
| **Vite** | Lightning-fast development server |
| **Canvas API** | Real-time, efficient grid rendering |
| **Web Speech API** | Browser-native text-to-speech |
| **Vitest** | Fast unit testing |

---

## 📋 How It Works

### User Journey

1. **Pick an Algorithm** → Choose from BFS, DFS, Dijkstra, or A*
2. **Design Your Grid** → Click start/end points, draw walls
3. **Run & Step** → Press play or step through manually
4. **Watch & Learn** → Observe frontier, visited sets, and data structures
5. **Read & Listen** → Algorithm notes + optional text-to-speech narration
6. **Compare** → Run multiple algorithms side-by-side
7. **Practice** → Jump to LeetCode problems or ask the AI tutor

### What You See at Each Step

- **Grid Canvas** with color-coded cells (blue=start, yellow=frontier, visited=fade, green=path)
- **Data Structure Viewer** showing the frontier queue/stack/priority-queue in real-time
- **Metrics** (nodes explored, path length, step count)
- **Explanation** of what just happened and why
- **Node Inspector** for debugging (click any cell to see costs)

---

## 📁 Project Structure

```
src/
├── components/          # React UI components
│   ├── GridCanvas.tsx              # Canvas rendering
│   ├── PlaybackControls.tsx        # Play/pause/step buttons
│   ├── AlgorithmSelector.tsx       # Algorithm picker
│   ├── AlgorithmNotes.tsx          # Theory & code
│   ├── AlgorithmComparison.tsx     # Comparison table
│   ├── SolveProblems.tsx           # LeetCode links
│   ├── AlgorithmTutor.tsx          # AI chat
│   └── ui/                         # Reusable UI components (shadcn)
├── lib/
│   ├── algorithms/                 # Core algorithm implementations
│   │   ├── bfs.ts
│   │   ├── dfs.ts
│   │   ├── dijkstra.ts
│   │   ├── astar.ts
│   │   └── utils.ts
│   ├── algorithmContent.ts         # Notes, diagrams, use cases
│   └── tutorTemplates.ts           # AI tutor prompts
├── store/                          # Zustand state management
│   ├── simulatorStore.ts
│   └── comparisonStore.ts
└── pages/                          # Page components
    ├── Index.tsx                   # Landing page
    └── Simulator.tsx               # Main app
```

---

## 🎓 Algorithms Included

| Algorithm | Best For | Time Complexity | Space Complexity |
|-----------|----------|-----------------|------------------|
| **BFS** | Shortest path (unweighted), level-order | O(V + E) | O(V) |
| **DFS** | Topological sort, cycle detection, mazes | O(V + E) | O(V) |
| **Dijkstra** | Shortest path (weighted), non-negative weights | O((V + E) log V) | O(V) |
| **A\*** | Optimal pathfinding with heuristics, fastest with good heuristic | O(E) to O(V²) | O(V) |

---

## 🧪 Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 🌐 Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

(Requires Canvas API and Web Speech API support)

---

## 🤝 Contributing

Contributions are welcome! Whether it's bug fixes, new algorithms, or UI improvements, feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add your feature'`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---


