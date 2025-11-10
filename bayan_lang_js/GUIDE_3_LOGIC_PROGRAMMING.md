# 📚 Bayan Programming Guide - Part 3: Logic Programming
# دليل البرمجة بلغة البيان - الجزء الثالث: البرمجة المنطقية

**Version**: 2.0  
**Author**: Basel Yahya Abdullah  
**Date**: 2025-11-04

---

## 📋 Table of Contents

1. [Introduction to Logic Programming](#introduction)
2. [Facts](#facts)
3. [Rules](#rules)
4. [Queries](#queries)
5. [Variables & Unification](#variables-unification)
6. [Backtracking](#backtracking)
7. [Negation as Failure](#negation)
8. [Cut Operator](#cut)
9. [Arithmetic Evaluation](#arithmetic)
10. [List Pattern Matching](#lists)
11. [Advanced Features](#advanced)
12. [Complete Examples](#examples)

---

<a name="introduction"></a>
## 1. Introduction to Logic Programming

### What is Logic Programming?

Logic programming is a programming paradigm based on **formal logic**. Instead of telling the computer **how** to solve a problem (procedural), you tell it **what** the problem is (declarative).

**Key Concepts:**
- **Facts** - Things that are true
- **Rules** - Relationships between facts
- **Queries** - Questions to ask
- **Unification** - Pattern matching
- **Backtracking** - Finding all solutions

### Why Logic Programming in Bayan?

Bayan integrates logic programming **seamlessly** with procedural and OOP code:

```javascript
// Procedural code
var students = ["Ahmed", "Sara", "Ali"];

// Logic programming in the same file!
fact student("Ahmed", "CS");
fact student("Sara", "Math");
fact student("Ali", "CS");

rule smart(?x) :- student(?x, "CS");

// Query from procedural code
query smart(?who);
// Results: Ahmed, Ali
```

---

<a name="facts"></a>
## 2. Facts

### What are Facts?

Facts are **statements that are always true**. They represent basic knowledge.

### Syntax:

```javascript
// English
fact predicate_name(argument1, argument2, ...);

// Arabic
حقيقة اسم_المحمول(معامل1, معامل2, ...);
```

### Examples:

#### Example 1: Family Relationships

```javascript
// Define facts about family
fact parent("Ahmed", "Mohamed");
fact parent("Sara", "Mohamed");
fact parent("Ali", "Fatima");
fact parent("Mohamed", "Hassan");
fact parent("Fatima", "Hassan");

// Gender facts
fact male("Ahmed");
fact male("Mohamed");
fact male("Hassan");
fact female("Sara");
fact female("Fatima");
```

#### Example 2: Student Information

```javascript
fact student("Ahmed", "CS", 95);
fact student("Sara", "Math", 92);
fact student("Ali", "CS", 88);
fact student("Layla", "Physics", 90);
fact student("Omar", "Math", 85);
```

#### Example 3: Geographic Facts

```javascript
fact capital("Egypt", "Cairo");
fact capital("France", "Paris");
fact capital("Japan", "Tokyo");

fact continent("Egypt", "Africa");
fact continent("France", "Europe");
fact continent("Japan", "Asia");
```

### Fact Characteristics:

✅ Always true  
✅ No conditions  
✅ Can have any number of arguments  
✅ Arguments can be strings, numbers, or other values  

---

<a name="rules"></a>
## 3. Rules

### What are Rules?

Rules define **relationships** between facts. They have a **head** (conclusion) and a **body** (conditions).

### Syntax:

```javascript
// English
rule head(?X, ?Y) :- body1(?X), body2(?Y), ...;

// Arabic
قاعدة رأس(?س, ?ص) :- جسم1(?س), جسم2(?ص), ...;
```

**Components:**
- `head` - What we want to prove
- `:-` - "if" or "is implied by"
- `body` - Conditions that must be true
- `,` - "and" (conjunction)

### Examples:

#### Example 1: Sibling Relationship

```javascript
// Facts
fact parent("Ahmed", "Mohamed");
fact parent("Sara", "Mohamed");
fact parent("Ali", "Fatima");

// Rule: X and Y are siblings if they have the same parent
rule sibling(?X, ?Y) :- 
    parent(?X, ?Z), 
    parent(?Y, ?Z), 
    ?X != ?Y;

// Query
query sibling("Ahmed", ?who);
// Result: who = "Sara"
```

#### Example 2: Grandparent Relationship

```javascript
// Facts
fact parent("Ahmed", "Mohamed");
fact parent("Mohamed", "Hassan");
fact parent("Sara", "Fatima");
fact parent("Fatima", "Hassan");

// Rule: X is grandparent of Y if X is parent of Z and Z is parent of Y
rule grandparent(?X, ?Y) :- 
    parent(?X, ?Z), 
    parent(?Z, ?Y);

// Query
query grandparent("Hassan", ?who);
// Results: who = "Ahmed", who = "Sara"
```

#### Example 3: Smart Student

```javascript
// Facts
fact student("Ahmed", "CS", 95);
fact student("Sara", "Math", 92);
fact student("Ali", "CS", 88);

// Rule: A student is smart if their grade is >= 90
rule smart(?name) :- 
    student(?name, ?major, ?grade), 
    ?grade >= 90;

// Query
query smart(?who);
// Results: who = "Ahmed", who = "Sara"
```

#### Example 4: Ancestor Relationship (Recursive)

```javascript
// Facts
fact parent("Ahmed", "Mohamed");
fact parent("Mohamed", "Hassan");
fact parent("Hassan", "Ibrahim");

// Rule 1: Parent is an ancestor
rule ancestor(?X, ?Y) :- parent(?X, ?Y);

// Rule 2: Ancestor of parent is also an ancestor (recursive)
rule ancestor(?X, ?Y) :- 
    parent(?X, ?Z), 
    ancestor(?Z, ?Y);

// Query
query ancestor("Ibrahim", ?who);
// Results: who = "Hassan", who = "Mohamed", who = "Ahmed"
```

---

<a name="queries"></a>
## 4. Queries

### What are Queries?

Queries are **questions** you ask the logic engine. They can:
- Check if something is true
- Find values that satisfy conditions
- Find all possible solutions

### Syntax:

```javascript
// English
query predicate(?variable);

// Arabic
استعلام محمول(?متغير);
```

### Types of Queries:

#### 1. Ground Query (No Variables)

Check if something is true:

```javascript
fact student("Ahmed", "CS");

query student("Ahmed", "CS");
// Result: true

query student("Ahmed", "Math");
// Result: false
```

#### 2. Query with One Variable

Find values that satisfy the condition:

```javascript
fact student("Ahmed", "CS");
fact student("Sara", "Math");
fact student("Ali", "CS");

query student(?name, "CS");
// Results: name = "Ahmed", name = "Ali"
```

#### 3. Query with Multiple Variables

Find all combinations:

```javascript
fact student("Ahmed", "CS", 95);
fact student("Sara", "Math", 92);

query student(?name, ?major, ?grade);
// Results:
// name = "Ahmed", major = "CS", grade = 95
// name = "Sara", major = "Math", grade = 92
```

#### 4. Complex Query with Conditions

```javascript
fact student("Ahmed", "CS", 95);
fact student("Sara", "Math", 92);
fact student("Ali", "CS", 88);

query student(?name, "CS", ?grade), ?grade >= 90;
// Result: name = "Ahmed", grade = 95
```

---

<a name="variables-unification"></a>
## 5. Variables & Unification

### Variables

Variables in logic programming start with `?`:

```javascript
?X      // Variable X
?name   // Variable name
?value  // Variable value
```

### Unification

Unification is the process of **pattern matching** and **binding variables**.

#### Example 1: Simple Unification

```javascript
fact person("Ahmed", 25);

query person(?name, 25);
// Unification: ?name = "Ahmed"
```

#### Example 2: Multiple Unifications

```javascript
fact parent("Ahmed", "Mohamed");
fact parent("Sara", "Mohamed");

rule sibling(?X, ?Y) :- 
    parent(?X, ?Z),    // Unify ?Z with "Mohamed"
    parent(?Y, ?Z),    // Unify ?Y with "Sara" (same ?Z)
    ?X != ?Y;

query sibling("Ahmed", ?who);
// Unification steps:
// 1. ?X = "Ahmed"
// 2. ?Z = "Mohamed" (from first parent)
// 3. ?Y = "Sara" (from second parent, same ?Z)
// 4. Check "Ahmed" != "Sara" ✓
// Result: ?who = "Sara"
```

#### Example 3: Recursive Unification

```javascript
fact parent("Ahmed", "Mohamed");
fact parent("Mohamed", "Hassan");

rule ancestor(?X, ?Y) :- parent(?X, ?Y);
rule ancestor(?X, ?Y) :- parent(?X, ?Z), ancestor(?Z, ?Y);

query ancestor("Hassan", "Ahmed");
// Unification steps:
// 1. Try first rule: parent("Hassan", "Ahmed") - fails
// 2. Try second rule:
//    - parent("Hassan", ?Z) → ?Z = "Mohamed"
//    - ancestor("Mohamed", "Ahmed")
//      - Try first rule: parent("Mohamed", "Ahmed") - fails
//      - Try second rule:
//        - parent("Mohamed", ?Z2) → ?Z2 = "Ahmed"
//        - ancestor("Ahmed", "Ahmed") - fails
//    - Try next parent...
// Result: true (through the chain)
```

---

<a name="backtracking"></a>
## 6. Backtracking

### What is Backtracking?

Backtracking is the process of **trying different possibilities** when a solution fails.

### How it Works:

1. Try first possibility
2. If it fails, **backtrack** and try next possibility
3. Continue until all possibilities are exhausted

### Example:

```javascript
fact color("red");
fact color("green");
fact color("blue");

fact size("small");
fact size("large");

rule combination(?color, ?size) :- 
    color(?color), 
    size(?size);

query combination(?c, ?s);

// Backtracking process:
// 1. color(?c) → ?c = "red"
//    size(?s) → ?s = "small" ✓ (solution 1)
// 2. Backtrack to size(?s)
//    size(?s) → ?s = "large" ✓ (solution 2)
// 3. Backtrack to color(?c)
//    color(?c) → ?c = "green"
//    size(?s) → ?s = "small" ✓ (solution 3)
// 4. Backtrack to size(?s)
//    size(?s) → ?s = "large" ✓ (solution 4)
// 5. Backtrack to color(?c)
//    color(?c) → ?c = "blue"
//    size(?s) → ?s = "small" ✓ (solution 5)
// 6. Backtrack to size(?s)
//    size(?s) → ?s = "large" ✓ (solution 6)

// Results (6 combinations):
// c = "red", s = "small"
// c = "red", s = "large"
// c = "green", s = "small"
// c = "green", s = "large"
// c = "blue", s = "small"
// c = "blue", s = "large"
```

---

<a name="negation"></a>
## 7. Negation as Failure

### What is Negation?

Negation checks if something **cannot be proven**.

### Syntax:

```javascript
// English
not goal

// Arabic
ليس هدف
```

### Examples:

#### Example 1: Single Person

```javascript
fact married("Ahmed");
fact married("Sara");

rule single(?person) :- not married(?person);

query single("Ali");
// Result: true (Ali is not in married facts)

query single("Ahmed");
// Result: false (Ahmed is married)
```

#### Example 2: Available Room

```javascript
fact booked("room_a", "10:00");
fact booked("room_b", "11:00");

rule available(?room, ?time) :- not booked(?room, ?time);

query available("room_a", "11:00");
// Result: true (room_a is not booked at 11:00)

query available("room_a", "10:00");
// Result: false (room_a is booked at 10:00)
```

#### Example 3: Conflict Detection

```javascript
fact enrolled("Ahmed", "CS101");
fact enrolled("Ahmed", "CS102");
fact enrolled("Sara", "MATH101");

fact conflicts("CS101", "CS102");

rule has_conflict(?student) :- 
    enrolled(?student, ?course1),
    enrolled(?student, ?course2),
    conflicts(?course1, ?course2);

rule no_conflict(?student) :- not has_conflict(?student);

query no_conflict("Sara");
// Result: true

query no_conflict("Ahmed");
// Result: false (Ahmed has conflicting courses)
```

---

<a name="cut"></a>
## 8. Cut Operator

### What is Cut?

Cut (`!` or `cut`) **prevents backtracking** after a certain point.

### Syntax:

```javascript
// English
cut
!

// Arabic
قطع
اقطع
```

### Why Use Cut?

✅ **Performance** - Stop searching when solution is found  
✅ **Determinism** - Prevent unwanted alternative solutions  
✅ **Clarity** - Make intent explicit  

### Examples:

#### Example 1: Maximum of Two Numbers

```javascript
// Without cut (inefficient - tries both rules)
rule max(?x, ?y, ?x) :- ?x >= ?y;
rule max(?x, ?y, ?y) :- ?x < ?y;

// With cut (efficient - stops after first match)
rule max(?x, ?y, ?x) :- ?x >= ?y, cut;
rule max(?x, ?y, ?y);

query max(10, 5, ?result);
// Result: ?result = 10 (only one solution, faster)
```

#### Example 2: Grade Classification

```javascript
rule grade(?score, "A") :- ?score >= 90, cut;
rule grade(?score, "B") :- ?score >= 80, cut;
rule grade(?score, "C") :- ?score >= 70, cut;
rule grade(?score, "D") :- ?score >= 60, cut;
rule grade(?score, "F");

query grade(85, ?letter);
// Result: ?letter = "B" (stops at first match)
```

#### Example 3: Member Check

```javascript
// Check if element is in list
rule member(?x, [?x | ?tail]) :- cut;  // Found it, stop
rule member(?x, [?head | ?tail]) :- member(?x, ?tail);

query member(3, [1, 2, 3, 4, 5]);
// Result: true (stops when found)
```

---

<a name="arithmetic"></a>
## 9. Arithmetic Evaluation

### Arithmetic Operators:

```javascript
?x + ?y    // Addition
?x - ?y    // Subtraction
?x * ?y    // Multiplication
?x / ?y    // Division
?x % ?y    // Modulus
?x ** ?y   // Exponentiation
```

### Comparison Operators:

```javascript
?x > ?y     // Greater than
?x < ?y     // Less than
?x >= ?y    // Greater than or equal
?x <= ?y    // Less than or equal
?x == ?y    // Equal
?x != ?y    // Not equal
```

### Examples:

#### Example 1: Arithmetic in Rules

```javascript
fact number(1);
fact number(2);
fact number(3);
fact number(4);
fact number(5);

rule even(?x) :- number(?x), ?x % 2 == 0;
rule odd(?x) :- number(?x), ?x % 2 != 0;

query even(?n);
// Results: n = 2, n = 4

query odd(?n);
// Results: n = 1, n = 3, n = 5
```

#### Example 2: Range Check

```javascript
fact student("Ahmed", 95);
fact student("Sara", 85);
fact student("Ali", 75);
fact student("Layla", 65);

rule excellent(?name) :- 
    student(?name, ?grade), 
    ?grade >= 90;

rule good(?name) :- 
    student(?name, ?grade), 
    ?grade >= 70, 
    ?grade < 90;

query excellent(?who);
// Result: who = "Ahmed"

query good(?who);
// Results: who = "Sara", who = "Ali"
```

#### Example 3: Calculations

```javascript
fact price("apple", 5);
fact price("banana", 3);
fact price("orange", 4);

rule total_cost(?item1, ?item2, ?total) :- 
    price(?item1, ?price1),
    price(?item2, ?price2),
    ?total == ?price1 + ?price2;

query total_cost("apple", "banana", ?cost);
// Result: cost = 8
```

---

<a name="lists"></a>
## 10. List Pattern Matching

### List Syntax:

```javascript
[]              // Empty list
[1, 2, 3]       // List with elements
[?head | ?tail] // Head and tail pattern
```

### Examples:

#### Example 1: List Member

```javascript
rule member(?x, [?x | ?tail]);
rule member(?x, [?head | ?tail]) :- member(?x, ?tail);

query member(3, [1, 2, 3, 4]);
// Result: true

query member(5, [1, 2, 3, 4]);
// Result: false
```

#### Example 2: List Length

```javascript
rule length([], 0);
rule length([?head | ?tail], ?n) :- 
    length(?tail, ?n1), 
    ?n == ?n1 + 1;

query length([1, 2, 3, 4, 5], ?len);
// Result: len = 5
```

#### Example 3: List Append

```javascript
rule append([], ?list, ?list);
rule append([?head | ?tail1], ?list2, [?head | ?result]) :- 
    append(?tail1, ?list2, ?result);

query append([1, 2], [3, 4], ?result);
// Result: result = [1, 2, 3, 4]
```

#### Example 4: List Reverse

```javascript
rule reverse([], []);
rule reverse([?head | ?tail], ?result) :- 
    reverse(?tail, ?reversed_tail),
    append(?reversed_tail, [?head], ?result);

query reverse([1, 2, 3, 4], ?result);
// Result: result = [4, 3, 2, 1]
```

---

<a name="advanced"></a>
## 11. Advanced Features

### FindAll - Collect All Solutions

```javascript
fact student("Ahmed", "CS");
fact student("Sara", "CS");
fact student("Ali", "Math");

// Collect all CS students
var cs_students = findall(?name, query student(?name, "CS"));
// Result: ["Ahmed", "Sara"]
```

### Assert - Add Facts Dynamically

```javascript
// Add new fact at runtime
assert employee("Mohamed", "Engineer");

query employee("Mohamed", ?role);
// Result: role = "Engineer"
```

### Retract - Remove Facts Dynamically

```javascript
fact employee("Ahmed", "Manager");

// Remove fact
retract employee("Ahmed", "Manager");

query employee("Ahmed", ?role);
// Result: false (no longer exists)
```

---

<a name="examples"></a>
## 12. Complete Examples

### Example 1: Family Tree

```javascript
// Facts
fact parent("Ahmed", "Mohamed");
fact parent("Sara", "Mohamed");
fact parent("Ali", "Fatima");
fact parent("Mohamed", "Hassan");
fact parent("Fatima", "Hassan");

fact male("Ahmed");
fact male("Mohamed");
fact male("Hassan");
fact male("Ali");
fact female("Sara");
fact female("Fatima");

// Rules
rule father(?x, ?y) :- parent(?x, ?y), male(?x);
rule mother(?x, ?y) :- parent(?x, ?y), female(?x);

rule sibling(?x, ?y) :- 
    parent(?x, ?z), 
    parent(?y, ?z), 
    ?x != ?y;

rule brother(?x, ?y) :- sibling(?x, ?y), male(?x);
rule sister(?x, ?y) :- sibling(?x, ?y), female(?x);

rule grandparent(?x, ?y) :- parent(?x, ?z), parent(?z, ?y);
rule grandfather(?x, ?y) :- grandparent(?x, ?y), male(?x);
rule grandmother(?x, ?y) :- grandparent(?x, ?y), female(?x);

rule ancestor(?x, ?y) :- parent(?x, ?y);
rule ancestor(?x, ?y) :- parent(?x, ?z), ancestor(?z, ?y);

// Queries
query father("Mohamed", ?child);
// Results: child = "Ahmed", child = "Sara"

query sibling("Ahmed", ?who);
// Result: who = "Sara"

query grandfather("Hassan", ?grandchild);
// Results: grandchild = "Ahmed", grandchild = "Sara", grandchild = "Ali"

query ancestor("Hassan", ?descendant);
// Results: all descendants
```

### Example 2: Course Scheduling

```javascript
// Facts
fact course("CS101", "Intro to CS", 3);
fact course("CS102", "Data Structures", 3);
fact course("MATH101", "Calculus", 4);
fact course("PHYS101", "Physics", 4);

fact prerequisite("CS102", "CS101");
fact prerequisite("CS201", "CS102");

fact enrolled("Ahmed", "CS101");
fact enrolled("Ahmed", "MATH101");
fact enrolled("Sara", "CS102");
fact enrolled("Sara", "CS101");

fact time_slot("CS101", "MWF", "09:00");
fact time_slot("CS102", "MWF", "10:00");
fact time_slot("MATH101", "TTH", "09:00");
fact time_slot("PHYS101", "MWF", "09:00");

// Rules
rule can_enroll(?student, ?course) :- 
    course(?course, ?name, ?credits),
    not enrolled(?student, ?course),
    not has_prerequisite_issue(?student, ?course);

rule has_prerequisite_issue(?student, ?course) :- 
    prerequisite(?course, ?prereq),
    not enrolled(?student, ?prereq);

rule has_time_conflict(?student, ?course1, ?course2) :- 
    enrolled(?student, ?course1),
    time_slot(?course1, ?days, ?time),
    time_slot(?course2, ?days, ?time),
    ?course1 != ?course2;

rule total_credits(?student, ?total) :- 
    findall(?credits, 
        (enrolled(?student, ?course), course(?course, ?name, ?credits)),
        ?credit_list),
    sum(?credit_list, ?total);

// Queries
query can_enroll("Ahmed", "CS102");
// Result: true (has CS101 prerequisite)

query has_time_conflict("Ahmed", "CS101", "PHYS101");
// Result: true (both at MWF 09:00)
```

### Example 3: Expert System - Medical Diagnosis

```javascript
// Symptoms
fact symptom("patient1", "fever");
fact symptom("patient1", "cough");
fact symptom("patient1", "fatigue");

fact symptom("patient2", "headache");
fact symptom("patient2", "nausea");
fact symptom("patient2", "sensitivity_to_light");

// Diagnosis rules
rule has_flu(?patient) :- 
    symptom(?patient, "fever"),
    symptom(?patient, "cough"),
    symptom(?patient, "fatigue");

rule has_migraine(?patient) :- 
    symptom(?patient, "headache"),
    symptom(?patient, "nausea"),
    symptom(?patient, "sensitivity_to_light");

rule has_cold(?patient) :- 
    symptom(?patient, "cough"),
    not symptom(?patient, "fever");

// Treatment rules
rule treatment(?patient, "rest_and_fluids") :- has_flu(?patient);
rule treatment(?patient, "pain_medication") :- has_migraine(?patient);
rule treatment(?patient, "decongestant") :- has_cold(?patient);

// Queries
query has_flu(?patient);
// Result: patient = "patient1"

query has_migraine(?patient);
// Result: patient = "patient2"

query treatment("patient1", ?treatment);
// Result: treatment = "rest_and_fluids"
```

---

## 🎯 Summary

**Part 3 covered Logic Programming (100% complete):**

✅ **Facts** - Basic knowledge statements  
✅ **Rules** - Relationships and conditions  
✅ **Queries** - Asking questions  
✅ **Variables & Unification** - Pattern matching  
✅ **Backtracking** - Finding all solutions  
✅ **Negation** - Checking what cannot be proven  
✅ **Cut** - Controlling backtracking  
✅ **Arithmetic** - Calculations in logic  
✅ **Lists** - Pattern matching with lists  
✅ **Advanced Features** - FindAll, Assert, Retract  

**Next: Part 4 - Causal Networks (UNIQUE!)** 🚀

Continue to learn about Bayan's revolutionary causal programming features!
