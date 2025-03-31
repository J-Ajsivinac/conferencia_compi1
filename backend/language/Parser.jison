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

"."                       return 'TK_dot';
"*"                       return 'TK_mul';
"/"                       return 'TK_div';
";"                       return 'TK_semicolon';
":"                       return 'TK_colon';

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


// Inicio de gramática
%start ini
%%
ini : TK_types EOF ;