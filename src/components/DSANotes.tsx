import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const DSANotes: React.FC = () => {
  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-8 p-6 max-w-5xl" id="dsa-notes-content">
        {/* Title */}
        <section className="space-y-4">
          <h1 className="text-5xl font-bold">Complete Data Structures and Algorithms</h1>
          <p className="text-xl text-muted-foreground">
            A comprehensive reference guide covering fundamental to advanced DSA concepts, algorithms, data structures, and interview preparation
          </p>
          <div className="flex gap-2 flex-wrap pt-4">
            <Badge>Fundamentals</Badge>
            <Badge>Data Structures</Badge>
            <Badge>Algorithms</Badge>
            <Badge>Patterns</Badge>
            <Badge>Interview Ready</Badge>
          </div>
        </section>

        {/* Section 1: Fundamentals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">1. Algorithm Fundamentals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">1.1 What is an Algorithm?</h3>
              <p className="text-lg mb-4">
                An <strong>algorithm</strong> is a finite, deterministic, step-by-step procedure that takes zero or more inputs and produces one or more outputs. It is used to solve a well-defined computational problem.
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Key Characteristics:</strong></p>
                <p className="text-lg">1. <strong>Correctness</strong> - Produces correct output for all valid inputs</p>
                <p className="text-lg">2. <strong>Termination</strong> - Finishes in finite time for all inputs</p>
                <p className="text-lg">3. <strong>Deterministic</strong> - Same input always produces same output</p>
                <p className="text-lg">4. <strong>Efficiency</strong> - Uses reasonable time and space resources</p>
                <p className="text-lg">5. <strong>Clarity</strong> - Can be understood and implemented by others</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">1.2 Complexity Analysis</h3>
              <p className="text-lg mb-4">
                <strong>Complexity Analysis</strong> measures how an algorithm's resource usage (time/space) grows with input size. This helps us choose appropriate algorithms and predict performance.
              </p>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Time Complexity</h4>
                  <p className="text-lg mb-3">Measures how runtime grows as input size increases. We focus on <strong>worst-case</strong> typically.</p>
                  <div className="bg-secondary/30 p-3 rounded mb-3">
                    <p className="text-lg font-semibold mb-2">Common Time Complexities (Best to Worst):</p>
                    <p className="text-lg">O(1) {'=>'} O(log n) {'=>'} O(n) {'=>'} O(n log n) {'=>'} O(n²) {'=>'} O(n³) {'=>'} O(2ⁿ) {'=>'} O(n!)</p>
                  </div>
                  <p className="text-lg">Examples:</p>
                  <p className="text-lg">• O(1): Array access, hash lookup, push/pop stack</p>
                  <p className="text-lg">• O(log n): Binary search, balanced tree operations</p>
                  <p className="text-lg">• O(n): Linear search, array traversal</p>
                  <p className="text-lg">• O(n log n): Merge sort, quick sort (average), heap operations</p>
                  <p className="text-lg">• O(n²): Bubble sort, selection sort, nested loops</p>
                  <p className="text-lg">• O(2ⁿ): Subset generation, some recursive problems</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Space Complexity</h4>
                  <p className="text-lg">Measures how much additional memory an algorithm needs relative to input size.</p>
                  <p className="text-lg mt-3">Examples:</p>
                  <p className="text-lg">• O(1): Sorting in-place (bubble, selection sort)</p>
                  <p className="text-lg">• O(n): Arrays, lists, hash tables</p>
                  <p className="text-lg">• O(log n): Recursive call stack (binary search)</p>
                  <p className="text-lg">• O(n²): 2D arrays, some graph representations</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">1.3 Asymptotic Notation</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-2">Big O (O) - Upper Bound</h4>
                  <p className="text-lg">Represents worst-case complexity. <strong>f(n) = O(g(n))</strong> means f(n) grows no faster than g(n).</p>
                  <p className="text-lg mt-2">Example: Linear search is O(n) because it checks at most n elements.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-2">Big Omega (Ω) - Lower Bound</h4>
                  <p className="text-lg">Represents best-case complexity. <strong>f(n) = Ω(g(n))</strong> means f(n) grows at least as fast as g(n).</p>
                  <p className="text-lg mt-2">Example: Linear search is Ω(1) because we might find element immediately.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-2">Big Theta (Θ) - Tight Bound</h4>
                  <p className="text-lg">Represents average-case complexity. <strong>f(n) = Θ(g(n))</strong> means f(n) grows at same rate as g(n).</p>
                  <p className="text-lg mt-2">Example: Linear search is Θ(n) for random distribution.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Core Data Structures */}
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">2. Fundamental Data Structures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">2.1 Arrays and Lists</h3>
              <p className="text-lg mb-3">
                An <strong>array</strong> is a contiguous block of memory storing elements of the same type. <strong>Lists</strong> (dynamic arrays) grow/shrink automatically.
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Operations:</strong></p>
                <p className="text-lg">• Access: O(1) - Direct memory access by index</p>
                <p className="text-lg">• Search: O(n) - Must check each element sequentially</p>
                <p className="text-lg">• Insert: O(n) - May need to shift elements after insertion point</p>
                <p className="text-lg">• Delete: O(n) - May need to shift remaining elements</p>
              </div>
              <p className="text-lg mt-3"><strong>Advantages:</strong> Fast access, memory efficient, cache-friendly</p>
              <p className="text-lg"><strong>Disadvantages:</strong> Fixed size (static), slow insertion/deletion, requires contiguous memory</p>
              <p className="text-lg mt-3"><strong>Use Cases:</strong> Random access needed, known size, simple sequences</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">2.2 Linked Lists</h3>
              <p className="text-lg mb-3">
                A <strong>linked list</strong> is a linear collection of nodes where each node contains data and a pointer to the next node.
              </p>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Singly Linked List</h4>
                  <p className="text-lg">Each node points to the next node. Traversal only forward.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg font-semibold">Operations:</p>
                    <p className="text-lg">• Access: O(n) - Must traverse from head</p>
                    <p className="text-lg">• Search: O(n) - Sequential search</p>
                    <p className="text-lg">• Insert at head: O(1) - Create node and update pointer</p>
                    <p className="text-lg">• Insert at position: O(n) - Find position first</p>
                    <p className="text-lg">• Delete: O(n) - Find node and update pointers</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Doubly Linked List</h4>
                  <p className="text-lg">Each node has pointers to both next and previous nodes. Allows bidirectional traversal.</p>
                  <p className="text-lg mt-2">Operations are similar to singly linked list but with O(1) backward traversal from any node.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Circular Linked List</h4>
                  <p className="text-lg">Last node points back to first node, forming a circle. No null pointer at end.</p>
                  <p className="text-lg mt-2">Useful for: Round-robin scheduling, music playlists, circular buffers.</p>
                </div>
              </div>
              <p className="text-lg mt-4"><strong>Advantages:</strong> Dynamic size, efficient insertion/deletion, no contiguous memory needed</p>
              <p className="text-lg"><strong>Disadvantages:</strong> Slow access, extra memory for pointers, cache-unfriendly</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">2.3 Stacks (LIFO)</h3>
              <p className="text-lg mb-3">
                A <strong>stack</strong> follows Last-In-First-Out principle. Last element added is first to be removed.
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Core Operations:</strong></p>
                <p className="text-lg">• Push: Add element to top - O(1)</p>
                <p className="text-lg">• Pop: Remove element from top - O(1)</p>
                <p className="text-lg">• Peek/Top: View top element - O(1)</p>
                <p className="text-lg">• isEmpty: Check if stack is empty - O(1)</p>
              </div>
              <p className="text-lg mt-3"><strong>Implementation:</strong> Array-based (with resizing) or Linked List-based</p>
              <p className="text-lg"><strong>Real-World Applications:</strong></p>
              <p className="text-lg">• Function call stack (execution context)</p>
              <p className="text-lg">• Undo/Redo functionality</p>
              <p className="text-lg">• Parentheses/bracket matching</p>
              <p className="text-lg">• Depth-First Search (DFS) traversal</p>
              <p className="text-lg">• Expression evaluation (infix to postfix)</p>
              <p className="text-lg">• Backtracking problems</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">2.4 Queues (FIFO)</h3>
              <p className="text-lg mb-3">
                A <strong>queue</strong> follows First-In-First-Out principle. First element added is first to be removed.
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Core Operations:</strong></p>
                <p className="text-lg">• Enqueue: Add to rear - O(1)</p>
                <p className="text-lg">• Dequeue: Remove from front - O(1)</p>
                <p className="text-lg">• Front/Peek: View front element - O(1)</p>
                <p className="text-lg">• isEmpty: Check if empty - O(1)</p>
              </div>
              <p className="text-lg mt-3"><strong>Variations:</strong></p>
              <p className="text-lg">• Circular Queue - Rear wraps around to front position</p>
              <p className="text-lg">• Priority Queue - Elements have priorities, dequeue highest</p>
              <p className="text-lg">• Double Ended Queue (Deque) - Add/remove from both ends</p>
              <p className="text-lg mt-3"><strong>Real-World Applications:</strong></p>
              <p className="text-lg">• Task scheduling in CPU</p>
              <p className="text-lg">• Print queue management</p>
              <p className="text-lg">• Message queues in systems</p>
              <p className="text-lg">• Breadth-First Search (BFS) traversal</p>
              <p className="text-lg">• Customer service (first come, first served)</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">2.5 Hash Tables / Hash Maps</h3>
              <p className="text-lg mb-3">
                A <strong>hash table</strong> maps keys to values using a hash function. Provides O(1) average access.
              </p>
              <p className="text-lg mt-3"><strong>How it Works:</strong></p>
              <p className="text-lg">1. Hash function converts key to array index</p>
              <p className="text-lg">2. Value stored at that index</p>
              <p className="text-lg">3. Multiple keys may hash to same index (collision)</p>
              
              <div className="space-y-3 mt-3">
                <p className="text-lg"><strong>Collision Resolution:</strong></p>
                <p className="text-lg">• <strong>Chaining:</strong> Store linked list at each index. O(1 + n/m) average (n items, m buckets)</p>
                <p className="text-lg">• <strong>Open Addressing:</strong> Find next empty slot. Includes linear probing, quadratic probing, double hashing</p>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-3 mt-3">
                <p className="text-lg"><strong>Operations (with good hash function):</strong></p>
                <p className="text-lg">• Insert: O(1) average, O(n) worst</p>
                <p className="text-lg">• Search: O(1) average, O(n) worst</p>
                <p className="text-lg">• Delete: O(1) average, O(n) worst</p>
              </div>

              <p className="text-lg mt-3"><strong>Load Factor (α) = n/m</strong></p>
              <p className="text-lg">n = number of elements, m = table size</p>
              <p className="text-lg">• When α exceeds threshold (often 0.75), table is resized (rehashing)</p>
              <p className="text-lg">• Good load factor keeps collisions low</p>

              <p className="text-lg mt-3"><strong>Applications:</strong></p>
              <p className="text-lg">• Implementing dictionaries/maps</p>
              <p className="text-lg">• Caching frequently accessed data</p>
              <p className="text-lg">• Detecting duplicates</p>
              <p className="text-lg">• Counting frequencies</p>
              <p className="text-lg">• Symbol tables in compilers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">2.6 Trees</h3>
              <p className="text-lg mb-3">
                A <strong>tree</strong> is a hierarchical data structure consisting of nodes connected by edges. Each node has at most one parent and zero or more children.
              </p>
              <p className="text-lg"><strong>Terminology:</strong></p>
              <p className="text-lg">• Root - Node with no parent (top of tree)</p>
              <p className="text-lg">• Leaf - Node with no children</p>
              <p className="text-lg">• Height - Number of edges in longest path from node to leaf</p>
              <p className="text-lg">• Depth - Number of edges from root to node</p>
              <p className="text-lg">• Balanced - Height difference between subtrees minimal</p>
              
              <div className="space-y-4 mt-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Binary Trees</h4>
                  <p className="text-lg">Each node has at most 2 children (left and right).</p>
                  <p className="text-lg mt-2"><strong>Traversal Methods:</strong></p>
                  <p className="text-lg">• Inorder (Left-Root-Right): Left subtree {'=>'} node {'=>'} right subtree</p>
                  <p className="text-lg">• Preorder (Root-Left-Right): Node {'=>'} left subtree {'=>'} right subtree</p>
                  <p className="text-lg">• Postorder (Left-Right-Root): Left subtree {'=>'} right subtree {'=>'} node</p>
                  <p className="text-lg">• Level Order: Process nodes level by level (BFS)</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Binary Search Trees (BST)</h4>
                  <p className="text-lg">Left child values {'=>'} node value {'=>'} right child values</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg font-semibold">Operations:</p>
                    <p className="text-lg">• Search: O(log n) average, O(n) worst (unbalanced)</p>
                    <p className="text-lg">• Insert: O(log n) average, O(n) worst</p>
                    <p className="text-lg">• Delete: O(log n) average, O(n) worst</p>
                  </div>
                  <p className="text-lg mt-2"><strong>Issues:</strong> Can become unbalanced (degenerate to linked list)</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Balanced Trees</h4>
                  <p className="text-lg"><strong>AVL Tree:</strong> Self-balancing BST. Height difference (balance factor) between subtrees max 1.</p>
                  <p className="text-lg">Operations: O(log n) guaranteed. Uses rotations to maintain balance.</p>
                  <p className="text-lg mt-2"><strong>Red-Black Tree:</strong> Self-balancing BST using colors. Properties ensure balanced structure.</p>
                  <p className="text-lg">Operations: O(log n) guaranteed. Used in many standard libraries (TreeMap in Java, std::map in C++).</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">2.7 Heaps</h3>
              <p className="text-lg mb-3">
                A <strong>heap</strong> is a complete binary tree satisfying the heap property. Used for priority queues and efficient sorting.
              </p>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Min Heap</h4>
                  <p className="text-lg">Parent value {'=>'} children values. Minimum element at root.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg font-semibold">Operations:</p>
                    <p className="text-lg">• Insert: O(log n) - Add to end, bubble up</p>
                    <p className="text-lg">• Delete Min: O(log n) - Replace root with last, bubble down</p>
                    <p className="text-lg">• Get Min: O(1) - Root element</p>
                    <p className="text-lg">• Heapify: O(n) - Build heap from array</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Max Heap</h4>
                  <p className="text-lg">Parent value {'>='} children values. Maximum element at root.</p>
                  <p className="text-lg mt-2">Same operations as min heap with opposite comparison.</p>
                </div>
              </div>
              <p className="text-lg mt-4"><strong>Applications:</strong></p>
              <p className="text-lg">• Priority queues (process items by priority)</p>
              <p className="text-lg">• Heap sort algorithm O(n log n)</p>
              <p className="text-lg">• Finding k largest/smallest elements</p>
              <p className="text-lg">• Load balancing in systems</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">2.8 Tries (Prefix Trees)</h3>
              <p className="text-lg mb-3">
                A <strong>trie</strong> is a tree structure for efficient string storage and retrieval. Each node represents a character.
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Operations:</strong></p>
                <p className="text-lg">• Insert: O(m) - m is string length</p>
                <p className="text-lg">• Search: O(m) - Same as insert</p>
                <p className="text-lg">• StartsWith: O(m) - Check prefix</p>
                <p className="text-lg">• Delete: O(m) - Remove characters</p>
              </div>
              <p className="text-lg mt-3"><strong>Space Complexity:</strong> O(ALPHABET_SIZE × N) where N is total characters inserted</p>
              <p className="text-lg"><strong>Applications:</strong></p>
              <p className="text-lg">• Autocomplete functionality</p>
              <p className="text-lg">• Spell checking</p>
              <p className="text-lg">• IP routing tables</p>
              <p className="text-lg">• Dictionary implementations</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">2.9 Graphs</h3>
              <p className="text-lg mb-3">
                A <strong>graph</strong> consists of vertices (nodes) connected by edges. Can be directed or undirected, weighted or unweighted.
              </p>
              <p className="text-lg"><strong>Terminology:</strong></p>
              <p className="text-lg">• Vertex - Node in graph</p>
              <p className="text-lg">• Edge - Connection between vertices</p>
              <p className="text-lg">• Degree - Number of edges connected to vertex</p>
              <p className="text-lg">• Path - Sequence of vertices connected by edges</p>
              <p className="text-lg">• Cycle - Path that returns to starting vertex</p>
              <p className="text-lg">• Connected - Path exists between all vertex pairs</p>

              <div className="space-y-4 mt-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Graph Representations</h4>
                  <p className="text-lg"><strong>Adjacency Matrix:</strong> V×V matrix where entry (i,j) = weight of edge from i to j (0 if no edge)</p>
                  <p className="text-lg">Space: O(V²), Edge lookup: O(1), Best for: Dense graphs, complete graphs</p>
                  <p className="text-lg mt-2"><strong>Adjacency List:</strong> Array of lists. Each vertex has list of its neighbors.</p>
                  <p className="text-lg">Space: O(V + E), Edge lookup: O(degree), Best for: Sparse graphs</p>
                </div>
              </div>

              <p className="text-lg mt-3"><strong>Applications:</strong></p>
              <p className="text-lg">• Social networks (users are vertices, friendships are edges)</p>
              <p className="text-lg">• Maps and navigation (cities/intersections are vertices)</p>
              <p className="text-lg">• Web pages (links between pages)</p>
              <p className="text-lg">• Dependency resolution (task scheduling)</p>
              <p className="text-lg">• Recommendation systems</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Graph Algorithms */}
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">3. Graph Algorithms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">3.1 Graph Traversal: BFS</h3>
              <p className="text-lg mb-3">
                <strong>Breadth-First Search</strong> explores all vertices at current depth before moving to next depth level.
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Key Characteristics:</strong></p>
                <p className="text-lg">• Uses Queue data structure (FIFO)</p>
                <p className="text-lg">• Time Complexity: O(V + E) - Visit each vertex and edge once</p>
                <p className="text-lg">• Space Complexity: O(V) - Queue can contain up to V vertices</p>
                <p className="text-lg">• Finds shortest path in unweighted graphs</p>
              </div>

              <p className="text-lg mt-3"><strong>Algorithm Steps:</strong></p>
              <p className="text-lg">1. Start with initial vertex, mark as visited, add to queue</p>
              <p className="text-lg">2. While queue not empty:</p>
              <p className="text-lg">   a. Dequeue vertex from front</p>
              <p className="text-lg">   b. For each unvisited neighbor:</p>
              <p className="text-lg">      - Mark as visited</p>
              <p className="text-lg">      - Add to queue</p>
              <p className="text-lg">      - Record parent (for path reconstruction)</p>

              <p className="text-lg mt-3"><strong>Applications:</strong></p>
              <p className="text-lg">• Finding shortest path in unweighted graphs</p>
              <p className="text-lg">• Level-order tree traversal</p>
              <p className="text-lg">• Detecting cycles in undirected graphs</p>
              <p className="text-lg">• Bipartite graph checking</p>
              <p className="text-lg">• Social network analysis (degrees of separation)</p>
              <p className="text-lg">• GPS navigation (finding reachable destinations)</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">3.2 Graph Traversal: DFS</h3>
              <p className="text-lg mb-3">
                <strong>Depth-First Search</strong> explores as far as possible along each branch before backtracking.
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Key Characteristics:</strong></p>
                <p className="text-lg">• Uses Stack data structure (LIFO) or recursion</p>
                <p className="text-lg">• Time Complexity: O(V + E)</p>
                <p className="text-lg">• Space Complexity: O(V) - Recursion call stack or explicit stack</p>
                <p className="text-lg">• Does not guarantee shortest path</p>
              </div>

              <p className="text-lg mt-3"><strong>Algorithm Steps (Recursive):</strong></p>
              <p className="text-lg">1. Mark current vertex as visited</p>
              <p className="text-lg">2. For each unvisited neighbor:</p>
              <p className="text-lg">   - Recursively call DFS on that neighbor</p>

              <p className="text-lg mt-3"><strong>Applications:</strong></p>
              <p className="text-lg">• Topological sorting (DAG)</p>
              <p className="text-lg">• Cycle detection</p>
              <p className="text-lg">• Strongly connected components (Kosaraju, Tarjan)</p>
              <p className="text-lg">• Bipartite checking</p>
              <p className="text-lg">• Path finding in mazes</p>
              <p className="text-lg">• Backtracking problems (permutations, combinations, N-Queens)</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">3.3 Shortest Path: Dijkstra's Algorithm</h3>
              <p className="text-lg mb-3">
                Finds shortest path from single source to all vertices in weighted graphs with non-negative weights.
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Key Characteristics:</strong></p>
                <p className="text-lg">• Greedy algorithm - always picks unvisited vertex with minimum distance</p>
                <p className="text-lg">• Time: O((V + E) log V) with min-heap, O(V²) with array</p>
                <p className="text-lg">• Space: O(V)</p>
                <p className="text-lg">• Requires non-negative edge weights</p>
                <p className="text-lg">• Optimal substructure - shortest path includes shortest subpaths</p>
              </div>

              <p className="text-lg mt-3"><strong>Algorithm Steps:</strong></p>
              <p className="text-lg">1. Initialize distances: source = 0, others = ∞</p>
              <p className="text-lg">2. Add all vertices to priority queue</p>
              <p className="text-lg">3. While priority queue not empty:</p>
              <p className="text-lg">   a. Extract vertex with minimum distance</p>
              <p className="text-lg">   b. For each neighbor with edge weight w:</p>
              <p className="text-lg">      - If distance[neighbor] {'>'} distance[current] + w:</p>
              <p className="text-lg">        - Update distance[neighbor]</p>
              <p className="text-lg">        - Update priority queue</p>

              <p className="text-lg mt-3"><strong>Important Points:</strong></p>
              <p className="text-lg">• Maintains distance estimates and updates them</p>
              <p className="text-lg">• Once vertex extracted from queue, shortest path is finalized</p>
              <p className="text-lg">• Does not work with negative weights (use Bellman-Ford instead)</p>

              <p className="text-lg mt-3"><strong>Applications:</strong></p>
              <p className="text-lg">• GPS navigation systems</p>
              <p className="text-lg">• Network routing protocols (OSPF)</p>
              <p className="text-lg">• Game pathfinding</p>
              <p className="text-lg">• Resource allocation</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">3.4 A-Star (A*) Search Algorithm</h3>
              <p className="text-lg mb-3">
                Optimal pathfinding using heuristic. Combines Dijkstra (actual cost) with greedy (estimated cost).
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Key Formula:</strong></p>
                <p className="text-lg">f(n) = g(n) + h(n)</p>
                <p className="text-lg">• g(n) = actual cost from start to node n</p>
                <p className="text-lg">• h(n) = heuristic estimate from n to goal</p>
                <p className="text-lg">• f(n) = total estimated cost through node n</p>
              </div>

              <p className="text-lg mt-3"><strong>Key Characteristics:</strong></p>
              <p className="text-lg">• More efficient than Dijkstra when good heuristic available</p>
              <p className="text-lg">• Time: O(E) in best case with perfect heuristic, O(E log E) typical</p>
              <p className="text-lg">• Optimal if heuristic is admissible (never overestimates)</p>
              <p className="text-lg">• Uses Open Set (priority queue) and Closed Set</p>

              <p className="text-lg mt-3"><strong>Algorithm Steps:</strong></p>
              <p className="text-lg">1. Add start node to Open Set</p>
              <p className="text-lg">2. While Open Set not empty:</p>
              <p className="text-lg">   a. Extract node with minimum f(n)</p>
              <p className="text-lg">   b. If goal node, return path</p>
              <p className="text-lg">   c. For each neighbor:</p>
              <p className="text-lg">      - Calculate tentative g(neighbor)</p>
              <p className="text-lg">      - If better path found, update and add to Open Set</p>

              <p className="text-lg mt-3"><strong>Common Heuristics:</strong></p>
              <p className="text-lg">• Manhattan Distance: |x1-x2| + |y1-y2| (grid with 4-directional movement)</p>
              <p className="text-lg">• Euclidean Distance: √((x1-x2)² + (y1-y2)²) (realistic 2D movement)</p>
              <p className="text-lg">• Chebyshev Distance: max(|x1-x2|, |y1-y2|) (grid with 8-directional movement)</p>

              <p className="text-lg mt-3"><strong>Applications:</strong></p>
              <p className="text-lg">• Game AI pathfinding</p>
              <p className="text-lg">• Robot navigation</p>
              <p className="text-lg">• GPS route planning</p>
              <p className="text-lg">• Puzzle solving (sliding puzzle, Rubik's cube)</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">3.5 Minimum Spanning Tree (MST)</h3>
              <p className="text-lg mb-3">
                Finds subset of edges connecting all vertices with minimum total weight. No cycles, spanning (connects all), minimum total weight.
              </p>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Kruskal's Algorithm</h4>
                  <p className="text-lg">Greedy approach: sort edges by weight, add edges that don't create cycles.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg font-semibold">Steps:</p>
                    <p className="text-lg">1. Sort all edges by weight (ascending)</p>
                    <p className="text-lg">2. Initialize Union-Find for all vertices</p>
                    <p className="text-lg">3. For each edge in sorted order:</p>
                    <p className="text-lg">   If edge connects different components (not creating cycle):</p>
                    <p className="text-lg">      - Add edge to MST</p>
                    <p className="text-lg">      - Union the components</p>
                  </div>
                  <p className="text-lg mt-2">Time: O(E log E) for sorting + O(E α(V)) for Union-Find = O(E log E)</p>
                  <p className="text-lg">Space: O(V)</p>
                  <p className="text-lg">Best for: Sparse graphs</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Prim's Algorithm</h4>
                  <p className="text-lg">Greedy approach: start from one vertex, repeatedly add minimum weight edge connecting tree to new vertex.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg font-semibold">Steps:</p>
                    <p className="text-lg">1. Start with arbitrary vertex in MST</p>
                    <p className="text-lg">2. While not all vertices in MST:</p>
                    <p className="text-lg">   - Find minimum weight edge from MST to non-MST vertex</p>
                    <p className="text-lg">   - Add this edge and vertex to MST</p>
                  </div>
                  <p className="text-lg mt-2">Time: O((V + E) log V) with min-heap or O(V²) with array</p>
                  <p className="text-lg">Space: O(V)</p>
                  <p className="text-lg">Best for: Dense graphs</p>
                </div>
              </div>

              <p className="text-lg mt-3"><strong>Properties:</strong></p>
              <p className="text-lg">• MST has exactly V-1 edges</p>
              <p className="text-lg">• Unique if all weights are different</p>
              <p className="text-lg">• Cut property: minimum weight edge crossing any cut belongs to some MST</p>

              <p className="text-lg mt-3"><strong>Applications:</strong></p>
              <p className="text-lg">• Network design (minimal cable for connecting cities)</p>
              <p className="text-lg">• Clustering</p>
              <p className="text-lg">• Travelling salesman problem approximation</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Sorting Algorithms - Expanded */}
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">4. Sorting and Searching Algorithms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">4.1 Comparison-Based Sorting</h3>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Bubble Sort</h4>
                  <p className="text-lg">Repeatedly compares and swaps adjacent elements if in wrong order.</p>
                  <p className="text-lg text-muted-foreground mt-2">Time: O(n²) worst/avg, O(n) best | Space: O(1) | Stable: Yes</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg">Algorithm: For each pass, bubble largest element to end</p>
                    <p className="text-lg">Optimization: Stop if no swaps in a pass</p>
                  </div>
                  <p className="text-lg mt-2"><strong>When to use:</strong> Small datasets, educational purposes</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Selection Sort</h4>
                  <p className="text-lg">Repeatedly finds minimum element and places at beginning.</p>
                  <p className="text-lg text-muted-foreground mt-2">Time: O(n²) all cases | Space: O(1) | Stable: No</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg">Algorithm: Find min in unsorted part, swap with first unsorted</p>
                    <p className="text-lg">Performs fewer swaps than bubble sort</p>
                  </div>
                  <p className="text-lg mt-2"><strong>When to use:</strong> Memory writes expensive, small datasets</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Insertion Sort</h4>
                  <p className="text-lg">Builds sorted array one element at a time by inserting into correct position.</p>
                  <p className="text-lg text-muted-foreground mt-2">Time: O(n²) worst/avg, O(n) best | Space: O(1) | Stable: Yes</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg">Algorithm: Take element, insert into sorted portion by shifting</p>
                    <p className="text-lg">Efficient for small datasets and nearly sorted data</p>
                    <p className="text-lg">Online algorithm - can sort as it receives data</p>
                  </div>
                  <p className="text-lg mt-2"><strong>When to use:</strong> Small n, nearly sorted data, online sorting</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Merge Sort (Detailed)</h4>
                  <p className="text-lg">Divide-and-conquer sorting algorithm splitting array in half recursively.</p>
                  <p className="text-lg text-muted-foreground mt-2">Time: O(n log n) all cases | Space: O(n) | Stable: Yes</p>
                  <div className="bg-secondary/30 p-3 rounded mt-3">
                    <p className="text-lg font-semibold">How It Works:</p>
                    <p className="text-lg">1. <strong>Divide:</strong> Split array at middle</p>
                    <p className="text-lg">2. <strong>Conquer:</strong> Recursively sort both halves</p>
                    <p className="text-lg">3. <strong>Combine:</strong> Merge sorted halves</p>
                  </div>
                  <p className="text-lg mt-3"><strong>Merge Process:</strong></p>
                  <p className="text-lg">• Two pointers, one for each sorted half</p>
                  <p className="text-lg">• Compare elements, copy smaller to result</p>
                  <p className="text-lg">• Copy remaining elements when one half exhausted</p>
                  <p className="text-lg mt-3"><strong>Analysis:</strong></p>
                  <p className="text-lg">• log n levels in recursion tree</p>
                  <p className="text-lg">• Each level does O(n) work for merging</p>
                  <p className="text-lg">• Total: O(n log n)</p>
                  <p className="text-lg mt-3"><strong>When to use:</strong> Guaranteed O(n log n), stable sort needed, linked lists</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Quick Sort (Detailed)</h4>
                  <p className="text-lg">Divide-and-conquer using partitioning around pivot element.</p>
                  <p className="text-lg text-muted-foreground mt-2">Time: O(n log n) avg, O(n²) worst | Space: O(log n) | Stable: No</p>
                  <div className="bg-secondary/30 p-3 rounded mt-3">
                    <p className="text-lg font-semibold">How It Works:</p>
                    <p className="text-lg">1. <strong>Choose Pivot:</strong> Select element as pivot</p>
                    <p className="text-lg">2. <strong>Partition:</strong> Rearrange so smaller left, larger right</p>
                    <p className="text-lg">3. <strong>Recursively Sort:</strong> Apply to left and right partitions</p>
                  </div>
                  <p className="text-lg mt-3"><strong>Partition Algorithms:</strong></p>
                  <p className="text-lg">• Lomuto: Simpler, pivot at end</p>
                  <p className="text-lg">• Hoare: More efficient, fewer swaps</p>
                  <p className="text-lg mt-3"><strong>Pivot Selection Strategies:</strong></p>
                  <p className="text-lg">• First/Last: Simple but O(n²) on sorted data</p>
                  <p className="text-lg">• Random: Good average case</p>
                  <p className="text-lg">• Median-of-three: Better pivot quality</p>
                  <p className="text-lg">• True median: Guaranteed O(n log n) but overhead</p>
                  <p className="text-lg mt-3"><strong>Optimization Techniques:</strong></p>
                  <p className="text-lg">• Switch to insertion sort for small subarrays (n {'{<'} 10)</p>
                  <p className="text-lg">• Three-way partitioning for many duplicates</p>
                  <p className="text-lg">• Tail recursion elimination</p>
                  <p className="text-lg mt-3"><strong>When to use:</strong> General purpose, in-place sorting, average O(n log n)</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Heap Sort</h4>
                  <p className="text-lg">Uses binary heap data structure to sort in-place.</p>
                  <p className="text-lg text-muted-foreground mt-2">Time: O(n log n) all cases | Space: O(1) | Stable: No</p>
                  <div className="bg-secondary/30 p-3 rounded mt-3">
                    <p className="text-lg font-semibold">Algorithm:</p>
                    <p className="text-lg">1. <strong>Build Max Heap:</strong> Heapify array - O(n)</p>
                    <p className="text-lg">2. <strong>Extract Max:</strong> Swap root with last, reduce heap size</p>
                    <p className="text-lg">3. <strong>Restore Heap:</strong> Bubble down new root - O(log n)</p>
                    <p className="text-lg">4. Repeat steps 2-3 for n elements</p>
                  </div>
                  <p className="text-lg mt-3"><strong>Advantages:</strong></p>
                  <p className="text-lg">• Guaranteed O(n log n) performance</p>
                  <p className="text-lg">• In-place (O(1) extra space)</p>
                  <p className="text-lg">• No worst-case degradation like Quick Sort</p>
                  <p className="text-lg mt-3"><strong>Disadvantages:</strong></p>
                  <p className="text-lg">• Not stable</p>
                  <p className="text-lg">• Cache-unfriendly (non-sequential memory access)</p>
                  <p className="text-lg">• Slower in practice than Quick Sort</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">4.2 Non-Comparison Sorting</h3>
              <p className="text-lg mb-3">
                Algorithms that don't compare elements directly. Can achieve O(n) time under specific conditions.
              </p>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Counting Sort</h4>
                  <p className="text-lg">For integers in limited range [0, k]. Counts occurrences of each value.</p>
                  <p className="text-lg text-muted-foreground mt-2">Time: O(n + k) | Space: O(k) | Stable: Yes</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg font-semibold">Algorithm:</p>
                    <p className="text-lg">1. Count frequency of each element</p>
                    <p className="text-lg">2. Calculate cumulative counts (positions)</p>
                    <p className="text-lg">3. Place elements at correct positions</p>
                  </div>
                  <p className="text-lg mt-2"><strong>When to use:</strong> Small integer range, k not much larger than n</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Radix Sort</h4>
                  <p className="text-lg">Sorts by processing individual digits/characters using stable sort as subroutine.</p>
                  <p className="text-lg text-muted-foreground mt-2">Time: O(d(n + k)) where d=digits | Space: O(n + k) | Stable: Yes</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg font-semibold">Algorithm:</p>
                    <p className="text-lg">1. For each digit position (least to most significant):</p>
                    <p className="text-lg">2. Use counting sort to sort by that digit</p>
                    <p className="text-lg">3. Stable sort maintains relative order</p>
                  </div>
                  <p className="text-lg mt-2"><strong>When to use:</strong> Fixed-width integers, strings of equal length</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Bucket Sort</h4>
                  <p className="text-lg">Distributes elements into buckets, sorts buckets individually.</p>
                  <p className="text-lg text-muted-foreground mt-2">Time: O(n + k) average | Space: O(n + k) | Stable: Can be</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg font-semibold">Algorithm:</p>
                    <p className="text-lg">1. Create k empty buckets</p>
                    <p className="text-lg">2. Distribute elements into buckets based on range</p>
                    <p className="text-lg">3. Sort each bucket (insertion sort typically)</p>
                    <p className="text-lg">4. Concatenate buckets</p>
                  </div>
                  <p className="text-lg mt-2"><strong>When to use:</strong> Uniformly distributed data over a range</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">4.3 Searching Algorithms</h3>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Linear Search</h4>
                  <p className="text-lg">Sequentially check each element until target found or end reached.</p>
                  <p className="text-lg text-muted-foreground mt-2">Time: O(n) | Space: O(1)</p>
                  <p className="text-lg mt-2"><strong>When to use:</strong> Unsorted data, small datasets</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Binary Search (Detailed)</h4>
                  <p className="text-lg">Efficiently search sorted array by repeatedly dividing search interval in half.</p>
                  <p className="text-lg text-muted-foreground mt-2">Time: O(log n) | Space: O(1) iterative, O(log n) recursive</p>
                  <div className="bg-secondary/30 p-3 rounded mt-3">
                    <p className="text-lg font-semibold">Algorithm:</p>
                    <p className="text-lg">1. Initialize left = 0, right = n-1</p>
                    <p className="text-lg">2. While left {'{<='} right:</p>
                    <p className="text-lg">   a. mid = left + (right - left) / 2</p>
                    <p className="text-lg">   b. If arr[mid] == target: return mid</p>
                    <p className="text-lg">   c. If arr[mid] {'{<'} target: left = mid + 1</p>
                    <p className="text-lg">   d. Else: right = mid - 1</p>
                    <p className="text-lg">3. Return -1 if not found</p>
                  </div>
                  <p className="text-lg mt-3"><strong>Variants:</strong></p>
                  <p className="text-lg">• Find first occurrence</p>
                  <p className="text-lg">• Find last occurrence</p>
                  <p className="text-lg">• Find closest element</p>
                  <p className="text-lg">• Lower bound: smallest element {'>='} target</p>
                  <p className="text-lg">• Upper bound: smallest element {'>'} target</p>
                  <p className="text-lg mt-3"><strong>Binary Search on Answer:</strong></p>
                  <p className="text-lg">Use when answer space is sorted and can verify candidate efficiently</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Ternary Search</h4>
                  <p className="text-lg">Divide search space into three parts. For unimodal functions.</p>
                  <p className="text-lg text-muted-foreground mt-2">Time: O(log n) | Space: O(1)</p>
                  <p className="text-lg mt-2">Finds maximum/minimum of unimodal function</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Exponential Search</h4>
                  <p className="text-lg">Find range where element exists, then binary search.</p>
                  <p className="text-lg text-muted-foreground mt-2">Time: O(log n) | Space: O(1)</p>
                  <p className="text-lg mt-2">Good for unbounded/infinite arrays</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Interpolation Search</h4>
                  <p className="text-lg">Improved binary search for uniformly distributed sorted arrays.</p>
                  <p className="text-lg text-muted-foreground mt-2">Time: O(log log n) average, O(n) worst | Space: O(1)</p>
                  <p className="text-lg mt-2">Uses value to estimate position rather than always midpoint</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">4.4 Sorting Algorithm Selection Guide</h3>
              
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Choose based on requirements:</strong></p>
                <p className="text-lg">• <strong>Stability needed:</strong> Merge Sort, Insertion Sort, Counting Sort</p>
                <p className="text-lg">• <strong>In-place required:</strong> Quick Sort, Heap Sort, Selection Sort</p>
                <p className="text-lg">• <strong>Guaranteed O(n log n):</strong> Merge Sort, Heap Sort</p>
                <p className="text-lg">• <strong>Fast average case:</strong> Quick Sort</p>
                <p className="text-lg">• <strong>Small dataset:</strong> Insertion Sort</p>
                <p className="text-lg">• <strong>Nearly sorted:</strong> Insertion Sort</p>
                <p className="text-lg">• <strong>Limited value range:</strong> Counting Sort, Radix Sort</p>
                <p className="text-lg">• <strong>External sorting:</strong> Merge Sort</p>
                <p className="text-lg">• <strong>Online sorting:</strong> Insertion Sort</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Dynamic Programming - Expanded */}
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">5. Dynamic Programming</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">5.1 Core Concepts</h3>
              <p className="text-lg mb-3">
                <strong>Dynamic Programming (DP)</strong> is an optimization technique that solves complex problems by breaking them down into simpler overlapping subproblems and storing their solutions to avoid redundant computation.
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg font-semibold">Two Essential Properties:</p>
                <p className="text-lg">1. <strong>Optimal Substructure:</strong> An optimal solution can be constructed from optimal solutions of its subproblems</p>
                <p className="text-lg">2. <strong>Overlapping Subproblems:</strong> The same subproblems are solved multiple times in a naive recursive approach</p>
              </div>
              <p className="text-lg mt-3"><strong>When to use DP:</strong></p>
              <p className="text-lg">• Problem asks for optimization (min/max)</p>
              <p className="text-lg">• Problem asks for counting (number of ways)</p>
              <p className="text-lg">• Problem asks if something is possible (yes/no)</p>
              <p className="text-lg">• Future decisions depend on earlier decisions</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">5.2 Approaches</h3>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Top-Down (Memoization)</h4>
                  <p className="text-lg">Write recursive solution, add cache to store computed results.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-3">
                    <p className="text-lg font-semibold">Process:</p>
                    <p className="text-lg">1. Write recursive solution</p>
                    <p className="text-lg">2. Add memo dictionary/array</p>
                    <p className="text-lg">3. Before computing, check if result in memo</p>
                    <p className="text-lg">4. After computing, store result in memo</p>
                    <p className="text-lg">5. Return cached or computed result</p>
                  </div>
                  <p className="text-lg mt-3"><strong>Advantages:</strong></p>
                  <p className="text-lg">• Natural to write (follows problem structure)</p>
                  <p className="text-lg">• Only computes needed subproblems</p>
                  <p className="text-lg">• Easy to debug and understand</p>
                  <p className="text-lg mt-3"><strong>Disadvantages:</strong></p>
                  <p className="text-lg">• Recursion overhead (call stack)</p>
                  <p className="text-lg">• Risk of stack overflow for deep recursion</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Bottom-Up (Tabulation)</h4>
                  <p className="text-lg">Build table iteratively from base cases to target.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-3">
                    <p className="text-lg font-semibold">Process:</p>
                    <p className="text-lg">1. Identify state variables (dimensions of DP table)</p>
                    <p className="text-lg">2. Define recurrence relation</p>
                    <p className="text-lg">3. Initialize base cases in table</p>
                    <p className="text-lg">4. Fill table in correct order (ensure dependencies computed first)</p>
                    <p className="text-lg">5. Return answer from table</p>
                  </div>
                  <p className="text-lg mt-3"><strong>Advantages:</strong></p>
                  <p className="text-lg">• No recursion overhead</p>
                  <p className="text-lg">• Better cache locality</p>
                  <p className="text-lg">• Can optimize space (rolling array)</p>
                  <p className="text-lg mt-3"><strong>Disadvantages:</strong></p>
                  <p className="text-lg">• Computes all subproblems (even unnecessary ones)</p>
                  <p className="text-lg">• May be less intuitive</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">5.3 Classic DP Problems</h3>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Fibonacci Sequence</h4>
                  <p className="text-lg">Compute nth Fibonacci number.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg"><strong>Recurrence:</strong> fib(n) = fib(n-1) + fib(n-2)</p>
                    <p className="text-lg"><strong>Base cases:</strong> fib(0) = 0, fib(1) = 1</p>
                    <p className="text-lg"><strong>Time:</strong> O(n) with DP vs O(2ⁿ) naive</p>
                    <p className="text-lg"><strong>Space:</strong> O(n) or O(1) with rolling variables</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">0-1 Knapsack</h4>
                  <p className="text-lg">Select items to maximize value without exceeding weight capacity.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg"><strong>State:</strong> dp[i][w] = max value using first i items with capacity w</p>
                    <p className="text-lg"><strong>Recurrence:</strong></p>
                    <p className="text-lg">dp[i][w] = max(dp[i-1][w], value[i] + dp[i-1][w-weight[i]])</p>
                    <p className="text-lg"><strong>Time:</strong> O(n×W) where n=items, W=capacity</p>
                    <p className="text-lg"><strong>Space:</strong> O(n×W) or O(W) with space optimization</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Longest Common Subsequence (LCS)</h4>
                  <p className="text-lg">Find longest sequence common to two strings (not necessarily contiguous).</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg"><strong>State:</strong> dp[i][j] = LCS length of s1[0...i-1] and s2[0...j-1]</p>
                    <p className="text-lg"><strong>Recurrence:</strong></p>
                    <p className="text-lg">• If s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] + 1</p>
                    <p className="text-lg">• Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])</p>
                    <p className="text-lg"><strong>Time:</strong> O(m×n) | <strong>Space:</strong> O(m×n)</p>
                  </div>
                  <p className="text-lg mt-2"><strong>Related:</strong> Longest Common Substring, Edit Distance</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Longest Increasing Subsequence (LIS)</h4>
                  <p className="text-lg">Find length of longest strictly increasing subsequence.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg"><strong>DP Solution (O(n²)):</strong></p>
                    <p className="text-lg">dp[i] = length of LIS ending at index i</p>
                    <p className="text-lg">dp[i] = max(dp[j] + 1) for all j {'{<'} i where arr[j] {'{<'} arr[i]</p>
                    <p className="text-lg mt-2"><strong>Optimized (O(n log n)):</strong></p>
                    <p className="text-lg">Binary search + patience sorting approach</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Coin Change</h4>
                  <p className="text-lg">Minimum coins needed to make target amount.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg"><strong>State:</strong> dp[amount] = min coins needed for that amount</p>
                    <p className="text-lg"><strong>Recurrence:</strong></p>
                    <p className="text-lg">dp[amount] = min(dp[amount - coin] + 1) for all coins {'<='} amount</p>
                    <p className="text-lg"><strong>Time:</strong> O(amount × coins) | <strong>Space:</strong> O(amount)</p>
                  </div>
                  <p className="text-lg mt-2"><strong>Variation:</strong> Count number of ways to make amount (unbounded knapsack)</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Edit Distance (Levenshtein)</h4>
                  <p className="text-lg">Minimum operations (insert/delete/replace) to convert one string to another.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg"><strong>State:</strong> dp[i][j] = edit distance between s1[0...i-1] and s2[0...j-1]</p>
                    <p className="text-lg"><strong>Recurrence:</strong></p>
                    <p className="text-lg">• If chars match: dp[i][j] = dp[i-1][j-1]</p>
                    <p className="text-lg">• Else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])</p>
                    <p className="text-lg"><strong>Time:</strong> O(m×n) | <strong>Space:</strong> O(m×n)</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Matrix Chain Multiplication</h4>
                  <p className="text-lg">Minimum scalar multiplications needed to multiply chain of matrices.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg"><strong>State:</strong> dp[i][j] = min cost to multiply matrices i to j</p>
                    <p className="text-lg"><strong>Recurrence:</strong></p>
                    <p className="text-lg">dp[i][j] = min(dp[i][k] + dp[k+1][j] + dimensions cost)</p>
                    <p className="text-lg"><strong>Time:</strong> O(n³) | <strong>Space:</strong> O(n²)</p>
                  </div>
                  <p className="text-lg mt-2"><strong>Related:</strong> Optimal BST, Burst Balloons</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">5.4 DP Patterns</h3>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Linear DP:</strong> 1D array, each state depends on previous states (Fibonacci, House Robber)</p>
                <p className="text-lg"><strong>2D DP:</strong> Matrix, states depend on multiple dimensions (LCS, Edit Distance, Knapsack)</p>
                <p className="text-lg"><strong>Interval DP:</strong> Subproblems defined by intervals [i, j] (Matrix Chain, Palindrome Partitioning)</p>
                <p className="text-lg"><strong>Tree DP:</strong> DP on tree structures (Max Path Sum, Diameter)</p>
                <p className="text-lg"><strong>Bitmask DP:</strong> Use bits to represent state (Traveling Salesman, Assignment Problem)</p>
                <p className="text-lg"><strong>Digit DP:</strong> Count numbers satisfying property (Count digits, Sum of digits)</p>
                <p className="text-lg"><strong>DP on Subsets:</strong> Iterate through all subsets (Subset Sum, Partition)</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">5.5 Space Optimization Techniques</h3>

              <div className="space-y-3">
                <p className="text-lg"><strong>Rolling Array:</strong> If dp[i] only depends on dp[i-1], use two 1D arrays instead of 2D</p>
                <p className="text-lg"><strong>Single Array:</strong> If updates processed in correct order, can use single array</p>
                <p className="text-lg"><strong>Reverse Iteration:</strong> For 0-1 knapsack, iterate weights in reverse to avoid reusing values</p>
                <p className="text-lg"><strong>Example:</strong> Fibonacci O(1) space using two variables instead of array</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">5.6 DP Problem-Solving Steps</h3>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                <p className="text-lg">1. <strong>Identify:</strong> Is it a DP problem? (optimization, overlapping subproblems)</p>
                <p className="text-lg">2. <strong>Define state:</strong> What information needed to represent subproblem?</p>
                <p className="text-lg">3. <strong>Recurrence relation:</strong> How to compute state from smaller states?</p>
                <p className="text-lg">4. <strong>Base cases:</strong> What are the simplest subproblems?</p>
                <p className="text-lg">5. <strong>Order:</strong> In what order to compute states? (dependencies)</p>
                <p className="text-lg">6. <strong>Implement:</strong> Choose top-down or bottom-up</p>
                <p className="text-lg">7. <strong>Optimize:</strong> Can space be reduced? Are all states needed?</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 6: Searching Algorithms */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">6. Searching Algorithms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold mb-3">Linear Search</h4>
              <p className="text-lg">Scans array sequentially until element found</p>
              <p className="text-lg text-muted-foreground mt-2">Time: O(n) | Space: O(1)</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-3">Binary Search</h4>
              <p className="text-lg">Divides sorted array in half, eliminating half of remaining elements each iteration</p>
              <p className="text-lg text-muted-foreground mt-2">Time: O(log n) | Space: O(1)</p>
              <p className="text-lg mt-2"><strong>Requirement:</strong> Array must be sorted</p>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-3">Binary Search Variations</h4>
              <p className="text-lg">Find first occurrence, last occurrence, closest element, left bound, right bound</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 7: Greedy Algorithms - Expanded */}
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">7. Greedy Algorithms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">7.1 Core Principles</h3>
              <p className="text-lg mb-3">
                <strong>Greedy algorithms</strong> build solutions by making locally optimal choices at each step, hoping to find a global optimum. They work when a problem exhibits the greedy choice property.
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg font-semibold">Key Properties:</p>
                <p className="text-lg">1. <strong>Greedy Choice Property:</strong> A globally optimal solution can be arrived at by making locally optimal choices</p>
                <p className="text-lg">2. <strong>Optimal Substructure:</strong> An optimal solution contains optimal solutions to subproblems</p>
              </div>
              <p className="text-lg mt-3"><strong>Greedy vs DP:</strong></p>
              <p className="text-lg">• Greedy: Make choice before solving subproblems (never reconsider)</p>
              <p className="text-lg">• DP: Solve subproblems first, then make choice</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">7.2 Classic Greedy Problems</h3>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Activity Selection Problem</h4>
                  <p className="text-lg">Select maximum number of non-overlapping activities from set with start and end times.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-3">
                    <p className="text-lg font-semibold">Greedy Strategy:</p>
                    <p className="text-lg">1. Sort activities by finish time</p>
                    <p className="text-lg">2. Select first activity</p>
                    <p className="text-lg">3. For remaining activities, select if start time {'>='} last selected finish time</p>
                    <p className="text-lg mt-2"><strong>Why it works:</strong> Choosing activity that finishes earliest leaves most room for remaining activities</p>
                  </div>
                  <p className="text-lg mt-3"><strong>Time:</strong> O(n log n) for sorting | <strong>Space:</strong> O(1)</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Huffman Coding</h4>
                  <p className="text-lg">Build optimal prefix-free binary code for data compression.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-3">
                    <p className="text-lg font-semibold">Algorithm:</p>
                    <p className="text-lg">1. Create leaf node for each symbol with its frequency</p>
                    <p className="text-lg">2. Build min-heap of nodes</p>
                    <p className="text-lg">3. While heap has more than one node:</p>
                    <p className="text-lg">   a. Extract two minimum frequency nodes</p>
                    <p className="text-lg">   b. Create new internal node with these as children</p>
                    <p className="text-lg">   c. New node frequency = sum of children frequencies</p>
                    <p className="text-lg">   d. Add new node to heap</p>
                    <p className="text-lg">4. Remaining node is root; generate codes from tree</p>
                  </div>
                  <p className="text-lg mt-3"><strong>Time:</strong> O(n log n) | <strong>Space:</strong> O(n)</p>
                  <p className="text-lg mt-2"><strong>Result:</strong> Minimum average code length for given frequencies</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Fractional Knapsack</h4>
                  <p className="text-lg">Maximize value of items in knapsack; can take fractions of items.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-3">
                    <p className="text-lg font-semibold">Greedy Strategy:</p>
                    <p className="text-lg">1. Calculate value-to-weight ratio for each item</p>
                    <p className="text-lg">2. Sort items by ratio (descending)</p>
                    <p className="text-lg">3. Take items with highest ratios</p>
                    <p className="text-lg">4. Take fraction of last item if capacity allows</p>
                  </div>
                  <p className="text-lg mt-3"><strong>Time:</strong> O(n log n) | <strong>Space:</strong> O(1)</p>
                  <p className="text-lg mt-2"><strong>Note:</strong> 0-1 Knapsack (can't take fractions) requires DP, not greedy</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Job Sequencing with Deadlines</h4>
                  <p className="text-lg">Schedule jobs to maximize profit; each job has deadline and profit.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-3">
                    <p className="text-lg font-semibold">Greedy Strategy:</p>
                    <p className="text-lg">1. Sort jobs by profit (descending)</p>
                    <p className="text-lg">2. For each job, find latest available slot before deadline</p>
                    <p className="text-lg">3. Schedule job in that slot</p>
                  </div>
                  <p className="text-lg mt-3"><strong>Time:</strong> O(n²) or O(n log n) with union-find</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Minimum Spanning Tree (MST)</h4>
                  <p className="text-lg">Both Kruskal's and Prim's are greedy algorithms.</p>
                  <p className="text-lg mt-2"><strong>Kruskal's greedy choice:</strong> Always add cheapest edge that doesn't create cycle</p>
                  <p className="text-lg"><strong>Prim's greedy choice:</strong> Always add cheapest edge connecting tree to non-tree vertex</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Interval Scheduling Maximization</h4>
                  <p className="text-lg">Given intervals with weights, select non-overlapping intervals with maximum total weight.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg">• If all weights equal: Activity Selection (greedy works)</p>
                    <p className="text-lg">• If weights differ: Weighted Interval Scheduling (requires DP)</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Gas Station Problem</h4>
                  <p className="text-lg">Find starting gas station to complete circular route.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-3">
                    <p className="text-lg font-semibold">Greedy Insight:</p>
                    <p className="text-lg">• If total gas {'>='} total cost, solution exists</p>
                    <p className="text-lg">• If can't reach station i from j, can't reach from any k between j and i</p>
                    <p className="text-lg">• Start from station after failed point</p>
                  </div>
                  <p className="text-lg mt-3"><strong>Time:</strong> O(n) | <strong>Space:</strong> O(1)</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">7.3 Proving Greedy Correctness</h3>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg font-semibold">Two Main Techniques:</p>
                <p className="text-lg"><strong>1. Greedy Stays Ahead:</strong></p>
                <p className="text-lg">• Show greedy solution is "ahead" of any other solution at each step</p>
                <p className="text-lg">• Used for Activity Selection proof</p>
                <p className="text-lg mt-3"><strong>2. Exchange Argument:</strong></p>
                <p className="text-lg">• Start with optimal solution different from greedy</p>
                <p className="text-lg">• Show can exchange to make it more like greedy without worsening</p>
                <p className="text-lg">• Repeat until get greedy solution</p>
                <p className="text-lg">• Used for MST, Huffman coding proofs</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">7.4 When Greedy Doesn't Work</h3>

              <div className="space-y-3">
                <p className="text-lg"><strong>0-1 Knapsack:</strong> Taking highest value-to-weight ratio first doesn't guarantee optimum</p>
                <p className="text-lg"><strong>Longest Path:</strong> Taking longest edge first doesn't work (requires DP or backtracking)</p>
                <p className="text-lg"><strong>Weighted Interval Scheduling:</strong> Need DP when weights differ</p>
                <p className="text-lg"><strong>Coin Change (arbitrary denominations):</strong> Greedy (largest coin first) may not give minimum coins</p>
                <p className="text-lg mt-3"><strong>Warning:</strong> Always verify greedy choice property before using greedy approach!</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">7.5 Greedy Strategy Development</h3>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                <p className="text-lg">1. <strong>Cast problem as making sequence of choices</strong></p>
                <p className="text-lg">2. <strong>Identify promising greedy strategy</strong> (sort by some criteria)</p>
                <p className="text-lg">3. <strong>Prove greedy choice property</strong> (local optimum leads to global)</p>
                <p className="text-lg">4. <strong>Prove optimal substructure</strong> (optimal solution contains optimal subsolutions)</p>
                <p className="text-lg">5. <strong>Implement and test</strong> with counterexamples</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 8: Advanced Topics - Expanded */}
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">8. Advanced Topics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">8.1 Backtracking</h3>
              <p className="text-lg mb-3">
                <strong>Backtracking</strong> is a systematic way to explore all possible solutions by building candidates incrementally and abandoning candidates ("backtracking") when they fail to satisfy constraints.
              </p>
              
              <div className="bg-secondary/50 p-4 rounded-lg mb-4">
                <p className="text-lg font-semibold">General Template:</p>
                <p className="text-lg">1. Choose: Pick an element to add to candidate solution</p>
                <p className="text-lg">2. Explore: Recursively explore with that choice</p>
                <p className="text-lg">3. Unchoose: Backtrack by removing the choice</p>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">N-Queens Problem</h4>
                  <p className="text-lg">Place N chess queens on N×N board so no two queens attack each other.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg"><strong>Approach:</strong> Place one queen per row, try all columns</p>
                    <p className="text-lg"><strong>Constraint:</strong> No two queens in same row, column, or diagonal</p>
                    <p className="text-lg"><strong>Time:</strong> O(N!) | <strong>Space:</strong> O(N)</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Sudoku Solver</h4>
                  <p className="text-lg">Fill 9×9 grid so each row, column, and 3×3 box contains digits 1-9.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg"><strong>Approach:</strong> Try digits 1-9 for each empty cell</p>
                    <p className="text-lg"><strong>Optimization:</strong> Start with cells having fewest possibilities</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Generate All Permutations</h4>
                  <p className="text-lg">Generate all permutations of array elements.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg"><strong>Approach:</strong> Swap each element with each position, recurse, unswap</p>
                    <p className="text-lg"><strong>Time:</strong> O(N!) | <strong>Space:</strong> O(N)</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Generate All Subsets</h4>
                  <p className="text-lg">Generate all subsets (power set) of a set.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg"><strong>Approaches:</strong></p>
                    <p className="text-lg">• Backtracking: Include/exclude each element</p>
                    <p className="text-lg">• Bit manipulation: Iterate 0 to 2^n-1</p>
                    <p className="text-lg"><strong>Time:</strong> O(2^N × N) | <strong>Space:</strong> O(N)</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Word Search in Grid</h4>
                  <p className="text-lg">Find if word exists in grid by moving adjacently.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg"><strong>Approach:</strong> DFS from each cell, mark visited, backtrack</p>
                    <p className="text-lg"><strong>Optimization:</strong> Prune early if character doesn't match</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Combination Sum</h4>
                  <p className="text-lg">Find all combinations that sum to target.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg"><strong>Variations:</strong></p>
                    <p className="text-lg">• With repetition allowed</p>
                    <p className="text-lg">• Without repetition (each element used once)</p>
                    <p className="text-lg">• With duplicates in array</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">8.2 Divide and Conquer</h3>
              <p className="text-lg mb-3">
                <strong>Divide and Conquer</strong> breaks problem into independent subproblems, solves each recursively, then combines solutions.
              </p>

              <div className="bg-secondary/50 p-4 rounded-lg mb-4">
                <p className="text-lg font-semibold">Three Steps:</p>
                <p className="text-lg">1. <strong>Divide:</strong> Break into smaller subproblems</p>
                <p className="text-lg">2. <strong>Conquer:</strong> Solve subproblems recursively</p>
                <p className="text-lg">3. <strong>Combine:</strong> Merge solutions to get final answer</p>
              </div>

              <div className="space-y-3">
                <p className="text-lg"><strong>Examples:</strong></p>
                <p className="text-lg">• Merge Sort: Divide array, sort halves, merge</p>
                <p className="text-lg">• Quick Sort: Partition, sort partitions</p>
                <p className="text-lg">• Binary Search: Divide search space in half</p>
                <p className="text-lg">• Strassen's Matrix Multiplication: O(n^2.807) instead of O(n³)</p>
                <p className="text-lg">• Closest Pair of Points: Divide plane, find in each half, check middle strip</p>
                <p className="text-lg">• Maximum Subarray: Divide, find max in left, right, and crossing</p>
              </div>

              <p className="text-lg mt-4"><strong>Master Theorem:</strong> Analyze recurrence T(n) = aT(n/b) + f(n)</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">8.3 Union-Find (Disjoint Set Union)</h3>
              <p className="text-lg mb-3">
                Data structure for tracking elements partitioned into disjoint sets with efficient union and find operations.
              </p>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Operations</h4>
                  <p className="text-lg"><strong>Find(x):</strong> Determine which set element x belongs to (returns representative/root)</p>
                  <p className="text-lg"><strong>Union(x, y):</strong> Merge sets containing x and y</p>
                  <p className="text-lg mt-3"><strong>Time Complexity:</strong> O(α(n)) per operation with optimizations</p>
                  <p className="text-lg">α(n) is inverse Ackermann function, effectively constant (≤ 4 for practical n)</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Optimizations</h4>
                  <div className="bg-secondary/30 p-3 rounded">
                    <p className="text-lg"><strong>Path Compression:</strong> During Find, make all nodes point directly to root</p>
                    <p className="text-lg mt-2"><strong>Union by Rank:</strong> Attach smaller tree under root of larger tree</p>
                    <p className="text-lg mt-2"><strong>Union by Size:</strong> Alternative: attach tree with fewer elements to larger</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Applications</h4>
                  <p className="text-lg">• Kruskal's MST algorithm (detect cycles)</p>
                  <p className="text-lg">• Connected components in graph</p>
                  <p className="text-lg">• Detecting cycles in undirected graph</p>
                  <p className="text-lg">• Network connectivity</p>
                  <p className="text-lg">• Image processing (connected regions)</p>
                  <p className="text-lg">• Least Common Ancestor (LCA) offline queries</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">8.4 Segment Trees</h3>
              <p className="text-lg mb-3">
                Tree data structure for answering range queries on arrays efficiently.
              </p>

              <div className="bg-secondary/50 p-4 rounded-lg mb-3">
                <p className="text-lg"><strong>Operations:</strong></p>
                <p className="text-lg">• Range Query: O(log n) - sum, min, max, GCD over range</p>
                <p className="text-lg">• Point Update: O(log n) - update single element</p>
                <p className="text-lg">• Range Update: O(log n) - with lazy propagation</p>
              </div>

              <p className="text-lg"><strong>Use cases:</strong> Range sum/min/max queries, range updates</p>
              <p className="text-lg"><strong>Space:</strong> O(4n) ≈ O(n)</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">8.5 Fenwick Tree (Binary Indexed Tree)</h3>
              <p className="text-lg mb-3">
                Efficient data structure for prefix sum queries and point updates.
              </p>

              <div className="bg-secondary/50 p-4 rounded-lg mb-3">
                <p className="text-lg"><strong>Operations:</strong></p>
                <p className="text-lg">• Prefix Sum: O(log n)</p>
                <p className="text-lg">• Range Sum: O(log n) - query(r) - query(l-1)</p>
                <p className="text-lg">• Point Update: O(log n)</p>
              </div>

              <p className="text-lg"><strong>Advantages over Segment Tree:</strong> Simpler code, less space, faster constants</p>
              <p className="text-lg"><strong>Limitation:</strong> Less flexible (designed for sum/XOR operations)</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 9: Problem-Solving Strategy - Expanded */}
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">9. Problem-Solving Strategy & Frameworks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">9.1 Systematic Problem-Solving Process</h3>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Step 1: Understand the Problem</h4>
                  <p className="text-lg"><strong>Read carefully</strong> - Don't rush, understand every word</p>
                  <p className="text-lg"><strong>Identify:</strong></p>
                  <p className="text-lg">• Input: What are you given? Format? Constraints?</p>
                  <p className="text-lg">• Output: What should you return? What format?</p>
                  <p className="text-lg">• Constraints: Size limits (n≤10^5?), value ranges, special rules</p>
                  <p className="text-lg mt-2"><strong>Ask clarifying questions:</strong></p>
                  <p className="text-lg">• Can input be empty? Negative? Duplicates?</p>
                  <p className="text-lg">• Is array sorted? Can I modify input?</p>
                  <p className="text-lg">• What should happen with edge cases?</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Step 2: Work Through Examples</h4>
                  <p className="text-lg"><strong>Start small:</strong> Work through example by hand</p>
                  <p className="text-lg"><strong>Test edge cases:</strong></p>
                  <p className="text-lg">• Empty input, single element</p>
                  <p className="text-lg">• All same elements, all different</p>
                  <p className="text-lg">• Already sorted vs reverse sorted</p>
                  <p className="text-lg">• Minimum and maximum constraint values</p>
                  <p className="text-lg mt-2"><strong>Identify patterns:</strong> What changes? What stays same?</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Step 3: Brainstorm Approaches</h4>
                  <p className="text-lg"><strong>Think of multiple solutions:</strong></p>
                  <p className="text-lg">• Brute force: What's the naive solution?</p>
                  <p className="text-lg">• Pattern matching: Does it fit known pattern?</p>
                  <p className="text-lg">• Data structure: Would hash table, heap, etc. help?</p>
                  <p className="text-lg">• Algorithm: BFS, DP, binary search, greedy?</p>
                  <p className="text-lg mt-2"><strong>Estimate complexity:</strong> Will it pass time limits?</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Step 4: Design & Explain</h4>
                  <p className="text-lg"><strong>Before coding:</strong></p>
                  <p className="text-lg">• Verbally explain your approach</p>
                  <p className="text-lg">• Draw diagrams if helpful</p>
                  <p className="text-lg">• State time and space complexity</p>
                  <p className="text-lg">• Get interviewer buy-in before implementing</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Step 5: Implement Carefully</h4>
                  <p className="text-lg"><strong>Code cleanly:</strong></p>
                  <p className="text-lg">• Use descriptive variable names</p>
                  <p className="text-lg">• Write helper functions for clarity</p>
                  <p className="text-lg">• Add comments for complex logic</p>
                  <p className="text-lg">• Handle edge cases</p>
                  <p className="text-lg mt-2"><strong>Think aloud:</strong> Explain what you're doing</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Step 6: Test Thoroughly</h4>
                  <p className="text-lg"><strong>Test with:</strong></p>
                  <p className="text-lg">• Given example(s)</p>
                  <p className="text-lg">• Edge cases you identified</p>
                  <p className="text-lg">• A custom example</p>
                  <p className="text-lg mt-2"><strong>Trace through code:</strong> Simulate execution step by step</p>
                  <p className="text-lg"><strong>Fix bugs:</strong> Debug systematically, not randomly</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Step 7: Optimize & Discuss</h4>
                  <p className="text-lg"><strong>Can it be optimized?</strong></p>
                  <p className="text-lg">• Better time complexity?</p>
                  <p className="text-lg">• Less space usage?</p>
                  <p className="text-lg">• Simpler implementation?</p>
                  <p className="text-lg mt-2"><strong>Discuss trade-offs:</strong> Why this approach vs alternatives?</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">9.2 Pattern Recognition</h3>
              
              <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                <p className="text-lg font-semibold">Common Problem Signals:</p>
                <p className="text-lg">• <strong>"All pairs" or "all subsets":</strong> Consider brute force O(n²) or O(2^n)</p>
                <p className="text-lg">• <strong>"Sorted array":</strong> Binary search, two pointers</p>
                <p className="text-lg">• <strong>"Find top/least K":</strong> Heap</p>
                <p className="text-lg">• <strong>"Maximum/minimum path/sum":</strong> DP</p>
                <p className="text-lg">• <strong>"Count ways to do X":</strong> DP or combinatorics</p>
                <p className="text-lg">• <strong>"Shortest path":</strong> BFS (unweighted), Dijkstra (weighted)</p>
                <p className="text-lg">• <strong>"Connected components":</strong> DFS/BFS, Union-Find</p>
                <p className="text-lg">• <strong>"Optimization with choice":</strong> Greedy or DP</p>
                <p className="text-lg">• <strong>"Prefix/suffix":</strong> Prefix sums, DP</p>
                <p className="text-lg">• <strong>"Palindrome/subsequence":</strong> DP</p>
                <p className="text-lg">• <strong>"Sliding window":</strong> Maintain window invariant</p>
                <p className="text-lg">• <strong>"Graph with cycles":</strong> Topological sort (if DAG), DFS for detection</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">9.3 Optimization Techniques</h3>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Space-Time Tradeoff</h4>
                  <p className="text-lg">Use extra memory to achieve faster computation.</p>
                  <p className="text-lg mt-2"><strong>Examples:</strong></p>
                  <p className="text-lg">• Hash table for O(1) lookups vs O(n) scanning</p>
                  <p className="text-lg">• Memoization: Store computed results</p>
                  <p className="text-lg">• Prefix sums: O(1) range queries after O(n) preprocessing</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Preprocessing</h4>
                  <p className="text-lg">Build auxiliary data structures for faster queries.</p>
                  <p className="text-lg mt-2"><strong>Examples:</strong></p>
                  <p className="text-lg">• Sort array for binary search</p>
                  <p className="text-lg">• Build segment tree for range queries</p>
                  <p className="text-lg">• Compute prefix sums/products</p>
                  <p className="text-lg">• Build adjacency list from edge list</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Early Termination</h4>
                  <p className="text-lg">Stop processing once answer found or impossible.</p>
                  <p className="text-lg mt-2"><strong>Examples:</strong></p>
                  <p className="text-lg">• Linear search: return when found</p>
                  <p className="text-lg">• Palindrome check: return false at first mismatch</p>
                  <p className="text-lg">• Sorting check: stop at first out-of-order element</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Pruning</h4>
                  <p className="text-lg">Skip branches that cannot lead to better solutions.</p>
                  <p className="text-lg mt-2"><strong>Examples:</strong></p>
                  <p className="text-lg">• Backtracking: prune branches violating constraints</p>
                  <p className="text-lg">• Branch and bound: skip subproblems worse than current best</p>
                  <p className="text-lg">• Alpha-beta pruning in game trees</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Transform the Problem</h4>
                  <p className="text-lg">Reframe problem to make solution obvious.</p>
                  <p className="text-lg mt-2"><strong>Examples:</strong></p>
                  <p className="text-lg">• Complement: Find pairs with sum K → find complement (K - current)</p>
                  <p className="text-lg">• Reverse: Reverse string → two pointers from ends</p>
                  <p className="text-lg">• Sort first: Many problems easier with sorted data</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">9.4 Debugging Strategies</h3>

              <div className="space-y-3">
                <p className="text-lg"><strong>Read error messages:</strong> Understand what failed</p>
                <p className="text-lg"><strong>Print statements:</strong> Check variable values at key points</p>
                <p className="text-lg"><strong>Trace execution:</strong> Step through code with example input</p>
                <p className="text-lg"><strong>Check boundaries:</strong> Off-by-one errors in loops</p>
                <p className="text-lg"><strong>Test incrementally:</strong> Test each function separately</p>
                <p className="text-lg"><strong>Simplify:</strong> Test with smallest possible input</p>
                <p className="text-lg"><strong>Rubber duck debugging:</strong> Explain code line-by-line</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 10: Interview Tips - Expanded */}
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">10. Technical Interview Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">10.1 Communication is Key</h3>
              
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Think out loud:</strong> Interviewers want to see your thought process</p>
                <p className="text-lg"><strong>Ask questions:</strong> Clarify ambiguities before diving in</p>
                <p className="text-lg"><strong>Explain your approach:</strong> Before coding, describe your solution</p>
                <p className="text-lg"><strong>State assumptions:</strong> Make constraints explicit</p>
                <p className="text-lg"><strong>Discuss trade-offs:</strong> Why this approach over alternatives?</p>
                <p className="text-lg"><strong>Listen to hints:</strong> Interviewer may guide you if stuck</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">10.2 Before You Code</h3>

              <div className="space-y-3">
                <p className="text-lg">1. <strong>Restate the problem</strong> in your own words</p>
                <p className="text-lg">2. <strong>Work through an example</strong> to understand the problem</p>
                <p className="text-lg">3. <strong>Identify edge cases</strong> that need special handling</p>
                <p className="text-lg">4. <strong>Propose solution(s)</strong> with time/space complexity</p>
                <p className="text-lg">5. <strong>Get approval</strong> before implementing</p>
                <p className="text-lg">6. <strong>Plan data structures</strong> and high-level structure</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">10.3 While Coding</h3>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Write Clean Code</h4>
                  <p className="text-lg">• <strong>Meaningful names:</strong> not x, y, but targetSum, currentIndex</p>
                  <p className="text-lg">• <strong>Consistent style:</strong> Indentation, naming conventions</p>
                  <p className="text-lg">• <strong>Modular:</strong> Break into helper functions</p>
                  <p className="text-lg">• <strong>Comments:</strong> Explain non-obvious logic</p>
                  <p className="text-lg">• <strong>Error handling:</strong> Check for null, invalid input</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Start Simple</h4>
                  <p className="text-lg">• Write brute force first if optimal is unclear</p>
                  <p className="text-lg">• Get something working, then optimize</p>
                  <p className="text-lg">• Leave TODO comments for optimizations</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Narrate Your Actions</h4>
                  <p className="text-lg">• "I'm creating a hash map to store..."</p>
                  <p className="text-lg">• "This loop iterates through..."</p>
                  <p className="text-lg">• "I'm checking this condition because..."</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">10.4 After Coding</h3>

              <div className="space-y-3">
                <p className="text-lg"><strong>1. Trace through your code</strong> with given example</p>
                <p className="text-lg"><strong>2. Test edge cases:</strong></p>
                <p className="text-lg">   • Empty input, single element</p>
                <p className="text-lg">   • Maximum constraints</p>
                <p className="text-lg">   • Duplicates, negatives, zeros</p>
                <p className="text-lg"><strong>3. State complexity</strong> clearly</p>
                <p className="text-lg"><strong>4. Fix bugs</strong> calmly and systematically</p>
                <p className="text-lg"><strong>5. Discuss optimizations</strong> if time permits</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">10.5 Common Mistakes to Avoid</h3>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                <p className="text-lg">❌ <strong>Jumping into code immediately</strong> without thinking</p>
                <p className="text-lg">❌ <strong>Staying silent</strong> - interviewer can't help if you don't communicate</p>
                <p className="text-lg">❌ <strong>Ignoring hints</strong> from interviewer</p>
                <p className="text-lg">❌ <strong>Not considering edge cases</strong> until asked</p>
                <p className="text-lg">❌ <strong>Off-by-one errors</strong> in array bounds</p>
                <p className="text-lg">❌ <strong>Forgetting to return</strong> a value</p>
                <p className="text-lg">❌ <strong>Not testing</strong> before saying "done"</p>
                <p className="text-lg">❌ <strong>Giving up</strong> instead of asking for hints</p>
                <p className="text-lg">❌ <strong>Arguing</strong> when interviewer suggests improvements</p>
                <p className="text-lg">❌ <strong>Poor variable names</strong> (i, j, k everywhere)</p>
                <p className="text-lg">❌ <strong>Not handling null/empty</strong> inputs</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">10.6 What Interviewers Look For</h3>

              <div className="space-y-3">
                <p className="text-lg"><strong>Problem-solving ability:</strong> Can you break down complex problems?</p>
                <p className="text-lg"><strong>Coding skills:</strong> Clean, bug-free, readable code?</p>
                <p className="text-lg"><strong>Communication:</strong> Can you explain your thinking?</p>
                <p className="text-lg"><strong>Collaboration:</strong> Do you incorporate feedback?</p>
                <p className="text-lg"><strong>Analytical thinking:</strong> Do you analyze complexity?</p>
                <p className="text-lg"><strong>Creativity:</strong> Multiple approaches? Optimizations?</p>
                <p className="text-lg"><strong>Attention to detail:</strong> Edge cases, error handling?</p>
                <p className="text-lg"><strong>Composure under pressure:</strong> Stay calm when stuck?</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">10.7 Preparation Tips</h3>

              <div className="border rounded-lg p-4">
                <p className="text-lg"><strong>Practice regularly:</strong> Solve problems daily on LeetCode, HackerRank</p>
                <p className="text-lg mt-2"><strong>Focus on fundamentals:</strong> Master core data structures and algorithms</p>
                <p className="text-lg mt-2"><strong>Time yourself:</strong> Practice under time pressure</p>
                <p className="text-lg mt-2"><strong>Mock interviews:</strong> Practice with peers or platforms</p>
                <p className="text-lg mt-2"><strong>Review solutions:</strong> Learn from others' approaches</p>
                <p className="text-lg mt-2"><strong>Study patterns:</strong> Recognize common problem types</p>
                <p className="text-lg mt-2"><strong>Code by hand:</strong> Practice without autocomplete/IDE</p>
                <p className="text-lg mt-2"><strong>Learn complexity analysis:</strong> Must state O(n) confidently</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">10.8 During the Interview</h3>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                <p className="text-lg">✓ <strong>Stay positive</strong> - attitude matters</p>
                <p className="text-lg">✓ <strong>Be honest</strong> - say if you've seen the problem before</p>
                <p className="text-lg">✓ <strong>Show enthusiasm</strong> - demonstrate genuine interest</p>
                <p className="text-lg">✓ <strong>Be receptive</strong> - consider interviewer's suggestions</p>
                <p className="text-lg">✓ <strong>Manage time</strong> - don't spend forever on brute force</p>
                <p className="text-lg">✓ <strong>Ask about company</strong> - interviews are two-way</p>
                <p className="text-lg">✓ <strong>Follow up</strong> - send thank you email</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 11: Advanced Problem-Solving Patterns */}
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">11. Advanced Problem-Solving Patterns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">11.1 Sliding Window Pattern</h3>
              <p className="text-lg mb-3">
                Maintain a window of fixed or variable size and slide it across data structure. Reduces O(n²) to O(n) for many problems.
              </p>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Fixed-Size Window</h4>
                  <p className="text-lg">Window size remains constant throughout.</p>
                  <p className="text-lg mt-2"><strong>Problems:</strong></p>
                  <p className="text-lg">• Maximum sum subarray of size k</p>
                  <p className="text-lg">• Average of all contiguous subarrays of size k</p>
                  <p className="text-lg">• First negative in every window of size k</p>
                  
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg font-semibold">Pattern:</p>
                    <p className="text-lg">1. Calculate sum/value for first window</p>
                    <p className="text-lg">2. Slide: subtract left element, add right element</p>
                    <p className="text-lg">3. Update result at each step</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Variable-Size Window</h4>
                  <p className="text-lg">Window expands and contracts based on condition.</p>
                  <p className="text-lg mt-2"><strong>Problems:</strong></p>
                  <p className="text-lg">• Longest substring without repeating characters</p>
                  <p className="text-lg">• Longest substring with at most k distinct characters</p>
                  <p className="text-lg">• Minimum window substring containing all characters</p>
                  <p className="text-lg">• Fruit into baskets</p>
                  
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg font-semibold">Pattern:</p>
                    <p className="text-lg">1. Expand right: add elements until condition violated</p>
                    <p className="text-lg">2. Contract left: remove elements until condition satisfied</p>
                    <p className="text-lg">3. Update result when valid window found</p>
                  </div>
                </div>
              </div>

              <p className="text-lg mt-3"><strong>Template Code Structure:</strong></p>
              <p className="text-lg">left = 0, right = 0</p>
              <p className="text-lg">while right {'{<'} length:</p>
              <p className="text-lg">  add arr[right] to window</p>
              <p className="text-lg">  while window invalid:</p>
              <p className="text-lg">    remove arr[left] from window</p>
              <p className="text-lg">    left++</p>
              <p className="text-lg">  update result</p>
              <p className="text-lg">  right++</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">11.2 Two Pointers Pattern</h3>
              <p className="text-lg mb-3">
                Use two pointers to traverse data structure, often from different positions or directions.
              </p>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Opposite Direction (Converging)</h4>
                  <p className="text-lg">One pointer from start, one from end, move toward each other.</p>
                  <p className="text-lg mt-2"><strong>Problems:</strong></p>
                  <p className="text-lg">• Two sum in sorted array</p>
                  <p className="text-lg">• Three sum</p>
                  <p className="text-lg">• Container with most water</p>
                  <p className="text-lg">• Trapping rain water</p>
                  <p className="text-lg">• Palindrome verification</p>
                  <p className="text-lg">• Reverse string/array</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Same Direction (Fast & Slow)</h4>
                  <p className="text-lg">Both pointers move forward but at different speeds.</p>
                  <p className="text-lg mt-2"><strong>Problems:</strong></p>
                  <p className="text-lg">• Remove duplicates from sorted array</p>
                  <p className="text-lg">• Move zeros to end</p>
                  <p className="text-lg">• Linked list cycle detection (Floyd's algorithm)</p>
                  <p className="text-lg">• Find middle of linked list</p>
                  <p className="text-lg">• Partition problems</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Multiple Arrays</h4>
                  <p className="text-lg">Pointers in different arrays.</p>
                  <p className="text-lg mt-2"><strong>Problems:</strong></p>
                  <p className="text-lg">• Merge two sorted arrays</p>
                  <p className="text-lg">• Intersection of two arrays</p>
                  <p className="text-lg">• Median of two sorted arrays</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">11.3 Fast & Slow Pointers (Floyd's Cycle Detection)</h3>
              <p className="text-lg mb-3">
                Two pointers move at different speeds. If cycle exists, they eventually meet.
              </p>
              
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Algorithm:</strong></p>
                <p className="text-lg">1. slow = fast = head</p>
                <p className="text-lg">2. Move slow one step, fast two steps</p>
                <p className="text-lg">3. If they meet, cycle exists</p>
                <p className="text-lg">4. To find cycle start: reset one to head, move both one step until meet</p>
              </div>

              <p className="text-lg mt-3"><strong>Applications:</strong></p>
              <p className="text-lg">• Detect cycle in linked list</p>
              <p className="text-lg">• Find start of cycle</p>
              <p className="text-lg">• Find middle of linked list</p>
              <p className="text-lg">• Happy number problem</p>
              <p className="text-lg">• Find duplicate number in array</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">11.4 Merge Intervals Pattern</h3>
              <p className="text-lg mb-3">
                Deal with overlapping intervals. Sort intervals then process sequentially.
              </p>

              <div className="space-y-3">
                <p className="text-lg"><strong>Common Problems:</strong></p>
                <p className="text-lg">• Merge overlapping intervals</p>
                <p className="text-lg">• Insert interval</p>
                <p className="text-lg">• Interval intersection</p>
                <p className="text-lg">• Meeting rooms (can attend all meetings?)</p>
                <p className="text-lg">• Minimum meeting rooms required</p>
                <p className="text-lg">• Employee free time</p>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-3 mt-3">
                <p className="text-lg"><strong>General Approach:</strong></p>
                <p className="text-lg">1. Sort intervals by start time</p>
                <p className="text-lg">2. Initialize result with first interval</p>
                <p className="text-lg">3. For each interval:</p>
                <p className="text-lg">   If overlaps with last in result: merge</p>
                <p className="text-lg">   Else: add as new interval</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">11.5 Cyclic Sort Pattern</h3>
              <p className="text-lg mb-3">
                For arrays containing numbers in given range 1 to n. Place each number at its correct index.
              </p>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Algorithm:</strong></p>
                <p className="text-lg">1. Iterate through array</p>
                <p className="text-lg">2. For each element at index i:</p>
                <p className="text-lg">   While element not at correct position:</p>
                <p className="text-lg">     Swap with element at its target index</p>
              </div>

              <p className="text-lg mt-3"><strong>Problems:</strong></p>
              <p className="text-lg">• Find missing number (0 to n)</p>
              <p className="text-lg">• Find all missing numbers</p>
              <p className="text-lg">• Find duplicate number</p>
              <p className="text-lg">• Find all duplicates</p>
              <p className="text-lg">• Find corrupt pair (missing and duplicate)</p>
              <p className="text-lg">• First k missing positive numbers</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">11.6 Modified Binary Search</h3>
              <p className="text-lg mb-3">
                Apply binary search concept to problems not obviously about searching.
              </p>

              <div className="space-y-3">
                <p className="text-lg"><strong>When to Use:</strong></p>
                <p className="text-lg">• Sorted or rotated sorted array</p>
                <p className="text-lg">• Search space can be divided in half</p>
                <p className="text-lg">• Can determine which half to search</p>
                <p className="text-lg">• Looking for minimum/maximum that satisfies condition</p>
              </div>

              <p className="text-lg mt-3"><strong>Problems:</strong></p>
              <p className="text-lg">• Search in rotated sorted array</p>
              <p className="text-lg">• Find minimum in rotated sorted array</p>
              <p className="text-lg">• Search in 2D matrix</p>
              <p className="text-lg">• Find peak element</p>
              <p className="text-lg">• Square root (binary search on answer)</p>
              <p className="text-lg">• Koko eating bananas</p>
              <p className="text-lg">• Capacity to ship packages within D days</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">11.7 Top K Elements Pattern</h3>
              <p className="text-lg mb-3">
                Find top/bottom K elements from collection. Use Heap (Priority Queue).
              </p>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Approach:</strong></p>
                <p className="text-lg">• For K largest: Use min-heap of size K</p>
                <p className="text-lg">• For K smallest: Use max-heap of size K</p>
                <p className="text-lg">• Time: O(n log k)</p>
                <p className="text-lg">• Space: O(k)</p>
              </div>

              <p className="text-lg mt-3"><strong>Problems:</strong></p>
              <p className="text-lg">• Kth largest/smallest element</p>
              <p className="text-lg">• K closest points to origin</p>
              <p className="text-lg">• Top K frequent elements</p>
              <p className="text-lg">• Sort characters by frequency</p>
              <p className="text-lg">• K closest numbers in sorted array</p>
              <p className="text-lg">• Reorganize string (no adjacent duplicates)</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">11.8 K-Way Merge Pattern</h3>
              <p className="text-lg mb-3">
                Merge K sorted arrays/lists. Use min-heap to track smallest elements from each array.
              </p>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Algorithm:</strong></p>
                <p className="text-lg">1. Insert first element of each array into min-heap</p>
                <p className="text-lg">2. While heap not empty:</p>
                <p className="text-lg">   Extract min element, add to result</p>
                <p className="text-lg">   Insert next element from same array into heap</p>
                <p className="text-lg">Time: O(N log K) where N = total elements, K = number of arrays</p>
              </div>

              <p className="text-lg mt-3"><strong>Problems:</strong></p>
              <p className="text-lg">• Merge K sorted lists</p>
              <p className="text-lg">• Kth smallest element in M sorted arrays</p>
              <p className="text-lg">• Find smallest range covering elements from K lists</p>
              <p className="text-lg">• Merge K sorted streams</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">11.9 Topological Sort Pattern</h3>
              <p className="text-lg mb-3">
                Linear ordering of vertices in DAG. For every directed edge u {'=>'} v, u comes before v.
              </p>

              <div className="space-y-3">
                <p className="text-lg"><strong>Applications:</strong></p>
                <p className="text-lg">• Task scheduling with dependencies</p>
                <p className="text-lg">• Course schedule problems</p>
                <p className="text-lg">• Build order determination</p>
                <p className="text-lg">• Compilation order</p>
                <p className="text-lg">• Finding sequence given pairwise orderings</p>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-3 mt-3">
                <p className="text-lg"><strong>Kahn's Algorithm (BFS-based):</strong></p>
                <p className="text-lg">1. Calculate in-degree for all vertices</p>
                <p className="text-lg">2. Add vertices with in-degree 0 to queue</p>
                <p className="text-lg">3. While queue not empty:</p>
                <p className="text-lg">   Dequeue vertex, add to result</p>
                <p className="text-lg">   Decrease in-degree of neighbors</p>
                <p className="text-lg">   If neighbor in-degree becomes 0, enqueue</p>
                <p className="text-lg">4. If result size {'{<'} vertices, cycle exists</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">11.10 Monotonic Stack/Queue</h3>
              <p className="text-lg mb-3">
                Stack/Queue maintaining elements in monotonically increasing or decreasing order.
              </p>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Monotonic Stack</h4>
                  <p className="text-lg">Used for finding next/previous greater/smaller element.</p>
                  <p className="text-lg mt-2"><strong>Problems:</strong></p>
                  <p className="text-lg">• Next greater element</p>
                  <p className="text-lg">• Previous smaller element</p>
                  <p className="text-lg">• Largest rectangle in histogram</p>
                  <p className="text-lg">• Trapping rain water</p>
                  <p className="text-lg">• Daily temperatures</p>
                  <p className="text-lg">• Stock span problem</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Monotonic Queue</h4>
                  <p className="text-lg">Used for sliding window maximum/minimum problems.</p>
                  <p className="text-lg mt-2"><strong>Problems:</strong></p>
                  <p className="text-lg">• Sliding window maximum</p>
                  <p className="text-lg">• Shortest subarray with sum at least K</p>
                  <p className="text-lg">• Jump game problems</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">11.11 Prefix Sum Pattern</h3>
              <p className="text-lg mb-3">
                Precompute cumulative sums to answer range queries in O(1) time.
              </p>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Build Prefix Sum Array:</strong></p>
                <p className="text-lg">prefix[0] = arr[0]</p>
                <p className="text-lg">prefix[i] = prefix[i-1] + arr[i]</p>
                <p className="text-lg"><strong>Range Sum Query [L, R]:</strong></p>
                <p className="text-lg">sum = prefix[R] - prefix[L-1]</p>
              </div>

              <p className="text-lg mt-3"><strong>Problems:</strong></p>
              <p className="text-lg">• Range sum query immutable</p>
              <p className="text-lg">• Subarray sum equals K</p>
              <p className="text-lg">• Continuous subarray sum</p>
              <p className="text-lg">• Product of array except self</p>
              <p className="text-lg">• 2D matrix prefix sum</p>
              <p className="text-lg">• Find pivot index</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">11.12 Union-Find (Disjoint Set) Pattern</h3>
              <p className="text-lg mb-3">
                Track elements partitioned into non-overlapping sets. Supports union and find operations.
              </p>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Operations:</strong></p>
                <p className="text-lg">• Find: Determine which set element belongs to - O(α(n))</p>
                <p className="text-lg">• Union: Merge two sets - O(α(n))</p>
                <p className="text-lg">α(n) is inverse Ackermann function (practically constant)</p>
                <p className="text-lg"><strong>Optimizations:</strong></p>
                <p className="text-lg">• Path compression: Make tree flatter during find</p>
                <p className="text-lg">• Union by rank: Attach smaller tree to larger</p>
              </div>

              <p className="text-lg mt-3"><strong>Problems:</strong></p>
              <p className="text-lg">• Number of connected components</p>
              <p className="text-lg">• Redundant connection (detect cycle)</p>
              <p className="text-lg">• Accounts merge</p>
              <p className="text-lg">• Friend circles</p>
              <p className="text-lg">• Number of provinces</p>
              <p className="text-lg">• Satisfiability of equality equations</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">11.13 Bit Manipulation Patterns</h3>
              <p className="text-lg mb-3">
                Leverage bitwise operations for efficient solutions.
              </p>

              <div className="space-y-3">
                <p className="text-lg"><strong>Common Techniques:</strong></p>
                <p className="text-lg">• Check if power of 2: (n & (n-1)) == 0</p>
                <p className="text-lg">• Count set bits: Brian Kernighan's algorithm</p>
                <p className="text-lg">• Find single number: XOR all elements</p>
                <p className="text-lg">• Get/Set/Clear bit at position</p>
                <p className="text-lg">• Toggle all bits: ~n</p>
                <p className="text-lg">• Isolate rightmost 1-bit: n & -n</p>
                <p className="text-lg">• Turn off rightmost 1-bit: n & (n-1)</p>
              </div>

              <p className="text-lg mt-3"><strong>Problems:</strong></p>
              <p className="text-lg">• Single number (appears once, others twice)</p>
              <p className="text-lg">• Single number II (appears once, others thrice)</p>
              <p className="text-lg">• Missing number</p>
              <p className="text-lg">• Reverse bits</p>
              <p className="text-lg">• Hamming distance</p>
              <p className="text-lg">• Power set generation</p>
              <p className="text-lg">• Count bits in range</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 12: Mathematical Algorithms */}
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">12. Mathematical & Number Theory Algorithms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">12.1 Prime Numbers</h3>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Primality Testing</h4>
                  <p className="text-lg"><strong>Trial Division:</strong> Check divisibility up to √n - O(√n)</p>
                  <p className="text-lg mt-2"><strong>Optimized:</strong> Check 2, then odd numbers from 3 to √n</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Sieve of Eratosthenes</h4>
                  <p className="text-lg">Find all primes up to n efficiently.</p>
                  <div className="bg-secondary/30 p-3 rounded mt-2">
                    <p className="text-lg font-semibold">Algorithm:</p>
                    <p className="text-lg">1. Create boolean array of size n+1, mark all true</p>
                    <p className="text-lg">2. Mark 0 and 1 as false</p>
                    <p className="text-lg">3. For i from 2 to √n:</p>
                    <p className="text-lg">   If i is prime, mark all multiples as false</p>
                    <p className="text-lg">Time: O(n log log n) | Space: O(n)</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">12.2 GCD and LCM</h3>
              
              <div className="border rounded-lg p-4">
                <h4 className="text-2xl font-bold mb-3">Euclidean Algorithm (GCD)</h4>
                <p className="text-lg">Greatest Common Divisor of two numbers.</p>
                <div className="bg-secondary/30 p-3 rounded mt-2">
                  <p className="text-lg">gcd(a, b) = gcd(b, a % b)</p>
                  <p className="text-lg">Base case: gcd(a, 0) = a</p>
                  <p className="text-lg">Time: O(log min(a,b))</p>
                </div>
                <p className="text-lg mt-2"><strong>LCM Formula:</strong> lcm(a, b) = (a × b) / gcd(a, b)</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">12.3 Modular Arithmetic</h3>
              
              <div className="space-y-3">
                <p className="text-lg"><strong>Properties:</strong></p>
                <p className="text-lg">• (a + b) % m = ((a % m) + (b % m)) % m</p>
                <p className="text-lg">• (a × b) % m = ((a % m) × (b % m)) % m</p>
                <p className="text-lg">• (a - b) % m = ((a % m) - (b % m) + m) % m</p>
              </div>

              <div className="border rounded-lg p-4 mt-3">
                <h4 className="text-2xl font-bold mb-3">Modular Exponentiation</h4>
                <p className="text-lg">Compute (base^exp) % mod efficiently.</p>
                <p className="text-lg">Time: O(log exp) using binary exponentiation</p>
              </div>

              <div className="border rounded-lg p-4 mt-3">
                <h4 className="text-2xl font-bold mb-3">Modular Inverse</h4>
                <p className="text-lg">Find x such that (a × x) % m = 1</p>
                <p className="text-lg">Methods: Extended Euclidean Algorithm, Fermat's Little Theorem</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">12.4 Combinatorics</h3>
              
              <div className="space-y-3">
                <p className="text-lg"><strong>Factorial:</strong> n! = n × (n-1) × ... × 1</p>
                <p className="text-lg"><strong>Permutations:</strong> P(n,r) = n! / (n-r)!</p>
                <p className="text-lg"><strong>Combinations:</strong> C(n,r) = n! / (r! × (n-r)!)</p>
                <p className="text-lg"><strong>Pascal's Triangle:</strong> C(n,r) = C(n-1,r-1) + C(n-1,r)</p>
              </div>

              <div className="border rounded-lg p-4 mt-3">
                <h4 className="text-2xl font-bold mb-3">Catalan Numbers</h4>
                <p className="text-lg">C(n) = C(0)×C(n-1) + C(1)×C(n-2) + ... + C(n-1)×C(0)</p>
                <p className="text-lg">Formula: C(n) = (2n)! / ((n+1)! × n!)</p>
                <p className="text-lg mt-2"><strong>Applications:</strong></p>
                <p className="text-lg">• Number of valid parentheses combinations</p>
                <p className="text-lg">• Number of binary search trees with n nodes</p>
                <p className="text-lg">• Number of paths in grid (not crossing diagonal)</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">12.5 Matrix Operations</h3>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Matrix Multiplication</h4>
                  <p className="text-lg">Multiply matrices A (m×n) and B (n×p) to get C (m×p)</p>
                  <p className="text-lg">Time: O(m × n × p)</p>
                  <p className="text-lg">Strassen's Algorithm: O(n^2.81)</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Matrix Exponentiation</h4>
                  <p className="text-lg">Compute A^n efficiently using binary exponentiation.</p>
                  <p className="text-lg">Time: O(k³ log n) for k×k matrix</p>
                  <p className="text-lg">Application: Compute nth Fibonacci in O(log n)</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">12.6 Number Theory Problems</h3>
              
              <div className="space-y-3">
                <p className="text-lg"><strong>Happy Number:</strong> Sum of squares of digits eventually becomes 1</p>
                <p className="text-lg"><strong>Ugly Number:</strong> Prime factors are only 2, 3, 5</p>
                <p className="text-lg"><strong>Perfect Number:</strong> Sum of proper divisors equals number</p>
                <p className="text-lg"><strong>Armstrong Number:</strong> Sum of cubes of digits equals number</p>
                <p className="text-lg"><strong>Palindrome Number:</strong> Reads same forwards and backwards</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 13: System Design & Practical Considerations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">13. Practical Considerations & System Design</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4">13.1 Choosing the Right Data Structure</h3>
              
              <div className="bg-secondary/50 p-4 rounded-lg space-y-3">
                <p className="text-lg"><strong>Decision Framework:</strong></p>
                <p className="text-lg">1. <strong>Access Pattern:</strong> Random access? Sequential? Both?</p>
                <p className="text-lg">2. <strong>Modification Frequency:</strong> Read-heavy? Write-heavy?</p>
                <p className="text-lg">3. <strong>Size:</strong> Fixed? Growing? Bounded?</p>
                <p className="text-lg">4. <strong>Order:</strong> Sorted? FIFO? LIFO? Priority-based?</p>
                <p className="text-lg">5. <strong>Constraints:</strong> Memory limits? Time constraints?</p>
              </div>

              <div className="space-y-3 mt-4">
                <p className="text-lg"><strong>Quick Reference:</strong></p>
                <p className="text-lg">• Fast random access needed → Array</p>
                <p className="text-lg">• Frequent insertions/deletions → Linked List</p>
                <p className="text-lg">• Fast lookup by key → Hash Table</p>
                <p className="text-lg">• Sorted order with fast operations → Balanced BST</p>
                <p className="text-lg">• Priority-based processing → Heap</p>
                <p className="text-lg">• Range queries → Segment Tree</p>
                <p className="text-lg">• Find/Union operations → Union-Find</p>
                <p className="text-lg">• String prefix matching → Trie</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">13.2 Trade-offs</h3>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Time vs Space</h4>
                  <p className="text-lg">Often can trade memory for faster execution.</p>
                  <p className="text-lg mt-2">Examples:</p>
                  <p className="text-lg">• Memoization: Store computed results (more space, less time)</p>
                  <p className="text-lg">• Caching: Keep frequently accessed data in memory</p>
                  <p className="text-lg">• Hash tables: O(1) lookup with O(n) space</p>
                  <p className="text-lg">• Prefix sums: O(1) range queries with O(n) preprocessing</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Complexity vs Simplicity</h4>
                  <p className="text-lg">More complex algorithms may be harder to implement and maintain.</p>
                  <p className="text-lg mt-2">Consider:</p>
                  <p className="text-lg">• Is the optimization worth the complexity?</p>
                  <p className="text-lg">• Will simpler solution suffice for given constraints?</p>
                  <p className="text-lg">• Code maintainability and readability</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Theoretical vs Practical Performance</h4>
                  <p className="text-lg">Big O hides constants and lower-order terms.</p>
                  <p className="text-lg mt-2">Practical considerations:</p>
                  <p className="text-lg">• Cache performance (locality of reference)</p>
                  <p className="text-lg">• Branch prediction</p>
                  <p className="text-lg">• Memory allocation overhead</p>
                  <p className="text-lg">• Quick sort often faster than heap sort despite same complexity</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">13.3 Scalability Considerations</h3>
              
              <div className="space-y-3">
                <p className="text-lg"><strong>Small Input:</strong> Even O(n²) may be acceptable</p>
                <p className="text-lg"><strong>Medium Input (n {'{<'} 10^6):</strong> O(n log n) usually required</p>
                <p className="text-lg"><strong>Large Input (n {'>'} 10^6):</strong> O(n) or better needed</p>
                <p className="text-lg"><strong>Very Large (n {'>'} 10^9):</strong> O(log n) or O(1)</p>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg space-y-3 mt-3">
                <p className="text-lg"><strong>Distributed Systems:</strong></p>
                <p className="text-lg">• Data partitioning (sharding)</p>
                <p className="text-lg">• Parallel processing</p>
                <p className="text-lg">• MapReduce paradigm</p>
                <p className="text-lg">• Consistent hashing</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">13.4 Memory Management</h3>
              
              <div className="space-y-3">
                <p className="text-lg"><strong>Stack vs Heap:</strong></p>
                <p className="text-lg">• Stack: Fast, automatic, limited size</p>
                <p className="text-lg">• Heap: Slower, manual management, flexible size</p>
              </div>

              <div className="space-y-3 mt-3">
                <p className="text-lg"><strong>Memory Leaks:</strong></p>
                <p className="text-lg">• Unreachable allocated memory</p>
                <p className="text-lg">• Circular references</p>
                <p className="text-lg">• Not freeing resources</p>
              </div>

              <div className="space-y-3 mt-3">
                <p className="text-lg"><strong>Optimization Techniques:</strong></p>
                <p className="text-lg">• Object pooling</p>
                <p className="text-lg">• Lazy initialization</p>
                <p className="text-lg">• Memory-efficient data structures</p>
                <p className="text-lg">• Compression for large datasets</p>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-4">13.5 Real-World Applications</h3>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Web Browsers</h4>
                  <p className="text-lg">• DOM tree (Tree structure)</p>
                  <p className="text-lg">• Browser history (Stack for back/forward)</p>
                  <p className="text-lg">• Cache (Hash table, LRU)</p>
                  <p className="text-lg">• URL completion (Trie)</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Operating Systems</h4>
                  <p className="text-lg">• Process scheduling (Queue, Priority Queue)</p>
                  <p className="text-lg">• File system (Tree, Graph)</p>
                  <p className="text-lg">• Memory management (Heap, Paging)</p>
                  <p className="text-lg">• Deadlock detection (Graph cycles)</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Databases</h4>
                  <p className="text-lg">• Indexing (B-trees, Hash indexes)</p>
                  <p className="text-lg">• Query optimization (Graph, Dynamic Programming)</p>
                  <p className="text-lg">• Transaction processing (Graph for dependencies)</p>
                  <p className="text-lg">• Caching (LRU using Hash + Doubly Linked List)</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Social Networks</h4>
                  <p className="text-lg">• Friend recommendations (Graph algorithms)</p>
                  <p className="text-lg">• News feed ranking (Priority Queue, Heap)</p>
                  <p className="text-lg">• Shortest path between users (BFS, Dijkstra)</p>
                  <p className="text-lg">• Community detection (Graph clustering)</p>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="text-2xl font-bold mb-3">Search Engines</h4>
                  <p className="text-lg">• Web crawling (Graph traversal)</p>
                  <p className="text-lg">• PageRank (Graph algorithm)</p>
                  <p className="text-lg">• Autocomplete (Trie)</p>
                  <p className="text-lg">• Spell checking (Edit distance, Trie)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conclusion */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">
              <strong>Master fundamentals:</strong> Arrays, Linked Lists, Trees, Graphs form the foundation
            </p>
            <p className="text-lg">
              <strong>Understand complexities:</strong> Know time and space trade-offs for each algorithm
            </p>
            <p className="text-lg">
              <strong>Practice regularly:</strong> Implement algorithms and solve diverse problems
            </p>
            <p className="text-lg">
              <strong>Choose right tool:</strong> Select algorithm/data structure matching problem requirements
            </p>
            <p className="text-lg">
              <strong>Optimize iteratively:</strong> Start simple, then improve based on constraints
            </p>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
};
