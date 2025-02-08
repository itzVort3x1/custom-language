# Custom Programming Language

## Introduction

This project is a **custom programming language** implemented from scratch, covering essential components such as **lexing, parsing, AST construction, interpretation, and execution**. The language includes support for **function declarations, variable assignments, arithmetic expressions, and native functions** like `print`.

## Features

-   ✅ **Lexical Analysis**: Converts source code into tokens.
-   ✅ **Parsing & AST Construction**: Generates an Abstract Syntax Tree (AST) from tokens.
-   ✅ **Expression Evaluation**: Supports **binary operations, assignments, and function calls**.
-   ✅ **Variable Storage & Scope Management**: Implements **environments and variable resolution**.
-   ✅ **Function Execution**: Supports **both native and user-defined functions**.
-   ✅ **Object & Member Access**: Allows **custom object structures and property access**.
-   ✅ **Interpreter Implementation**: Walks the AST and evaluates expressions dynamically.

## Project Structure

```
/
├── test.txt              # Sample script written in the custom language
├── runtime/              # Runtime implementation
│   ├── values.ts         # Defines runtime values (numbers, objects, functions, etc.)
│   ├── interpreter.ts    # Evaluates the AST
│   ├── environment.ts    # Manages variable scope and function execution
│   └── eval/             # Expression & statement evaluation
│       ├── statements.ts # Evaluates program statements
│       └── expressions.ts # Evaluates expressions
├── frontend/             # Frontend implementation
│   ├── ast.ts            # Defines AST node types
│   ├── lexer.ts          # Tokenizer for source code
│   └── parser.ts         # Parses tokens into an AST
├── README.md             # Project documentation
├── main.ts               # Entry point for executing scripts
```

## Language Syntax & Example Code

The language supports **function declarations, closures, variable assignments, and expressions**.

### Example: Function and Closure

```js
fn makeAdder (offset) {
  fn add (x, y)  {
    x + y + offset
  }
  add
}

const adder = makeAdder(1);
print(adder(10, 5)) // Output: 16
```

### Variable Declaration

```js
let x = 10;
const y = x + 5;
print(y);
```

### Function Call & Built-in Functions

```js
fn greet(name) {
  print("Hello, " + name);
}

greet("World");
```

## Components

### **1. Lexer (Lexical Analysis)**

-   Converts raw source code into **tokens**.
-   Recognizes **keywords, operators, identifiers, literals, and symbols**.

### **2. Parser & AST (Abstract Syntax Tree)**

-   Converts tokens into an **AST representation**.
-   Supports **expressions, function calls, and statements**.

### **3. Interpreter (AST Walker)**

-   Evaluates expressions dynamically.
-   Implements **environments, variable storage, and function execution**.

### **4. Environment & Scope Management**

-   Supports **global and local function scopes**.
-   Implements **variable resolution and assignments**.

### **5. Native Functions**

-   Built-in functions like `print()` and `time()`.

## Running the Interpreter

### Prerequisites

-   **Deno** installed (required to run TypeScript code).

### Running a Script

To execute a script written in this language:

```sh
deno run --allow-read main.ts
```

### Running a Custom Script

Modify the `test.txt` file and run:

```sh
deno run --allow-read main.ts test.txt
```

## Future Enhancements

-   🏗 **Implement return statements in functions**.
-   🏗 **Add support for string manipulation and boolean operations**.
-   🏗 **Expand built-in functions (e.g., math operations, file handling)**.
-   🏗 **Introduce control structures like loops and conditionals**.

## Conclusion

This project is a **minimal but powerful interpreter** for a custom programming language. It serves as a foundation for **understanding how programming languages work** by implementing **lexing, parsing, AST traversal, and evaluation**.

## Installing Deno

To run this project, you need to install **Deno**. Use the following commands based on your operating system:

### Linux:

```sh
curl -fsSL https://deno.land/install.sh | sh
```

### Windows:

```sh
irm https://deno.land/install.ps1 | iex
```

### macOS:

```sh
curl -fsSL https://deno.land/install.sh | sh
```

### Verify Installation:

```sh
deno --version
```
