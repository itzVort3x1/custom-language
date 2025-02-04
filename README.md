# Custom Programming Language

Welcome to the **Custom Programming Language** project! 🚀  
This project aims to **build a programming language** from scratch, covering **Lexing, Parsing, AST Construction, Interpretation, and Execution**.

---

## **Table of Contents**

- [Custom Programming Language](#custom-programming-language)
  - [**Table of Contents**](#table-of-contents)
  - [**Introduction**](#introduction)
  - [**Features**](#features)
  - [**Architecture**](#architecture)
  - [**Project Modules**](#project-modules)
    - [📝 **1. Lexer**](#-1-lexer)
    - [🌳 **2. AST (Abstract Syntax Tree)**](#-2-ast-abstract-syntax-tree)
    - [🏃 **3. AST Walker \& Interpreter**](#-3-ast-walker--interpreter)
    - [🏗 **4. User-Defined Structures \& Functions**](#-4-user-defined-structures--functions)

---

## **Introduction**

This project is a **basic compiler/interpreter** for a custom programming language. It **tokenizes, parses, and evaluates** expressions using an **Abstract Syntax Tree (AST)**. The goal is to understand **how programming languages work under the hood** by implementing key language features.

---

## **Features**

✅ **Lexical Analysis**: Converts raw source code into tokens.  
✅ **Parsing & AST Construction**: Builds an Abstract Syntax Tree (AST) from tokens.  
✅ **Expression Evaluation**: Handles **binary operations, assignments, and function calls**.  
✅ **Environment & Variable Storage**: Supports **variable declarations, scopes, and assignments**.  
✅ **Function Calls**: Implements both **native global functions** and **user-defined functions**.  
✅ **Objects & Structures**: Supports **custom object structures and member expressions**.  
✅ **AST Walking (Interpreter)**: Walks through the AST and evaluates expressions dynamically.

---

## **Architecture**

The project is structured into different stages:

1. **Lexer (Lexical Analysis)**

    - Converts source code into **tokens**.
    - Recognizes **keywords, operators, identifiers, literals, and symbols**.

2. **Parser & AST (Abstract Syntax Tree)**

    - Converts tokens into an **Abstract Syntax Tree**.
    - Supports **Binary Operations, Function Calls, and Object Member Expressions**.

3. **Interpreter (AST Walker)**
    - Traverses the AST and executes code.
    - Implements **environments & variable storage**.

---

## **Project Modules**

### 📝 **1. Lexer**

-   Reads the source code and **breaks it into tokens**.
-   Recognizes **keywords (`let`), operators (`+`, `-`, `*`, `/`), and identifiers**.
-   Skips whitespace and handles **numbers & symbols**.

### 🌳 **2. AST (Abstract Syntax Tree)**

-   Represents **expressions & statements** in tree format.
-   Supports:
    -   **Binary Operations** (`+, -, *, /`)
    -   **Assignment Expressions** (`let x = 10`)
    -   **Function Calls** (`print(x)`)

### 🏃 **3. AST Walker & Interpreter**

-   Walks the AST and **evaluates expressions** dynamically.
-   Implements:
    -   **Environments & Variable Storage**
    -   **Function Execution**
    -   **Object Member Access (`obj.property`)**

### 🏗 **4. User-Defined Structures & Functions**

-   Supports **custom objects & user-defined functions**.
-   Example:

    ```js
    struct Person {
        name;
        age;
    }

    let p = new Person();
    p.name = "Alice";
    print(p.name);
    ```
