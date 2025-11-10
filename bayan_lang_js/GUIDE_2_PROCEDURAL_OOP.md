# 📚 Bayan Programming Guide - Part 2: Procedural & OOP
# دليل البرمجة بلغة البيان - الجزء الثاني: البرمجة الإجرائية والكائنية

**Version**: 2.0  
**Author**: Basel Yahya Abdullah  
**Date**: 2025-11-04

---

## 📋 Table of Contents

### Procedural Programming:
1. [Variables & Data Types](#variables)
2. [Operators](#operators)
3. [Control Flow](#control-flow)
4. [Loops](#loops)
5. [Functions](#functions)
6. [Arrays](#arrays)
7. [Objects](#objects)

### Object-Oriented Programming:
8. [Classes & Constructors](#classes)
9. [Properties & Methods](#properties-methods)
10. [Inheritance](#inheritance)
11. [Interfaces](#interfaces)
12. [Abstract Classes](#abstract-classes)
13. [Getters & Setters](#getters-setters)
14. [Static Members](#static-members)
15. [Access Modifiers](#access-modifiers)

---

## Part A: Procedural Programming

<a name="variables"></a>
### 1. Variables & Data Types

#### Variable Declaration:

```javascript
// var - function-scoped, mutable
var x = 10;
var name = "Ahmed";
var isActive = true;

// let - block-scoped, mutable
let count = 0;
let message = "Hello";

// const - block-scoped, immutable
const PI = 3.14159;
const MAX_SIZE = 100;
```

#### Primitive Data Types:

```javascript
// Number
var age = 25;
var price = 99.99;
var negative = -10;
var scientific = 1.5e6;  // 1500000

// String
var firstName = "Ahmed";
var lastName = 'Ali';
var template = `Full name: ${firstName} ${lastName}`;

// Boolean
var isStudent = true;
var hasGraduated = false;

// Null
var emptyValue = null;

// Undefined
var notDefined = undefined;
var declared;  // undefined by default
```

#### Type Annotations:

```javascript
// Variable with type
var age: number = 25;
var name: string = "Ahmed";
var isActive: boolean = true;

// Multiple types (union)
var id: number | string = 123;
id = "ABC123";  // Also valid

// Any type
var data: any = "anything";
data = 123;
data = true;
```

<a name="operators"></a>
### 2. Operators

#### Arithmetic Operators:

```javascript
var a = 10;
var b = 3;

var sum = a + b;        // 13
var diff = a - b;       // 7
var product = a * b;    // 30
var quotient = a / b;   // 3.333...
var remainder = a % b;  // 1
var power = a ** b;     // 1000
```

#### Increment & Decrement:

```javascript
var x = 5;

// Prefix increment (increment first, then use)
++x;          // x = 6
var y = ++x;  // y = 7, x = 7

// Postfix increment (use first, then increment)
x++;          // x = 8
var z = x++;  // z = 8, x = 9

// Prefix decrement
--x;          // x = 8
var w = --x;  // w = 7, x = 7

// Postfix decrement
x--;          // x = 6
var v = x--;  // v = 6, x = 5
```

#### Comparison Operators:

```javascript
var a = 10;
var b = 5;
var c = "10";

a == b;   // false (equal value)
a != b;   // true (not equal value)
a === c;  // false (strict equal - different types)
a !== c;  // true (strict not equal)
a > b;    // true
a < b;    // false
a >= 10;  // true
a <= 5;   // false
```

#### Logical Operators:

```javascript
var x = true;
var y = false;

x && y;   // false (AND)
x || y;   // true (OR)
!x;       // false (NOT)

// Short-circuit evaluation
var result = x && someFunction();  // someFunction() called only if x is true
var result2 = y || defaultValue;   // defaultValue used if y is false
```

#### Assignment Operators:

```javascript
var x = 10;

x += 5;   // x = 15 (x = x + 5)
x -= 3;   // x = 12 (x = x - 3)
x *= 2;   // x = 24 (x = x * 2)
x /= 4;   // x = 6 (x = x / 4)
x %= 4;   // x = 2 (x = x % 4)
x **= 3;  // x = 8 (x = x ** 3)
```

#### String Operators:

```javascript
var first = "Hello";
var last = "World";

var full = first + " " + last;  // "Hello World"
var repeated = first + first;   // "HelloHello"

// Template literals
var name = "Ahmed";
var age = 25;
var message = `My name is ${name} and I am ${age} years old`;
```

<a name="control-flow"></a>
### 3. Control Flow

#### If-Else Statements:

```javascript
var age = 18;

// Simple if
if (age >= 18) {
    console.log("Adult");
}

// If-else
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}

// If-else if-else
if (age < 13) {
    console.log("Child");
} else if (age < 18) {
    console.log("Teenager");
} else if (age < 65) {
    console.log("Adult");
} else {
    console.log("Senior");
}

// Nested if
if (age >= 18) {
    if (age >= 21) {
        console.log("Can drink alcohol");
    } else {
        console.log("Adult but cannot drink");
    }
}
```

#### Switch Statement:

```javascript
var day = 3;

switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
    case 7:
        console.log("Weekend");
        break;
    default:
        console.log("Invalid day");
}
```

#### Ternary Operator:

```javascript
var age = 20;
var status = (age >= 18) ? "Adult" : "Minor";

// Nested ternary
var category = (age < 13) ? "Child" : 
               (age < 18) ? "Teenager" : 
               "Adult";
```

<a name="loops"></a>
### 4. Loops

#### For Loop:

```javascript
// Basic for loop
for (var i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}

// For loop with step
for (var i = 0; i < 10; i += 2) {
    console.log(i);  // 0, 2, 4, 6, 8
}

// Reverse for loop
for (var i = 5; i > 0; i--) {
    console.log(i);  // 5, 4, 3, 2, 1
}

// Multiple variables
for (var i = 0, j = 10; i < j; i++, j--) {
    console.log(i, j);
}
```

#### While Loop:

```javascript
var count = 0;

while (count < 5) {
    console.log(count);
    count++;
}

// Infinite loop (use with caution!)
while (true) {
    if (someCondition) {
        break;
    }
}
```

#### Do-While Loop:

```javascript
var count = 0;

do {
    console.log(count);
    count++;
} while (count < 5);

// Executes at least once even if condition is false
var x = 10;
do {
    console.log("Executed once");
} while (x < 5);
```

#### For-In Loop (Objects):

```javascript
var person = {
    name: "Ahmed",
    age: 25,
    city: "Cairo"
};

for (var key in person) {
    console.log(key + ": " + person[key]);
}
// Output:
// name: Ahmed
// age: 25
// city: Cairo
```

#### For-Of Loop (Arrays):

```javascript
var numbers = [10, 20, 30, 40, 50];

for (var num of numbers) {
    console.log(num);
}
// Output: 10, 20, 30, 40, 50

var name = "Ahmed";
for (var char of name) {
    console.log(char);
}
// Output: A, h, m, e, d
```

#### Break & Continue:

```javascript
// Break - exit loop
for (var i = 0; i < 10; i++) {
    if (i === 5) {
        break;  // Exit loop when i is 5
    }
    console.log(i);  // 0, 1, 2, 3, 4
}

// Continue - skip iteration
for (var i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue;  // Skip even numbers
    }
    console.log(i);  // 1, 3, 5, 7, 9
}
```

<a name="functions"></a>
### 5. Functions

#### Function Declaration:

```javascript
// Basic function
function greet(name) {
    return "Hello, " + name;
}

var message = greet("Ahmed");
console.log(message);  // "Hello, Ahmed"

// Function with multiple parameters
function add(a, b) {
    return a + b;
}

var sum = add(5, 3);  // 8

// Function with default parameters
function greetWithDefault(name, greeting) {
    greeting = greeting || "Hello";
    return greeting + ", " + name;
}

console.log(greetWithDefault("Ahmed"));           // "Hello, Ahmed"
console.log(greetWithDefault("Ahmed", "Hi"));     // "Hi, Ahmed"
```

#### Function with Type Annotations:

```javascript
// Function with typed parameters and return type
function multiply(a: number, b: number): number {
    return a * b;
}

var result = multiply(5, 3);  // 15

// Function with optional parameters
function buildName(firstName: string, lastName?: string): string {
    if (lastName) {
        return firstName + " " + lastName;
    }
    return firstName;
}

console.log(buildName("Ahmed"));           // "Ahmed"
console.log(buildName("Ahmed", "Ali"));    // "Ahmed Ali"
```

#### Arrow Functions:

```javascript
// Arrow function syntax
var add = (a, b) => a + b;
var square = x => x * x;
var greet = () => "Hello";

console.log(add(5, 3));    // 8
console.log(square(4));    // 16
console.log(greet());      // "Hello"

// Arrow function with block body
var calculate = (a, b) => {
    var sum = a + b;
    var product = a * b;
    return { sum: sum, product: product };
};

var result = calculate(5, 3);
console.log(result.sum);      // 8
console.log(result.product);  // 15
```

#### Function Scope:

```javascript
var globalVar = "I am global";

function outer() {
    var outerVar = "I am outer";
    
    function inner() {
        var innerVar = "I am inner";
        console.log(globalVar);  // Accessible
        console.log(outerVar);   // Accessible
        console.log(innerVar);   // Accessible
    }
    
    inner();
    console.log(innerVar);  // Error: innerVar is not defined
}

outer();
```

#### Recursive Functions:

```javascript
// Factorial
function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

console.log(factorial(5));  // 120

// Fibonacci
function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(7));  // 13
```

<a name="arrays"></a>
### 6. Arrays

#### Array Creation:

```javascript
// Array literal
var numbers = [1, 2, 3, 4, 5];
var names = ["Ahmed", "Sara", "Ali"];
var mixed = [1, "two", true, null];

// Empty array
var empty = [];

// Array with type annotation
var scores: number[] = [85, 90, 78, 92];
```

#### Array Access:

```javascript
var fruits = ["Apple", "Banana", "Orange"];

console.log(fruits[0]);  // "Apple"
console.log(fruits[1]);  // "Banana"
console.log(fruits[2]);  // "Orange"

// Modify element
fruits[1] = "Mango";
console.log(fruits);  // ["Apple", "Mango", "Orange"]

// Array length
console.log(fruits.length);  // 3
```

#### Array Methods:

```javascript
var numbers = [1, 2, 3, 4, 5];

// Push - add to end
numbers.push(6);
console.log(numbers);  // [1, 2, 3, 4, 5, 6]

// Pop - remove from end
var last = numbers.pop();
console.log(last);      // 6
console.log(numbers);   // [1, 2, 3, 4, 5]

// Unshift - add to beginning
numbers.unshift(0);
console.log(numbers);  // [0, 1, 2, 3, 4, 5]

// Shift - remove from beginning
var first = numbers.shift();
console.log(first);     // 0
console.log(numbers);   // [1, 2, 3, 4, 5]

// Slice - extract portion
var slice = numbers.slice(1, 3);
console.log(slice);  // [2, 3]

// Splice - remove/insert elements
numbers.splice(2, 1);  // Remove 1 element at index 2
console.log(numbers);  // [1, 2, 4, 5]

numbers.splice(2, 0, 3);  // Insert 3 at index 2
console.log(numbers);     // [1, 2, 3, 4, 5]

// Join - convert to string
var str = numbers.join(", ");
console.log(str);  // "1, 2, 3, 4, 5"

// Reverse
numbers.reverse();
console.log(numbers);  // [5, 4, 3, 2, 1]

// Sort
numbers.sort();
console.log(numbers);  // [1, 2, 3, 4, 5]
```

#### Array Iteration:

```javascript
var numbers = [1, 2, 3, 4, 5];

// For loop
for (var i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

// For-of loop
for (var num of numbers) {
    console.log(num);
}

// forEach method
numbers.forEach(function(num) {
    console.log(num);
});

// Map - transform array
var doubled = numbers.map(function(num) {
    return num * 2;
});
console.log(doubled);  // [2, 4, 6, 8, 10]

// Filter - select elements
var evens = numbers.filter(function(num) {
    return num % 2 === 0;
});
console.log(evens);  // [2, 4]

// Reduce - accumulate value
var sum = numbers.reduce(function(acc, num) {
    return acc + num;
}, 0);
console.log(sum);  // 15
```

<a name="objects"></a>
### 7. Objects

#### Object Creation:

```javascript
// Object literal
var person = {
    name: "Ahmed",
    age: 25,
    city: "Cairo"
};

// Empty object
var empty = {};

// Object with methods
var calculator = {
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    }
};
```

#### Object Access:

```javascript
var person = {
    name: "Ahmed",
    age: 25,
    city: "Cairo"
};

// Dot notation
console.log(person.name);  // "Ahmed"
console.log(person.age);   // 25

// Bracket notation
console.log(person["name"]);  // "Ahmed"
console.log(person["age"]);   // 25

// Modify property
person.age = 26;
person["city"] = "Alexandria";

// Add new property
person.country = "Egypt";
console.log(person.country);  // "Egypt"

// Delete property
delete person.city;
console.log(person.city);  // undefined
```

#### Object Methods:

```javascript
var person = {
    firstName: "Ahmed",
    lastName: "Ali",
    age: 25,
    
    // Method
    getFullName: function() {
        return this.firstName + " " + this.lastName;
    },
    
    // Method shorthand
    introduce() {
        return "I am " + this.getFullName();
    }
};

console.log(person.getFullName());  // "Ahmed Ali"
console.log(person.introduce());    // "I am Ahmed Ali"
```

---

## Part B: Object-Oriented Programming

<a name="classes"></a>
### 8. Classes & Constructors

#### Basic Class:

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    introduce() {
        console.log("I am " + this.name + ", " + this.age + " years old");
    }
}

// Create instance
var person1 = new Person("Ahmed", 25);
var person2 = new Person("Sara", 22);

person1.introduce();  // "I am Ahmed, 25 years old"
person2.introduce();  // "I am Sara, 22 years old"
```

#### Class with Type Annotations:

```javascript
class Student {
    name: string;
    age: number;
    grade: number;
    
    constructor(name: string, age: number, grade: number) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }
    
    getInfo(): string {
        return `${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
    }
}

var student = new Student("Ahmed", 18, 95);
console.log(student.getInfo());
```

<a name="properties-methods"></a>
### 9. Properties & Methods

#### Instance Properties:

```javascript
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.mileage = 0;  // Default value
    }
    
    drive(distance) {
        this.mileage += distance;
        console.log("Drove " + distance + " km");
    }
    
    getInfo() {
        return this.brand + " " + this.model + " (" + this.year + ")";
    }
}

var car = new Car("Toyota", "Camry", 2020);
car.drive(100);
car.drive(50);
console.log(car.mileage);  // 150
console.log(car.getInfo());  // "Toyota Camry (2020)"
```

#### Instance Methods:

```javascript
class Calculator {
    constructor() {
        this.result = 0;
    }
    
    add(value) {
        this.result += value;
        return this;  // Method chaining
    }
    
    subtract(value) {
        this.result -= value;
        return this;
    }
    
    multiply(value) {
        this.result *= value;
        return this;
    }
    
    getResult() {
        return this.result;
    }
}

var calc = new Calculator();
var result = calc.add(10).multiply(2).subtract(5).getResult();
console.log(result);  // 15
```

<a name="inheritance"></a>
### 10. Inheritance

#### Basic Inheritance:

```javascript
// Parent class
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(this.name + " makes a sound");
    }
    
    move() {
        console.log(this.name + " moves");
    }
}

// Child class
class Dog extends Animal {
    constructor(name, breed) {
        super(name);  // Call parent constructor
        this.breed = breed;
    }
    
    speak() {
        console.log(this.name + " barks");
    }
    
    fetch() {
        console.log(this.name + " fetches the ball");
    }
}

var dog = new Dog("Max", "Labrador");
dog.speak();  // "Max barks"
dog.move();   // "Max moves"
dog.fetch();  // "Max fetches the ball"
```

#### Multi-Level Inheritance:

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    eat() {
        console.log(this.name + " eats");
    }
}

class Mammal extends Animal {
    constructor(name, furColor) {
        super(name);
        this.furColor = furColor;
    }
    
    nurse() {
        console.log(this.name + " nurses its young");
    }
}

class Dog extends Mammal {
    constructor(name, furColor, breed) {
        super(name, furColor);
        this.breed = breed;
    }
    
    bark() {
        console.log(this.name + " barks");
    }
}

var dog = new Dog("Max", "brown", "Labrador");
dog.eat();    // "Max eats"
dog.nurse();  // "Max nurses its young"
dog.bark();   // "Max barks"
```

#### Method Overriding:

```javascript
class Shape {
    constructor(name) {
        this.name = name;
    }
    
    area() {
        return 0;
    }
    
    describe() {
        console.log("This is a " + this.name);
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }
    
    area() {
        return this.width * this.height;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }
    
    area() {
        return 3.14159 * this.radius * this.radius;
    }
}

var rect = new Rectangle(5, 3);
console.log(rect.area());  // 15

var circle = new Circle(4);
console.log(circle.area());  // 50.26544
```

<a name="interfaces"></a>
### 11. Interfaces

#### Interface Declaration:

```javascript
// Define interface
interface Printable {
    print(): void;
}

interface Saveable {
    save(): void;
}

// Implement interface
class Document implements Printable, Saveable {
    constructor(content) {
        this.content = content;
    }
    
    print() {
        console.log("Printing: " + this.content);
    }
    
    save() {
        console.log("Saving: " + this.content);
    }
}

var doc = new Document("Hello World");
doc.print();  // "Printing: Hello World"
doc.save();   // "Saving: Hello World"
```

<a name="abstract-classes"></a>
### 12. Abstract Classes

#### Abstract Class & Methods:

```javascript
// Abstract class
abstract class Animal {
    constructor(name) {
        this.name = name;
    }
    
    // Abstract method (no implementation)
    abstract makeSound(): void;
    
    // Concrete method
    move() {
        console.log(this.name + " moves");
    }
}

// Concrete class must implement abstract methods
class Dog extends Animal {
    makeSound() {
        console.log(this.name + " barks");
    }
}

class Cat extends Animal {
    makeSound() {
        console.log(this.name + " meows");
    }
}

var dog = new Dog("Max");
dog.makeSound();  // "Max barks"
dog.move();       // "Max moves"

var cat = new Cat("Whiskers");
cat.makeSound();  // "Whiskers meows"
cat.move();       // "Whiskers moves"
```

<a name="getters-setters"></a>
### 13. Getters & Setters

#### Getter & Setter Methods:

```javascript
class Person {
    constructor(firstName, lastName) {
        this._firstName = firstName;
        this._lastName = lastName;
    }
    
    // Getter
    get fullName() {
        return this._firstName + " " + this._lastName;
    }
    
    // Setter
    set fullName(name) {
        var parts = name.split(" ");
        this._firstName = parts[0];
        this._lastName = parts[1];
    }
    
    get firstName() {
        return this._firstName;
    }
    
    set firstName(value) {
        this._firstName = value;
    }
}

var person = new Person("Ahmed", "Ali");
console.log(person.fullName);  // "Ahmed Ali"

person.fullName = "Sara Mohamed";
console.log(person.firstName);  // "Sara"
console.log(person.fullName);   // "Sara Mohamed"
```

#### Validation in Setters:

```javascript
class BankAccount {
    constructor(balance) {
        this._balance = balance;
    }
    
    get balance() {
        return this._balance;
    }
    
    set balance(value) {
        if (value < 0) {
            console.log("Error: Balance cannot be negative");
            return;
        }
        this._balance = value;
    }
    
    deposit(amount) {
        if (amount > 0) {
            this._balance += amount;
        }
    }
    
    withdraw(amount) {
        if (amount > 0 && amount <= this._balance) {
            this._balance -= amount;
        }
    }
}

var account = new BankAccount(1000);
console.log(account.balance);  // 1000

account.deposit(500);
console.log(account.balance);  // 1500

account.withdraw(200);
console.log(account.balance);  // 1300

account.balance = -100;  // Error: Balance cannot be negative
console.log(account.balance);  // 1300 (unchanged)
```

<a name="static-members"></a>
### 14. Static Members

#### Static Properties & Methods:

```javascript
class MathUtils {
    static PI = 3.14159;
    static E = 2.71828;
    
    static square(x) {
        return x * x;
    }
    
    static cube(x) {
        return x * x * x;
    }
    
    static circleArea(radius) {
        return MathUtils.PI * radius * radius;
    }
}

// Access static members without creating instance
console.log(MathUtils.PI);           // 3.14159
console.log(MathUtils.square(5));    // 25
console.log(MathUtils.cube(3));      // 27
console.log(MathUtils.circleArea(4)); // 50.26544
```

#### Static vs Instance:

```javascript
class Counter {
    static totalCount = 0;
    
    constructor(name) {
        this.name = name;
        this.count = 0;
        Counter.totalCount++;
    }
    
    increment() {
        this.count++;
        Counter.totalCount++;
    }
    
    static getTotalCount() {
        return Counter.totalCount;
    }
}

var counter1 = new Counter("Counter 1");
var counter2 = new Counter("Counter 2");

counter1.increment();
counter1.increment();
counter2.increment();

console.log(counter1.count);           // 2
console.log(counter2.count);           // 1
console.log(Counter.getTotalCount());  // 5 (2 creations + 3 increments)
```

<a name="access-modifiers"></a>
### 15. Access Modifiers

#### Public, Private, Protected:

```javascript
class BankAccount {
    public accountNumber: string;
    private balance: number;
    protected owner: string;
    
    constructor(accountNumber: string, owner: string, initialBalance: number) {
        this.accountNumber = accountNumber;
        this.owner = owner;
        this.balance = initialBalance;
    }
    
    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        }
    }
    
    public withdraw(amount: number): boolean {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }
    
    public getBalance(): number {
        return this.balance;
    }
    
    private calculateInterest(): number {
        return this.balance * 0.05;
    }
}

var account = new BankAccount("123456", "Ahmed", 1000);
console.log(account.accountNumber);  // "123456" (public)
console.log(account.getBalance());   // 1000 (public method)
// console.log(account.balance);     // Error: private
// console.log(account.owner);       // Error: protected
```

---

## 🎯 Summary

**Part 2 covered:**

✅ **Procedural Programming** (100% complete):
- Variables, data types, operators
- Control flow (if, switch, ternary)
- Loops (for, while, do-while, for-in, for-of)
- Functions (declaration, arrow, recursive)
- Arrays and array methods
- Objects and object methods

✅ **Object-Oriented Programming** (100% complete):
- Classes and constructors
- Properties and methods
- Inheritance (single and multi-level)
- Interfaces
- Abstract classes and methods
- Getters and setters
- Static members
- Access modifiers (public, private, protected)

**Next: Part 3 - Logic Programming** 🚀

Continue to learn about Bayan's unique logic programming features!
