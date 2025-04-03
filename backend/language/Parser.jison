%{
    // Importar librerías
%}

//Analizador léxico
%lex
%options case-insensitive
content    ([^\n\"\\]?|\\.)  // Define el contenido permitido (todo excepto saltos de línea, comillas, y barras invertidas, o caracteres escapados)
%%

\s+                                 	{}	//ignora espacios
\n             							{}	//ignora saltos de línea
[\r\t]+                             	{}  //ignora tabulaciones

(int|double|char|string|bool)               return 'TK_types';
"true"                    return 'TK_true';
"false"                   return 'TK_false';
"new"                     return 'TK_new';

"."                       return 'TK_dot';
"*"                       return 'TK_mul';
"/"                       return 'TK_div';
";"                       return 'TK_semicolon';
":"                       return 'TK_colon';
"=" 				      return 'TK_asign';
"(" 				      return 'TK_lparen';
")" 				      return 'TK_rparen';
"{" 				      return 'TK_lbrace';
"}" 				      return 'TK_rbrace';
"[" 				      return 'TK_lbracket';
"]" 				      return 'TK_rbracket';

[0-9]+("."[0-9]+)\b       return 'TK_double';
[0-9]+\b                  return 'TK_integer';

([a-zA-z])[a-zA-Z0-9_]*   return 'TK_id';

\"{content}*\"              { yytext = yytext.substr(1,yyleng-2); return 'TK_string'; }
\'{content}\'               { yytext = yytext.substr(1,yyleng-2); return 'TK_char'; };

.                           {console.log("-------");}
<<EOF>>                     return 'EOF';

// Finaliza parte de Léxica

/lex

%{
const {Types} = require('../Classes/Utils/Types')

//Expresiones
const {Primitive} = require('../Classes/Expressions/Primitive')

// Instrucciones
const {InitID} = require('../Classes/Instructions/InitID')
const {InitArray} = require('../Classes/Instructions/InitArray')
const {AccessID} = require('../Classes/Instructions/AccessID')
const {AsignArray} = require('../Classes/Instructions/AsignArray')
%}

%left 'TK_dot' 'TK_lbracket' 'TK_rbracket' 'TK_lpar' 'TK_rpar'

// Inicio de gramática
%start INIT
%%
INIT:
    INSTRUCTIONS EOF {return $1} |
    EOF              {return []}
    ;

INSTRUCTIONS:
    INSTRUCTIONS INSTRUCTION {$$.push($2)}|
    INSTRUCTION              {$$ = [$1];}
    ;

INSTRUCTION:
    DECLARATION                    {$$ = $1}|
    ARRAY_NEW        TK_semicolon  {$$ = $1}| 
    ARRAY_ASSIGNMENT TK_semicolon  {$$ = $1}
    ;

DECLARATION:
    TK_types IDS TK_asign EXPRESSION TK_semicolon {$$ = new InitID(@1.first_line,@1.first_column,$1,$2,$4)}         |
    TK_types IDS                     TK_semicolon {$$ = new InitID(@1.first_line,@1.first_column,$1,$2,undefined) }
    ;

IDS: 
    IDS TK_comma TK_id  {$$.push($3)}     |
    TK_id               {$$ = [$1]; }
    ;

ARRAY_NEW:
    TK_types TK_id TK_lbracket TK_rbracket TK_asign TK_new TK_types ARRAY_BRACKETS {$$ = new InitArray(@1.first_line,@1.first_column,$2,$1,$8,undefined)}  |
    TK_types TK_id TK_lbracket TK_rbracket TK_asign ASIGN_ARRAY {$$ = new InitArray(@1.first_line,@1.first_column,$2,$1,undefined,$6)}                                                                 
    ;

ARRAY_BRACKETS:
    TK_lbracket EXPRESSION TK_rbracket  {$$ = $2}
    ;

ASIGN_ARRAY:
    TK_lbracket VALUES_ARRAY TK_rbracket  {$$ = $2} |
    EXPRESSION  {$$ = [$1]}
    ;

VALUES_ARRAY:
    VALUES_ARRAY TK_comma VALUE_ARRAY {$$.push($3)} |
    VALUE_ARRAY                       {$$ = [$1]}
    ;

VALUE_ARRAY:
    EXPRESSION          {$$ = $1} |
    TK_lbracket VALUES_ARRAY TK_rbracket  {$$ = $2} 
    ;


ARRAY_ASSIGNMENT:
    TK_id TK_lbracket EXPRESSION TK_rbracket TK_asign EXPRESSION {$$ = new AsignArray(@1.first_line, @1.first_column, $1, $3, $6)} 
    ;


EXPRESSION:
    TK_id                {$$ = new AccessID(@1.first_line,@1.first_column,$1)}                  |
    TK_integer           {$$ = new Primitive(@1.first_line, @1.first_column, $1,Types.INT) }    |
    TK_double            {$$ = new Primitive(@1.first_line, @1.first_column, $1,Types.DOUBLE) } |
    TK_char              {$$ = new Primitive(@1.first_line, @1.first_column, $1,Types.CHAR) }   |
    TK_string            {$$ = new Primitive(@1.first_line, @1.first_column, $1,Types.STRING) } |
    TK_true              {$$ = new Primitive(@1.first_line, @1.first_column, $1,Types.BOOLEAN) }|
    TK_false             {$$ = new Primitive(@1.first_line, @1.first_column, $1,Types.BOOLEAN) }
    ;