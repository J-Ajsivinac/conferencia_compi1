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

"."                       return 'TK_dot';
"*"                       return 'TK_mul';
"/"                       return 'TK_div';
";"                       return 'TK_semicolon';
":"                       return 'TK_colon';
"=" 				      return 'TK_asign'
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

.                           {console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext);}
<<EOF>>                     return 'EOF';

// Finaliza parte de Léxica

/lex

%left 'TK_dot' 'TK_lbracket' 'TK_rbracket' 'TK_lpar' 'TK_rpar'

// Inicio de gramática
%start INIT
%%
INIT:
    INSTRUCTIONS EOF |
    EOF                 ;

INSTRUCTIONS:
    INSTRUCTIONS INSTRUCTION |
    INSTRUCTION              
    ;

INSTRUCTION:
    DECLARATION                   |
    ARRAY_NEW        TK_semicolon |
    ARRAY_ASSIGNMENT TK_semicolon |
    ASSIGNMENT       TK_semicolon 
    ;

DECLARATION:
    TK_types IDS TK_asign EXPRESSION TK_semicolon |
    TK_types IDS                     TK_semicolon                     
    ;

IDS: 
    IDS TK_comma TK_id    |
    TK_id              
    ;

ASSIGNMENT:
    TK_id TK_asign EXPRESSION 
    ;

EXPRESSION:
    TK_id                |
    TK_integer           |
    TK_double            |
    TK_char              |
    TK_string            |
    TK_true              |
    TK_false             
    ;

ARRAY_NEW:
    TK_types TK_id TK_lbracket TK_rbracket TK_asign TK_new TK_types ARRAY_BRACKETS |
    TK_types TK_id TK_lbracket TK_rbracket TK_lbracket TK_rbracket TK_asign TK_new TK_types ARRAY_BRACKETS ARRAY_BRACKETS |
    TK_types TK_id TK_lbracket TK_rbracket TK_asign ASIGN_ARRAY |
    TK_types TK_id TK_lbracket TK_rbracket TK_lbracket TK_rbracket TK_asign ASIGN_ARRAY 
    ;

ARRAY_BRACKETS:
    TK_lbracket EXPRESSION TK_rbracket  
    ;

ASIGN_ARRAY:
    TK_lbracket VALUES_ARRAY TK_rbracket   |
    EXPRESSION  
    ;

VALUES_ARRAY:
    VALUES_ARRAY TK_comma VALUE_ARRAY |
    VALUE_ARRAY                      
    ;

VALUE_ARRAY:
    EXPRESSION         |
    TK_lbracket VALUES_ARRAY TK_rbracket
    ;


ARRAY_ASSIGNMENT:
    TK_id TK_lbracket EXPRESSION TK_rbracket TK_asign EXPRESSION |
    TK_id TK_lbracket EXPRESSION TK_rbracket TK_lbracket EXPRESSION TK_rbracket TK_asign EXPRESSION
    ;