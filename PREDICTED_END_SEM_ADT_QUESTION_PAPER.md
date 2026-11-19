# 🔥 PREDICTED END SEMESTER EXAMINATION - OME354 ADT 🔥
## **WARNING: This is designed to make you sweat!**

---

### **SATHYABAMA INSTITUTE OF SCIENCE AND TECHNOLOGY**
**Department of Computer Science and Engineering**

**Course Code:** OME354  
**Course Name:** ABSTRACT DATA TYPES  
**Time:** 3 Hours  
**Maximum Marks:** 100  

---

## **PART A - 10 × 2 = 20 MARKS**
### (Answer ALL Questions - Short Answer)

1. **Define ADT with a real-world example that is NOT a bank account or library system.**

2. **What is the time complexity of accessing the middle element in a doubly linked list? Justify your answer with reasoning about pointer traversal.**

3. **Differentiate between a complete binary tree and a full binary tree with diagrams.**

4. **Write the recursive formula for computing the height of an AVL tree with n nodes.**

5. **What is a sentinel node in a linked list? Why would you use it instead of checking for NULL?**

6. **State the relationship between preorder and postorder traversal of a binary tree. Can you reconstruct a unique tree from just these two? Why or why not?**

7. **In a circular queue implemented using an array of size n, what is the condition to check if the queue is full? Explain why (rear + 1) % n == front works.**

8. **What is the worst-case time complexity of searching in a Binary Search Tree? When does this occur?**

9. **Define the term "balancing factor" in an AVL tree. What values indicate that rebalancing is required?**

10. **What is the difference between a shallow copy and a deep copy in the context of linked data structures?**

---

## **PART B - 5 × 16 = 80 MARKS**
### (Answer ANY FIVE Questions)

---

### **Question 11 (16 Marks)**

**(a)** Implement a **polynomial ADT** using a singly linked list where each node contains coefficient and exponent. Write complete C code for:
   - Adding two polynomials
   - Multiplying two polynomials
   - Displaying a polynomial in standard mathematical notation

**(b)** Analyze the time complexity of your addition and multiplication operations. What happens when the polynomials have significantly different degrees?

**[8 + 8 Marks]**

---

### **Question 12 (16 Marks)**

You are building a **browser history system** that supports:
- Navigate to a new URL
- Go back (previous page)
- Go forward (next page)
- View current page
- Search if a URL was visited before

**(a)** Design the ADT specification including all operations and their preconditions/postconditions.

**(b)** Implement this using a doubly linked list with appropriate C code. Include edge case handling.

**(c)** What is the space and time complexity of your implementation?

**[4 + 10 + 2 Marks]**

---

### **Question 13 (16 Marks)**

**(a)** **Critical Thinking Challenge:** You have a binary search tree (BST) and you need to find the **kth smallest element** without using any extra space (no arrays, no recursion stack beyond O(h)).

Write an iterative algorithm using **Morris Traversal** or explain an alternative O(h) space approach with complete code.

**(b)** Given the following sequence of insertions into an initially empty AVL tree:
   ```
   50, 25, 75, 10, 30, 60, 80, 5, 15, 27, 55
   ```
   Draw the AVL tree after EACH rotation, clearly showing:
   - Which nodes became unbalanced
   - Which rotation (LL, LR, RL, RR) was applied
   - The final balanced tree

**[10 + 6 Marks]**

---

### **Question 14 (16 Marks)**

**(a)** Implement a **Double-Ended Queue (Deque)** using a **circular doubly linked list**. Your implementation must support:
   - insertFront()
   - insertRear()
   - deleteFront()
   - deleteRear()
   - Display from both ends

Write complete C code with all edge cases handled.

**(b)** **Application Problem:** Use your Deque to solve the **"Sliding Window Maximum"** problem:
   
   Given an array `[1, 3, -1, -3, 5, 3, 6, 7]` and window size k=3, find the maximum element in each sliding window.
   
   Expected output: `[3, 3, 5, 5, 6, 7]`

**[10 + 6 Marks]**

---

### **Question 15 (16 Marks) - THE NIGHTMARE QUESTION** 💀

You are designing a **Multi-Level Undo-Redo System** for a text editor that supports:
1. Regular text operations (insert, delete)
2. **Macro recording**: Record a sequence of operations and replay them
3. **Branching undo**: When you undo and then perform a new operation, the old "future" should be saved in a branch

**(a)** Design the ADT with ALL necessary data structures (hint: you'll need multiple stacks/lists and possibly a tree structure).

**(b)** Implement the following operations in C:
   - performOperation(op)
   - undo()
   - redo()
   - startMacro()
   - endMacro()
   - replayMacro()
   - switchBranch(branchID)

**(c)** Draw a diagram showing how your data structure looks after this sequence:
   ```
   Type "A" → Type "B" → Type "C" → Undo → Undo → Type "X" → Type "Y"
   ```
   Show both branches clearly.

**(d)** Analyze space and time complexity.

**[4 + 8 + 2 + 2 Marks]**

---

### **Question 16 (16 Marks)**

**(a)** Write a C program to implement a **Priority Queue** using a **Max Heap** that supports:
   - insert(element, priority)
   - extractMax()
   - changePriority(element, newPriority)
   - delete(element)

**(b)** **Real-world Application:** Use your priority queue to simulate a **hospital emergency room** where patients arrive with different severity levels (1-10). Write code to:
   - Add patients
   - Process the most critical patient
   - Handle the case when a patient's condition worsens (increase priority)
   
Show a sample run with at least 7 patients.

**[10 + 6 Marks]**

---

### **Question 17 (16 Marks) - ALGORITHM DESIGN**

**(a)** **The Merger Problem:** You have k sorted linked lists. Design and implement an efficient algorithm to merge all k lists into one sorted list.

Example:
```
List 1: 1 → 4 → 7
List 2: 2 → 5 → 8
List 3: 3 → 6 → 9
Result: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9
```

Write complete C code and analyze time and space complexity.

**(b)** **Bonus Challenge (4 marks):** Can you optimize this using a min-heap? Explain how and provide the modified complexity analysis.

**[12 + 4 Marks]**

---

### **Question 18 (16 Marks) - THEORETICAL DEPTH**

**(a)** **Prove** that in a binary search tree with n nodes, the average case time complexity for search is O(log n) assuming random insertions. Use mathematical induction or expected value analysis.

**(b)** Explain why AVL trees guarantee O(log n) height while regular BSTs don't. Include:
   - The mathematical relationship between height and balance factor
   - Proof sketch of height bound
   - Comparison with Red-Black trees

**(c)** **Critical Analysis:** When would you choose a BST over an AVL tree despite its worse worst-case complexity? Give at least 3 practical scenarios with justification.

**[6 + 6 + 4 Marks]**

---

## **LECTURER'S EVIL NOTES** 😈

### **What makes this paper BRUTAL:**

1. **No standard textbook questions** - Everything requires actual understanding
2. **Mixed theoretical and practical** - Can't just memorize code or just theory
3. **Application-based problems** - Must understand WHEN and WHY to use each ADT
4. **Time complexity analysis** - Nearly every question asks about complexity
5. **Edge cases** - Your code better handle NULL pointers and empty structures
6. **Question 15 is deliberately complex** - Tests if you can design from scratch
7. **No "write short notes" type easy marks** - Every mark is earned

### **How students typically react:**

- First 5 minutes: "This looks okay..."
- After 10 minutes: "Wait, where are the standard questions?"
- After 30 minutes: "I should have studied more..."
- After 1 hour: "Why did I choose CSE?"
- After 2 hours: "I'll do better in the arrear exam..."

### **Marking Scheme Surprises:**

✅ Partial credit given for correct approach even if code has minor bugs  
✅ Complexity analysis carries significant weight  
✅ Proper memory management (malloc/free) is checked  
❌ Wrong time complexity = heavy penalty  
❌ Memory leaks = marks deduction  
❌ Not handling edge cases = marks deduction  

### **Topics You CANNOT Skip:**

- Linked Lists (all variants including circular, doubly, circular doubly)
- Stacks & Queues (array and linked implementations)
- Trees (BST, AVL, traversals)
- Time complexity analysis
- ADT design principles
- Pointer manipulation
- Dynamic memory management

### **Pro Tips:**

1. Practice writing code on paper WITHOUT compiler
2. Memorize standard rotations for AVL trees
3. Know Big-O analysis inside out
4. Understand the THEORY behind each data structure
5. Practice application problems, not just implementation
6. Draw diagrams - they can save you when code fails

---

## **EXPECTED SCORE DISTRIBUTION:**

| Score Range | % of Students | Category |
|------------|--------------|----------|
| 90-100 | 2% | Genius / Cheated Well |
| 75-89 | 8% | Actually Studied |
| 60-74 | 20% | Did Okay |
| 50-59 | 30% | Borderline Pass |
| 40-49 | 25% | Arrear Candidates |
| <40 | 15% | Should Reconsider Career |

---

## **AFTER EXAM EXPECTED CONVERSATIONS:**

**Student 1:** "Did you do Question 15?"  
**Student 2:** "I wrote something... probably wrong."  
**Student 1:** "Same."

**Student 3:** "The AVL tree question had 11 insertions!"  
**Student 4:** "I drew 3 rotations and gave up."

**Student 5:** "Why was there a Morris Traversal question?!"  
**Student 6:** "Wait, what's Morris Traversal?"  
**Student 5:** "Exactly."

---

## **GOOD LUCK! YOU'LL NEED IT! 🔥**

*"The true test of understanding is not whether you can implement a linked list, but whether you can design a system using the right data structure at the right time."*

**- Your Friendly Neighborhood Professor Who Wants You To Actually Learn (And Suffer A Little)**

