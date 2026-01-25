# Algorithmic Glass Box Simulator - Hackathon Evaluation Guide

**DEI × Virtual Labs Hackathon 2026**

---

## 1. Project Overview

### What is the project?

**Algorithmic Glass Box Simulator** is an interactive web-based educational platform that transforms pathfinding algorithms from abstract black boxes into transparent, step-by-step learning experiences. The platform visualizes four fundamental algorithms—BFS (Breadth-First Search), DFS (Depth-First Search), Dijkstra's Algorithm, and A* (A-Star)—enabling students to watch algorithms execute in real-time on dynamically drawn grids.

### What problem does it solve?

Current CS education presents algorithms as static formulas and pseudocode snippets, leaving students with memorized procedures but limited intuition. Students struggle to:
- Understand *why* an algorithm makes specific decisions
- Visualize the internal state of data structures during execution
- Compare algorithm behaviors side-by-side
- Apply theoretical knowledge to practical problem-solving
- Build confidence in implementing algorithms correctly

### One-line value proposition

**Demystify how pathfinding algorithms work through interactive visualization, step-by-step explanations, and hands-on experiential learning.**

---

## 2. Problem Statement

### What is the core problem?

Pathfinding algorithms are fundamental to computer science, yet teaching them remains predominantly lecture-based and theoretical. Students encounter:
1. **Black-box learning**: Algorithms presented as finished procedures without revealing internal logic
2. **Passive visualization**: Static diagrams that don't reflect algorithm behavior on varied inputs
3. **Lack of intuition**: No mechanism to build mental models of data structure evolution
4. **Insufficient comparison tools**: Difficulty understanding trade-offs between different algorithms
5. **Limited accessibility**: Text-heavy learning excludes students with different learning modalities

### Why is this a problem in current CS education?

- Algorithm courses rely on pseudocode and whiteboards, which don't capture real-time dynamics
- Students memorize algorithm steps but cannot explain *why* those steps are necessary
- Online judges (LeetCode, Codeforces) test implementation but provide no learning scaffold
- Traditional teaching fails to engage kinesthetic and visual learners
- No unified platform combines visualization, theory, practice, and comparison

### Why does this problem exist today?

1. **Tooling gap**: Existing visualizers (VisuAlgo, Algorithm Visualizer) are either read-only demos or lack integration with learning theory
2. **Isolation of resources**: Theory notes, code, visualizations, and practice problems exist in silos (textbooks, GitHub, LeetCode)
3. **One-size-fits-all approach**: No platform adapts to individual learning pace or provides context-aware tutoring
4. **Accessibility barriers**: Limited support for diverse learning styles (visual, auditory, kinesthetic)

---

## 3. Target Users & Stakeholders

### Primary Users

| User Type | Needs | Why They Need This Solution |
|-----------|-------|------------------------------|
| **CS Students (High School & Undergrad)** | Understand algorithms before interviews or exams | Builds intuition faster than textbooks; provides safe experimentation ground |
| **Job Seekers (Interview Prep)** | Master pathfinding algorithms for technical interviews | Reduces time to proficiency; increases confidence in algorithmic thinking |
| **Educators & Tutors** | Teach algorithms visually with interactive demos | Replaces static slides with engaging, student-paced learning |
| **Self-Learners & Hobbyists** | Satisfy curiosity about how algorithms work | Gamified, step-by-step approach is more engaging than reading papers |

### Secondary Stakeholders

- **Virtual Labs Ecosystem**: Benefits from a reusable, open-source educational module
- **Hackathon Community**: Demonstrates DEI commitment through accessible, inclusive learning tools
- **Industry (Game Dev, Robotics, AI)**: Pipeline of better-trained junior developers

### Why they benefit

- **Reduced cognitive load**: Real-time visualization + narration works with human memory
- **Self-paced learning**: Step-by-step execution suits all learning speeds
- **Retention boost**: Multimodal input (visual + auditory + kinesthetic) improves memory encoding
- **Confidence building**: Interactive practice bridges theory and implementation

---

## 4. Solution Overview

### What solution is proposed?

A unified, interactive web-based platform combining:
- **Live algorithm execution** on user-drawn grids
- **Real-time data structure visualization** (queues, stacks, priority queues)
- **Audio narration** of each step
- **Comprehensive learning materials** (definitions, pseudocode, code, diagrams, use cases)
- **Algorithm comparison tools** for side-by-side analysis
- **LeetCode integration** linking to curated practice problems
- **Context-aware AI tutor** answering algorithm-specific questions
- **Multi-modal accessibility** (visual, auditory, textual)

### How it solves the problem

| Problem | Solution |
|---------|----------|
| Black-box learning | Step-by-step visualization with real-time data structure state |
| Static understanding | Interactive grid allows students to test custom scenarios |
| Weak comparison skills | Dedicated comparison view runs two algorithms simultaneously |
| No intuition building | Narration + visual feedback explains *why* each decision is made |
| Isolated resources | Single platform integrates theory, visualization, practice, tutoring |
| Accessibility barriers | Text-to-speech, clear visual design, multiple input modalities |

### What makes it different from existing tools

| Tool | Limitation | Our Solution |
|------|-----------|---------------|
| **VisuAlgo** | Read-only, sequential; no tutoring or problem integration | Interactive with AI tutor, LeetCode links, side-by-side comparison |
| **Algorithm Visualizer** | Limited algorithms; no structured learning path | Focused on pathfinding; comprehensive theory + practice |
| **LeetCode** | Problems only; no visualization or step-by-step guidance | Combines visualization with problem-solving pathway |
| **Textbooks** | Static, self-paced learning; passive consumption | Interactive, dynamic, multimodal engagement |

---

## 5. Goals & Objectives

### Learning Outcomes

By using the platform, students will be able to:

1. **Understand Algorithm Mechanics**
   - Explain how BFS, DFS, Dijkstra, and A* differ in their search strategies
   - Predict algorithm behavior on unseen grid configurations
   - Trace through algorithms step-by-step without external aid

2. **Build Intuitive Models**
   - Visualize how data structures (queue, stack, priority queue) guide algorithm behavior
   - Recognize when each algorithm is optimal and when it is suboptimal
   - Understand the trade-off between completeness, optimality, and efficiency

3. **Apply Knowledge to Problem-Solving**
   - Select appropriate algorithms for real-world pathfinding scenarios
   - Implement algorithms correctly in coding interviews or assignments
   - Debug algorithm implementations by comparing expected vs. actual behavior

4. **Develop Comparative Analysis Skills**
   - Compare algorithms across complexity, use cases, and performance
   - Make informed decisions about algorithm selection
   - Articulate algorithmic trade-offs in interviews

### Educational Impact

- **Engagement**: Interactive, gamified learning increases student motivation and time-on-task
- **Retention**: Multimodal input (visual + auditory) improves long-term memory
- **Confidence**: Safe experimentation reduces fear of "getting it wrong"
- **Accessibility**: Audio and visual design supports diverse learners
- **Scalability**: Web-based platform serves unlimited students simultaneously

---

## 6. Features & Functionality

| Feature | Description | Problem Solved | User Benefit |
|---------|-------------|-----------------|--------------|
| **Interactive Grid Canvas** | Click-and-drag interface to set start/end points and draw walls on a customizable grid | Black-box visualization; lack of interaction | Users test custom scenarios and build algorithmic intuition |
| **Step-by-Step Algorithm Execution** | Pause/play/reset controls with frame-by-frame stepping through each algorithm decision | Algorithms appear magical; users miss decision logic | Users understand *why* each node is chosen at each step |
| **Real-Time Data Structure Visualization** | Live display of queues (BFS), stacks (DFS), or priority queues (Dijkstra/A*) as they evolve | Abstract data structures remain invisible | Users see how internal state drives algorithm behavior |
| **Visual State Indicators** | Color-coded cells: visited (blue), frontier (yellow), current (red), path (green), walls (black) | Hard to track which nodes have been explored | Users instantly see exploration pattern and final path |
| **Text-to-Speech Narration** | Web Speech API reads step-by-step explanations; adjustable speed (0.5x–1.5x) | Inaccessible to auditory learners; requires reading | Multi-sensory engagement improves retention; accessibility feature |
| **Algorithm Notes Section** | Comprehensive theory for each algorithm: definition, pseudocode, JavaScript code, Mermaid flow diagram, real-world use cases, worked examples | Visualization alone insufficient; students need conceptual foundation | Single integrated resource replaces fragmented textbooks and tutorials |
| **Algorithm Comparison Table** | Side-by-side table comparing 20+ attributes (complexity, data structure, optimality, use cases, common mistakes) | Difficult to understand differences; students resort to memorization | Users make informed algorithmic trade-off decisions |
| **LeetCode Problem Integration** | Curated problem sets for each algorithm; one-click links to LeetCode; categorized by difficulty (Basic/Medium/Hard) | Theory-practice disconnect; students unsure how to apply learning | Direct pathway from visualization to real coding problems |
| **Algorithm Tutor (AI)** | Context-aware chatbot answering questions about current algorithm, step, frontier state, and execution status; fallback to Gemini for off-topic questions | Students lack immediate help; asynchronous forums slow learning | On-demand tutoring; immediate clarification of misconceptions |
| **Simultaneous Algorithm Comparison Mode** | Run two algorithms side-by-side on the same grid with separate visualizations | Hard to mentally compare algorithm behavior | Users observe performance differences and exploration pattern trade-offs |
| **Metrics Display** | Real-time counters: nodes explored, path length, execution time, frontier/visited set sizes | Hard to compare algorithm efficiency objectively | Quantitative evidence of which algorithm is faster/more efficient |
| **Node Inspector** | Click any cell to inspect its costs (g, h, f) and parent pointers; useful for A* and Dijkstra | A* heuristic costs invisible; hard to debug Dijkstra paths | Users understand how heuristics and cost calculations guide pathfinding |
| **Responsive Design** | Mobile and desktop layouts; touch-friendly controls; dark mode support | Tool inaccessible on phones/tablets; poor UX on small screens | Students learn anywhere; inclusive for diverse device access |
| **Accessibility Features** | Clear contrast, semantic HTML, keyboard navigation support, ARIA labels | Tool excludes users with visual/motor impairments | Broader accessibility; compliant with educational standards |

---

## 7. System Architecture

### How the system is designed

The application follows a **modular, client-side architecture** optimized for interactive visualization and real-time state management. The design separates concerns into specialized layers:

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE LAYER                      │
│  (React Components + Tailwind CSS + shadcn/ui)                   │
│                                                                   │
│  ├─ Landing Page (Index.tsx)                                     │
│  ├─ Simulator (Simulator.tsx)                                    │
│  │  ├─ Grid Canvas (GridCanvas.tsx)                              │
│  │  ├─ Playback Controls (PlaybackControls.tsx)                  │
│  │  ├─ Algorithm Selector (AlgorithmSelector.tsx)                │
│  │  ├─ Grid Controls (GridControls.tsx)                          │
│  │  ├─ Data Structure Viewer (DataStructureViewer.tsx)           │
│  │  ├─ Explanation Panel (ExplanationPanel.tsx)                  │
│  │  ├─ Text-to-Speech Module (TextToSpeech.tsx)                  │
│  │  ├─ Metrics Display (MetricsDisplay.tsx)                      │
│  │  ├─ Algorithm Notes (AlgorithmNotes.tsx)                      │
│  │  ├─ Algorithm Comparison (AlgorithmComparison.tsx)            │
│  │  ├─ LeetCode Problems (SolveProblems.tsx)                     │
│  │  ├─ Comparison Mode (ComparisonPanel.tsx)                     │
│  │  └─ AI Tutor (AlgorithmTutor.tsx)                             │
│  └─ Not Found Page (NotFound.tsx)                                │
└─────────────────────────────────────────────────────────────────┘
              │                           │
              ▼                           ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│  STATE MANAGEMENT LAYER  │  │   VISUALIZATION ENGINE   │
│  (Zustand Stores)        │  │   (HTML5 Canvas)         │
│                          │  │                          │
│  ├─ simulatorStore.ts    │  │  ├─ Cell rendering       │
│  │  • Grid state         │  │  ├─ Animation frames     │
│  │  • Algorithm steps    │  │  ├─ Color gradients      │
│  │  • Playback state     │  │  ├─ Real-time updates    │
│  │  • Algorithm type     │  │  └─ Path highlighting    │
│  │  • Execution history  │  │                          │
│  │                       │  │                          │
│  └─ comparisonStore.ts   │  │                          │
│     • Comparison mode    │  │                          │
│     • Dual grids         │  │                          │
│     • Side-by-side steps │  │                          │
└──────────────────────────┘  └──────────────────────────┘
              │                           │
              ▼                           ▼
┌──────────────────────────────────────────────────────────────┐
│              ALGORITHM ENGINE LAYER                           │
│  (Pure algorithmic implementations)                           │
│                                                              │
│  ├─ src/lib/algorithms/                                      │
│  │  ├─ bfs.ts        (Breadth-First Search)                  │
│  │  ├─ dfs.ts        (Depth-First Search)                    │
│  │  ├─ dijkstra.ts   (Dijkstra's Shortest Path)              │
│  │  ├─ astar.ts      (A* with heuristics)                    │
│  │  ├─ utils.ts      (Shared utilities)                      │
│  │  └─ index.ts      (Algorithm entry points)                │
│  │                                                            │
│  Features:                                                   │
│  • Step-by-step execution (returns state after each step)   │
│  • Grid initialization and validation                        │
│  • Frontier and visited set tracking                         │
│  • Path reconstruction                                       │
│  • Real-time metrics (nodes explored, path length)           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
              │                           │
              ▼                           ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│  CONTENT & LEARNING LAYER│  │   EXPLANATION MODULE     │
│                          │  │   (Text + Audio)         │
│  ├─ algorithmContent.ts  │  │                          │
│  │  • Definitions        │  │  ├─ Step explanations    │
│  │  • Pseudocode         │  │  ├─ Web Speech API       │
│  │  • Code samples       │  │  ├─ Tutor templates      │
│  │  • Flow diagrams      │  │  └─ Narration control    │
│  │  • Use cases          │  │                          │
│  │  • Worked examples    │  │  ExternalIntegrations:   │
│  │                       │  │  ├─ Text-to-Speech       │
│  └─ tutorTemplates.ts    │  │  ├─ Gemini API (opt.)    │
│     • Guided prompts     │  │  └─ LeetCode links       │
│     • Question templates │  │                          │
└──────────────────────────┘  └──────────────────────────┘
              │                           │
              └─────────────┬─────────────┘
                            │
                ┌───────────▼───────────┐
                │  EXTERNAL SERVICES    │
                │                       │
                ├─ LeetCode (API)       │
                ├─ Google Gemini API    │
                ├─ Web Speech API       │
                └─ Browser Storage      │
                   (localStorage)
```

### How components interact

1. **User Input → UI Layer**: User interacts with grid, controls, or selectors
2. **UI → Store**: Component dispatches action to Zustand store (e.g., `setAlgorithm()`, `stepForward()`)
3. **Store → Algorithm Engine**: Store triggers algorithm function (e.g., `bfs()`, `dijkstra()`)
4. **Algorithm Engine → Store**: Engine returns next step state (grid, frontier, visited, explanation)
5. **Store → Visualization**: Canvas component re-renders grid with updated colors
6. **Explanation Module**: TTS reads explanation text; AI tutor answers contextual questions
7. **External Services**: LeetCode links open in new tab; Gemini answers off-topic questions (optional)

### Data Flow Example: User Steps Algorithm Forward

```
User clicks "Step Forward" button
    │
    ├─> PlaybackControls.tsx triggers simulatorStore.stepForward()
    │
    ├─> simulatorStore calls algorithm(grid, state) → AlgorithmStep
    │
    ├─> AlgorithmStep contains:
    │   • Updated grid (with visited/frontier/current colors)
    │   • Current node being explored
    │   • Frontier queue/stack/priority-queue
    │   • Visited set
    │   • Reconstructed path
    │   • Human-readable explanation string
    │
    ├─> Store updates React state
    │
    ├─> Components re-render:
    │   • GridCanvas: Recolors cells
    │   • DataStructureViewer: Updates frontier display
    │   • ExplanationPanel: Shows explanation text
    │   • MetricsDisplay: Updates counter
    │   • TextToSpeech: Speaks new explanation (if enabled)
    │
    └─> User sees algorithm progression
```

---

## 8. Technical Stack

### Technologies used and rationale

| Layer | Technology | Why Chosen |
|-------|-----------|-----------|
| **Frontend Framework** | React 18 + TypeScript | Type safety reduces bugs; React ecosystem is mature and well-documented for educational tools |
| **State Management** | Zustand | Lightweight, minimal boilerplate; ideal for this app's relatively flat state structure |
| **Styling** | Tailwind CSS + shadcn/ui | Rapid development; shadcn/ui provides accessible, customizable components (buttons, tabs, dialogs) |
| **Build & Dev Server** | Vite | Fast HMR; significantly faster build times than Webpack for rapid iteration |
| **Visualization** | HTML5 Canvas (vanilla) | Direct pixel control; performant for real-time grid rendering; no overhead of SVG or DOM elements |
| **Routing** | React Router v6 | Standard solution for multi-page React apps (landing page + simulator) |
| **Audio** | Web Speech API | Browser-native; no external dependencies; works offline; sufficient for this use case |
| **Testing** | Vitest | Vite-native test runner; faster than Jest; ideal for component and algorithm unit tests |
| **Code Quality** | ESLint + TypeScript | Prevents common bugs; enforces consistency |
| **Package Manager** | Bun (or npm) | Fast, efficient; compatible with npm ecosystem |

### Why each technology was chosen

- **React**: Industry standard; large community; excellent documentation for educational applications
- **TypeScript**: Prevents runtime errors; improves code maintainability; essential for complex algorithm state
- **Zustand**: Simpler than Redux/Context API; perfect for this app's moderate complexity
- **Tailwind + shadcn/ui**: Accelerates UI development; shadcn/ui provides accessible components (WCAG compliance)
- **Vite**: Faster development cycle; better DX than traditional bundlers
- **Canvas API**: Direct control over rendering; efficient for animating thousands of grid cells
- **Web Speech API**: Browser-native accessibility feature; no server dependency; works offline
- **Vitest**: Ecosystem alignment; faster tests improve CI/CD feedback

---

## 9. User Journey / Process Flow

### Step-by-step flow from first open to problem solving

#### Phase 1: **Discovery** (Landing Page)

```
User visits https://app.com/
    │
    ├─> See hero: "Algorithmic Glass Box Simulator"
    ├─> Read value proposition: "Stop learning algorithms as black boxes"
    ├─> Scan features (visualization, TTS, notes, tutor, problems)
    │
    └─> Choose action:
        ├─ "Launch Simulator" → Go to Simulator
        └─ "Learn More" → Scroll to features section
```

**User Benefit**: Clear understanding of what the tool does and immediate call-to-action

#### Phase 2: **Initialization** (Simulator entry)

```
User enters Simulator page
    │
    ├─> See default grid (20x20)
    ├─> Algorithm selector defaults to "BFS"
    ├─> Grid is empty (no start/end/walls)
    │
    └─> Options:
        ├─ Draw custom maze
        ├─ Click "Demo Grid" → Load pre-made scenario
        └─ Watch tutorial (optional)
```

**User Benefit**: Low barrier to entry; pre-built demo reduces friction

#### Phase 3: **Algorithm Execution** (Interactive stepping)

```
User loads demo grid → clicks "Run" or "Step"
    │
    ├─> Step 1: Algorithm initializes frontier with start node
    │   • Grid shows: start (blue), frontier nodes (yellow)
    │   • Data structure viewer shows frontier contents
    │   • Explanation: "BFS initializes a queue with the start node"
    │   • (Optional) TTS speaks explanation
    │
    ├─> Step 2, 3, ..., N: Repeat
    │   • Each step: dequeue → explore neighbors → enqueue unvisited
    │   • Visual feedback: colors change in real-time
    │   • Data structure viewer updates
    │
    ├─> Algorithm completes: Path found or "No path exists"
    │   • Path highlighted in green
    │   • Metrics show: nodes explored, path length, time
    │
    └─> User can:
        ├─ Pause and inspect (click node to see costs)
        ├─ Reset and re-run
        ├─ Switch algorithm
        └─ Compare with another algorithm side-by-side
```

**User Benefit**: Real-time visual + auditory feedback builds intuition; pause/step controls allow self-paced learning

#### Phase 4: **Deep Learning** (Theory & comparison)

```
User clicks "Notes" tab
    │
    ├─> See algorithm definition (exam-ready phrasing)
    ├─> See pseudocode (step-by-step logic)
    ├─> See actual JavaScript code (implementation reference)
    ├─> See flow diagram (Mermaid visualization)
    ├─> See real-world use cases (GPS, game AI, etc.)
    ├─> See worked examples (small grid walkthrough)
    │
    └─> User clicks "Comparison Table" tab
        │
        ├─> See 20+ attributes compared across BFS, DFS, Dijkstra, A*
        ├─> Understand trade-offs (speed vs. optimality, complexity, use cases)
        │
        └─> Now ready for problem-solving
```

**User Benefit**: Comprehensive theory resource; no need to consult external textbooks

#### Phase 5: **Practice & Problem-Solving** (LeetCode integration)

```
User clicks "Practice Problems" tab
    │
    ├─> See curated problems for current algorithm (e.g., BFS problems)
    ├─> Difficulty filters: Basic 🟢, Medium 🟡, Hard 🔴
    │
    ├─> Example problems:
    │   BFS: "Number of Islands", "Rotting Oranges", "Word Ladder"
    │   DFS: "Max Area of Island", "Course Schedule"
    │   Dijkstra: "Network Delay Time", "Path with Minimum Effort"
    │   A*: "Shortest Path in Grid", "Sliding Puzzle"
    │
    ├─> User clicks "Solve Now" on a problem
    │   └─> Opens LeetCode in new tab (direct problem link)
    │
    └─> User solves problem using learned knowledge
        └─> Can return to simulator to re-practice if needed
```

**User Benefit**: Direct pathway from learning to application; proven problems curated for each algorithm

#### Phase 6: **Mentoring & Clarification** (AI tutor)

```
Throughout any phase, user clicks "Ask Tutor" or "Chat"
    │
    ├─> Tutor knows:
    │   • Current algorithm (e.g., A*)
    │   • Current step (e.g., step 5 of 12)
    │   • Algorithm state (frontier, visited, current node)
    │   • Playback state (running, paused, completed)
    │
    ├─> User asks contextual question:
    │   "Why is this node at the front of the frontier?"
    │   "How does the heuristic affect exploration?"
    │
    ├─> Tutor answers using context
    │   "A* uses a priority queue (min-heap). Nodes with lower f-cost
    │   (g-cost + heuristic) are dequeued first. Node (5,3) has the
    │   lowest f-cost now, so it's at the front."
    │
    ├─> User asks off-topic question (if Gemini API key configured):
    │   "What's a hash table?"
    │   └─> Fallback to Gemini for general CS knowledge
    │
    └─> User gains clarity → continues learning
```

**User Benefit**: On-demand mentoring; no wait for TA/instructor; immediate misconception correction

---

## 10. Working Product & Demo

### Does the product work end-to-end?

**✅ YES.** The Algorithmic Glass Box Simulator is fully functional and production-ready.

### What functionalities are fully implemented?

| Functionality | Status | Details |
|---------------|--------|---------|
| **Algorithm Visualization** | ✅ Complete | All 4 algorithms (BFS, DFS, Dijkstra, A*) render correctly; step-by-step execution verified |
| **Interactive Grid** | ✅ Complete | Click/drag to draw walls; set start/end; walls block paths |
| **Playback Controls** | ✅ Complete | Play, pause, step, reset all working; speed control (0.5x–2x) |
| **Data Structure Viewer** | ✅ Complete | Queue (BFS), stack (DFS), priority queue (Dijkstra/A*) display correctly |
| **Text-to-Speech** | ✅ Complete | Web Speech API narrates steps; adjustable speed (0.5x–1.5x); auto-sync |
| **Algorithm Notes** | ✅ Complete | Definitions, pseudocode, code, diagrams, use cases, worked examples for all 4 algorithms |
| **Comparison Table** | ✅ Complete | 20+ attributes compared; color-coded columns; mobile responsive |
| **LeetCode Integration** | ✅ Complete | Curated problem links for each algorithm; organized by difficulty |
| **Algorithm Tutor** | ✅ Complete | Context-aware chatbot answers algorithm questions; optional Gemini fallback |
| **Comparison Mode** | ✅ Complete | Side-by-side execution of two algorithms; separate visualizations |
| **Metrics Display** | ✅ Complete | Nodes explored, path length, execution steps tracked and displayed |
| **Responsive UI** | ✅ Complete | Desktop, tablet, mobile layouts; dark mode supported |
| **Accessibility** | ✅ Complete | Semantic HTML, ARIA labels, keyboard navigation, screen reader support |

### Demo Video Link

**[Insert demo video link here]** *(Video showing: landing page → simulator entry → step-by-step execution → data structure visualization → notes tab → comparison mode → practice problems → tutor interaction)*

---

## 11. User Experience & Accessibility

### Ease of use for first-time users

**Low Friction Design**:
- Landing page immediately explains purpose and value
- Simulator page offers "Demo Grid" button → one click to see algorithm in action
- Step-by-step execution allows users to learn at their own pace
- Buttons are clearly labeled (Play, Step, Reset, Compare)
- Tooltips explain complex features (e.g., "Click a cell to inspect its costs")

**Guided Discovery**:
- Default algorithm (BFS) is simplest; users can start immediately
- "Learn More" links on landing page guide to features
- Tabbed interface (Simulator | Notes | Practice | Compare) organizes features logically

**Typical First-Time Flow**:
```
1. Land on homepage (20 seconds)
2. Click "Launch Simulator" (0 seconds)
3. Click "Demo Grid" (2 seconds)
4. Click "Step" repeatedly (3 minutes to watch algorithm)
5. Click "Notes" tab (1 minute to read definition)
6. Click "Practice Problems" and start LeetCode problem (5 minutes)
Total: ~15 minutes to first "aha moment"
```

### Mobile and desktop compatibility

**Desktop Experience**:
- Full-width grid (up to 800x600 px) for detailed visualization
- Sidebar layout for controls, notes, and tutor
- Keyboard navigation (arrow keys to step)

**Tablet Experience**:
- Responsive grid (scales to 60% width)
- Stacked controls below grid
- Touch-friendly buttons (min 44px × 44px)

**Mobile Experience**:
- Grid reduces to 100% width; optimized for portrait orientation
- Swipe left/right to navigate tabs
- Playback controls convert to larger touch targets
- Tutor and notes collapse into dropdowns to save space

**Testing**:
- ✅ Chrome, Firefox, Safari (latest versions)
- ✅ iOS Safari, Android Chrome
- ✅ Tested at breakpoints: 320px, 768px, 1024px, 1440px

### Accessibility features (WCAG 2.1 AA compliance)

| Feature | Implementation |
|---------|-----------------|
| **Visual Accessibility** | High contrast grid (black walls, white empty cells); color-blind safe palette (red for current ≠ green for path); clear labels |
| **Auditory Accessibility** | Web Speech API narrates all explanations; TTS adjustable speed and voice |
| **Motor Accessibility** | Keyboard navigation (Tab to focus, Enter/Space to activate); no double-click required; mouse alternatives provided |
| **Cognitive Accessibility** | Simplified language; step-by-step pacing; clear visual hierarchy; consistent layout |
| **Semantic HTML** | `<button>`, `<label>`, `<main>`, `<nav>` used correctly; proper heading hierarchy |
| **ARIA Labels** | All interactive elements have `aria-label` or visible labels; data structure roles labeled |
| **Screen Reader Support** | Algorithm explanations available as text; grid state announced on step |
| **Dyslexia Support** | OpenDyslexic font option (optional); high contrast mode available |
| **Color Blindness** | Protanopia/deuteranopia palette tested; colors not sole information channel |

---

## 12. Challenges & Limitations

### Current limitations of the product

| Limitation | Reason | Future Mitigation |
|-----------|--------|-------------------|
| **4 algorithms only** | Scope constraint; focused on pathfinding | Extend to sorting (quicksort, mergesort), tree traversals, DP algorithms |
| **2D grid pathfinding** | Foundational scope; real-world often uses graphs | Add graph input (edge list, adjacency matrix) |
| **No collaborative features** | Single-user design | Add multiplayer mode, shared demo sessions, classroom sharing |
| **Gemini API optional** | Cost; privacy; some users may not want external calls | Build custom fallback tutor; fine-tune smaller model |
| **No offline mode** | Web-based; requires internet | Implement Service Worker for offline algorithm execution |
| **No progress tracking** | Stateless app; no user accounts | Add backend + authentication for learning history, achievements |
| **Limited problem curation** | Manual LeetCode links | Integrate LeetCode API for real-time problem recommendations |
| **No adaptive difficulty** | One-size-fits-all approach | Implement adaptive learning path based on user performance |

### Technical or scope constraints

1. **Canvas Performance**: Grids larger than 100×100 may have lag on low-end devices
2. **Algorithm Complexity**: A* with large heuristic error can explore many nodes (worst-case O(b^d))
3. **Browser Compatibility**: Older browsers (IE11) not supported; Web Speech API limited on some browsers
4. **Explanation Generation**: Hand-authored explanations limit scalability; AI-generated text may lack nuance
5. **LeetCode Integration**: Uses direct problem links; no real-time difficulty/rating integration

---

## 13. Future Scope & Enhancements

### Planned improvements (Post-Hackathon)

#### Phase 2: Graph & Algorithm Expansion
- **Graph Input Formats**: Edge lists, adjacency matrices, visual graph editor
- **More Algorithms**: Sort visualizers (quicksort, mergesort), tree traversals (in/pre/post-order), DP (coin change, longest subsequence)
- **Custom Heuristics**: Allow users to define custom heuristics for A*

#### Phase 3: Learning & Gamification
- **User Accounts & Progress Tracking**: Login → save custom grids, bookmarks, completed problems
- **Achievements & Badges**: Unlock badges for mastering algorithms, solving problems, comparing algorithms
- **Leaderboards**: (Optional) Rank users by problems solved or time to mastery
- **Learning Paths**: Guided curriculum (fundamentals → intermediate → advanced)

#### Phase 4: Classroom Integration
- **Educator Dashboard**: Create and share algorithm scenarios; assign problems; track student progress
- **Classroom Sessions**: Real-time shared visualization (teacher demos, students follow)
- **Assessment Mode**: Timed quizzes, auto-graded problems, performance reports

#### Phase 5: Advanced Features
- **Video Tutorials**: Embedded walkthroughs (10–15 min per algorithm)
- **Peer Code Review**: Submit algorithm implementations; get feedback
- **Real Interview Scenarios**: Timed challenges with randomized grids
- **Offline Mode**: Service Worker caching; work without internet

### Scalability

**Current Scalability**:
- Single-user, stateless; unlimited concurrent users (no backend bottleneck)
- Grid up to 100×100; thousands of steps per execution
- Browser-based rendering; scales with device capability

**Planned Scalability**:
- Backend (Node.js + PostgreSQL) for user accounts, progress tracking
- Caching (Redis) for problem recommendations
- CDN for static assets (code, diagrams)
- Load balancing for educator dashboards

### Alignment with Virtual Labs expansion

This project aligns with Virtual Labs' mission in three ways:

1. **Experiential Learning**: Interactive visualization + hands-on exploration embodies Virtual Labs' core pedagogy
2. **Accessibility & Inclusivity**: Free, web-based, accessible to students globally; supports diverse learning styles (DEI alignment)
3. **Reusability**: Modular codebase can be extended to cover entire CS curriculum (sorting, graphs, dynamic programming, etc.)
4. **Open Source**: Can be contributed to Virtual Labs ecosystem; helps other educators create similar tools

---

## 14. Alignment with Virtual Labs Mission

### How this solution supports experiential learning

**Virtual Labs Mission**: *"Provide hands-on, interactive learning experiences that transform passive consumption into active discovery."*

**Alignment**:

1. **Hands-On Exploration**: Students don't passively watch videos; they:
   - Draw custom mazes and grids
   - Step through algorithms at their pace
   - Inspect intermediate states (frontier, visited, costs)
   - Compare algorithms side-by-side
   - This is **active experiential learning**

2. **Feedback Loop**: Each action (step, pause, reset, inspect) generates immediate visual feedback
   - Users learn causality: *"When I step forward, this frontier changes because..."*
   - Builds mental models through iterative refinement

3. **Discovery-Based**: Users discover *why* algorithms work, not just *how*
   - Tutor asks guiding questions: "Why is this node chosen next?"
   - Users experiment: "What happens if I move the goal?"
   - Active sense-making, not passive instruction

4. **Multi-Modal Engagement**: Combines visual, auditory, kinesthetic, textual learning
   - Aligns with Virtual Labs' inclusive design philosophy

### Why it fits into the Virtual Labs ecosystem

**Virtual Labs as a Platform**:
- Virtual Labs hosts simulations for physics, chemistry, electronics, etc.
- **Algorithmic Glass Box** extends this to **computer science education**
- Fills a gap: no existing Virtual Labs tool for algorithm visualization

**Modularity & Reusability**:
- Codebase designed to scale: can add sorting, graph algorithms, DP
- Architecture template for other CS simulations
- Contributes to Virtual Labs' growing library

**Open Source Contribution**:
- Code released under open license (MIT/Apache)
- Educators can fork, modify, extend
- Community contributions improve tool over time

**DEI Alignment**:
- **Free and accessible**: No paywall; works on any device
- **Inclusive design**: Accessible to diverse learners (visual, auditory, motor, cognitive)
- **Languages**: Easily translatable; can serve global audience
- **No prerequisites**: Beginner-friendly; lowers barrier to CS learning

---

## 15. Conclusion / Impact

### Overall impact

**Algorithmic Glass Box Simulator transforms algorithm education from abstract theory to interactive practice.** By combining visualization, narration, theory, comparison, and mentoring into one platform, it:

1. **Reduces barrier to understanding**: Students move from "algorithms are magic" to "I understand how each decision is made"
2. **Accelerates learning**: Multimodal input improves retention; self-paced execution suits diverse learners
3. **Builds confidence**: Safe experimentation and immediate feedback reduce anxiety around algorithms
4. **Supports inclusion**: Accessible design welcomes students with diverse needs

### Educational value

| Stakeholder | Value |
|-------------|-------|
| **CS Students** | Faster time to proficiency; better interview preparation; deeper understanding |
| **Educators** | Engaging classroom tool; reduces time explaining pseudocode; empirical proof of student understanding |
| **Self-Learners** | Single integrated resource; no jumping between textbooks, videos, judges |
| **Bootcamp Graduates** | Confidence in core algorithms; competitive advantage in interviews |
| **Job Interviewees** | Ability to explain algorithm choices; ability to implement under pressure |

### Long-term usefulness

1. **Curriculum Core**: This tool becomes a required resource in CS curricula (high schools, colleges, bootcamps)
2. **Problem-Solving Catalyst**: Graduates carry algorithmic thinking into software engineering careers
3. **Inclusivity Engine**: Opens CS careers to students traditionally underrepresented in tech
4. **Knowledge Repository**: Years of accumulated student feedback improve explanations and examples

### Measurable Outcomes (Post-Launch)

- **Adoption**: 1,000+ daily active users within 6 months
- **Learning Gains**: 30% improvement in student algorithm comprehension (pre/post test)
- **Interview Success**: 40% of users report improved technical interview performance
- **Retention**: 60% user return rate (students use repeatedly to prepare)

---

**Last Updated**: January 25, 2026  
**Status**: Production-Ready  
**Submitted for**: DEI × Virtual Labs Hackathon 2026
