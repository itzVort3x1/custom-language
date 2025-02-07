// deno-lint-ignore-file no-explicit-any
import {
    AssignmentExpr,
    BinaryExpr,
    Expr,
    Identifier,
    NumericLiteral,
    ObjectLiteral,
    Program,
    Property,
    Stmt,
    VarDeclaration,
} from "./ast.ts";

import { Token, tokenize, TokenType } from "./lexer.ts";

/**
 * Frontend for producing a valid AST from sourcode
 */
export default class Parser {
    private tokens: Token[] = [];

    /*
     * Determines if the parsing is complete and the END OF FILE Is reached.
     */
    private not_eof(): boolean {
        return this.tokens[0].type != TokenType.EOF;
    }

    /**
     * Returns the currently available token
     */
    private at() {
        return this.tokens[0] as Token;
    }

    /**
     * Returns the previous token and then advances the tokens array to the next value.
     */
    private eat() {
        const prev = this.tokens.shift() as Token;
        return prev;
    }

    /**
     * Returns the previous token and then advances the tokens array to the next value.
     *  Also checks the type of expected token and throws if the values dnot match.
     */
    private expect(type: TokenType, err: any) {
        const prev = this.tokens.shift() as Token;
        if (!prev || prev.type != type) {
            console.error("Parser Error:\n", err, prev, " - Expecting: ", type);
            Deno.exit(1);
        }

        return prev;
    }

    public produceAST(sourceCode: string): Program {
        this.tokens = tokenize(sourceCode);
        const program: Program = {
            kind: "Program",
            body: [],
        };

        // Parse until end of file
        while (this.not_eof()) {
            program.body.push(this.parse_stmt());
        }

        return program;
    }

    // Handle complex statement types
    private parse_stmt(): Stmt {
        // skip to parse_expr
        switch (this.at().type) {
            case TokenType.Let:
            case TokenType.Const:
                return this.parse_var_declaration();
            default:
                return this.parse_expr();
        }
    }

    // LET IDENT;
    // ( LET | CONST ) IDENT = EXPR;
    parse_var_declaration(): Stmt {
        const isConstant = this.eat().type == TokenType.Const;
        const identifier = this.expect(
            TokenType.Identifier,
            "Expected identifier name following let | const keywords."
        ).value;

        if (this.at().type == TokenType.Semicolon) {
            this.eat(); // expect semicolon
            if (isConstant) {
                throw "Must assigne value to constant expression. No value provided.";
            }

            return {
                kind: "VarDeclaration",
                identifier,
                constant: false,
            } as VarDeclaration;
        }

        this.expect(
            TokenType.Equals,
            "Expected equals token following identifier in var declaration."
        );

        const declaration = {
            kind: "VarDeclaration",
            value: this.parse_expr(),
            identifier,
            constant: isConstant,
        } as VarDeclaration;

        this.expect(
            TokenType.Semicolon,
            "Variable declaration statment must end with semicolon."
        );

        return declaration;
    }

    // Handle expressions
    private parse_expr(): Expr {
        return this.parse_assignment_expr();
    }

    parse_assignment_expr(): Expr {
        const left = this.parse_object_expr(); // switch this out with objectExpr

        // Check for assignment expressions
        if (this.at().type == TokenType.Equals) {
            this.eat();
            const value = this.parse_assignment_expr();
            return {
                kind: "AssignmentExpr",
                assigne: left,
                value,
            } as AssignmentExpr;
        }

        return left;
    }

    private parse_object_expr(): Expr {
        // { Prop[] }
        if (this.at().type != TokenType.OpenBrace) {
            return this.parse_additive_expr();
        }

        this.eat(); // eat the opening brace
        const properties = new Array<Property>();
        while (this.not_eof() && this.at().type != TokenType.CloseBrace) {
            const key = this.expect(
                TokenType.Identifier,
                "Object literal key expected."
            ).value;

            // {key} allows shorthand key: pair: pair -> key
            if (this.at().type == TokenType.Comma) {
                this.eat(); //advance past comma
                properties.push({
                    kind: "Property",
                    key,
                    value: undefined,
                } as Property);
                continue;
            } else if (this.at().type == TokenType.CloseBrace) {
                properties.push({
                    kind: "Property",
                    key,
                    value: undefined,
                } as Property);
                continue;
            }

            // {key: val, key2: val}
            this.expect(
                TokenType.Colon,
                "Missing colon following identifier in ObjectExpr"
            );
            const value = this.parse_expr();
            properties.push({
                kind: "Property",
                key,
                value,
            } as Property);
            if (this.at().type != TokenType.CloseBrace) {
                this.expect(
                    TokenType.Comma,
                    "Expected Comma or closing bracket following property"
                );
            }
        }

        this.expect(
            TokenType.CloseBrace,
            "Object literal missing closing brace."
        );
        return { kind: "ObjectLiteral", properties } as ObjectLiteral;
    }

    // Handle Addition & Subtraction Operations
    private parse_additive_expr(): Expr {
        let left = this.parse_multiplicitave_expr();

        while (this.at().value == "+" || this.at().value == "-") {
            const operator = this.eat().value;
            const right = this.parse_multiplicitave_expr();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            } as BinaryExpr;
        }

        return left;
    }

    // Handle Multiplication, Division & Modulo Operations
    private parse_multiplicitave_expr(): Expr {
        let left = this.parse_primary_expr();

        while (
            this.at().value == "/" ||
            this.at().value == "*" ||
            this.at().value == "%"
        ) {
            const operator = this.eat().value;
            const right = this.parse_primary_expr();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            } as BinaryExpr;
        }

        return left;
    }

    // Orders Of Prescidence
    // AdditiveExpr
    // MultiplicitaveExpr
    // PrimaryExpr

    // Parse Literal Values & Grouping Expressions
    private parse_primary_expr(): Expr {
        const tk = this.at().type;

        // Determine which token we are currently at and return literal value
        switch (tk) {
            // User defined values.
            case TokenType.Identifier:
                return {
                    kind: "Identifier",
                    symbol: this.eat().value,
                } as Identifier;

            // Constants and Numeric Constants
            case TokenType.Number:
                return {
                    kind: "NumericLiteral",
                    value: parseFloat(this.eat().value),
                } as NumericLiteral;

            // Grouping Expressions
            case TokenType.OpenParen: {
                this.eat(); // eat the opening paren
                const value = this.parse_expr();
                this.expect(
                    TokenType.CloseParen,
                    "Unexpected token found inside parenthesised expression. Expected closing parenthesis."
                ); // closing paren
                return value;
            }

            // Unidentified Tokens and Invalid Code Reached
            default:
                console.error(
                    "Unexpected token found during parsing!",
                    this.at()
                );
                Deno.exit(1);
        }
    }
}
