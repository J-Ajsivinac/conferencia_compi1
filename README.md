<h1 align="center">Jison y la Esencia de los Intérpretes:Dando Vida al AST</h1>

<div align="center">
    <p>📕 OLC 1 | 🏛️ Universidad de San Carlos de Guatemala | 🙍‍♂️ Joab Ajsivinac</p>
</div>


> [!NOTE]  
> 🛠 **Tecnologías Utilizadas**
>
> <div align="center" style="display:flex;justify-content:center;gap:20px"><img src="https://go-skill-icons.vercel.app/api/icons?i=express,nodejs,ts" /></div>
>
> * TypeScript
> * Express
> * Graphviz


## 🎡 Instalación

### 1. Inicializar un proyecto de Node.js
```bash
📝 npm init -y
```
Este comando crea un archivo `package.json` con la configuración por defecto en tu proyecto. El archivo se genera en la ruta actual con los valores predeterminados.

### 2. Instalar dependencias
```bash
📦 npm install express cors jison ts-node
```
Este comando instala varios paquetes necesarios para el backend:
- `express`: Framework web para Node.js.
- `cors`: Middleware para habilitar el intercambio de recursos entre dominios (CORS).
- `jison`: Herramienta para generar analizadores sintácticos.
- `ts-node`: Ejecuta código TypeScript directamente sin necesidad de compilarlo previamente.

### 3. Instalar dependencias de tipo para TypeScript
```bash
🔧 npm i @types/express
```
Este comando instala los tipos de TypeScript para `express` para proporcionar autocompletado y validación de tipos en el código.

### 4. Instalar herramientas de desarrollo para TypeScript
```bash
🔧 npm install --save-dev @types/cors @types/node tsc-watch typescript nodemon
```
Aquí se instalan dependencias necesarias para el desarrollo:
- `@types/cors`, `@types/node`: Tipos de TypeScript para `cors` y `node`.
- `tsc-watch`: Herramienta para observar cambios en archivos TypeScript y recompilarlos automáticamente.
- `typescript`: El compilador de TypeScript.
- `nodemon`: Herramienta que reinicia la aplicación automáticamente cuando detecta cambios en los archivos fuente.

### 5. Crear un archivo de configuración para TypeScript
```bash
🛠 npx tsc --init
```
Genera un archivo `tsconfig.json` con la configuración estándar para proyectos TypeScript. Este archivo define cómo se debe compilar el código TypeScript.

### 6. Ejecutar la aplicación en modo desarrollo
```bash
🚀 npm run dev
```
Este comando ejecuta el archivo `App.ts` con `ts-node` y `nodemon` para iniciar la aplicación con recarga automática. **Nota:** Si encuentras errores relacionados con la extensión `.ts`, asegúrate de que el archivo esté configurado correctamente en `tsconfig.json`.

---

## ⚡ Inicio Rápido

### 1. Agregar scripts personalizados al archivo `package.json`
```json
   "scripts": {
     "jison": "jison language\\Parser.jison -o language\\Parser.js",
     "dev": "nodemon --ext ts --exec ts-node ./App.ts"
   }
```
- `jison`: Genera el archivo `Parser.js` a partir de `Parser.jison`.
- `dev`: Inicia la aplicación en modo desarrollo con `nodemon` y `ts-node`.

#### Uso de los comandos en `package.json`

1. **Generar el archivo `Parser.js` con Jison**  
   Ejecuta el siguiente comando para generar el archivo `Parser.js` a partir de `Parser.jison`:
   ```bash
   🛠 npm run jison
   ```

2. **Ejecutar la aplicación en desarrollo con `nodemon` y `ts-node`**  
   Usa el siguiente comando para iniciar la aplicación en modo desarrollo:
   ```bash
   🚀 npm run dev
   ```


## 🗄️ Backend

### 📁 Carpeta raíz

Contiene archivos generales y de documentación.

- **`.gitignore`**: Archivos y carpetas que Git debe ignorar (por ejemplo, `node_modules`, `dist`, etc.).
- **`README.md`**: Documentación del proyecto. Suele explicar cómo instalar, correr y entender el sistema.

---

### 📁 `backend/`

Aquí vive todo el código del intérprete:

---

### 📄 `app.ts`

El punto de entrada de tu backend. Probablemente configura el servidor, carga middlewares, rutas y empieza a escuchar peticiones.

---

### 📄 `package.json` y `package-lock.json`

Archivos de configuración de npm:

- `package.json` lista dependencias, scripts y metadatos del proyecto.
- `package-lock.json` asegura versiones exactas para reproducibilidad.

---

### 📄 `tsconfig.json`

Configuración de TypeScript (target, paths, reglas de compilación, etc.).

---

### 📁 `Classes/`

Contiene las **clases del núcleo del lenguaje**: expresiones, instrucciones, entorno de ejecución, etc.

---

### 📁 `Env/`

Define el **entorno de ejecución** del programa (como una tabla de símbolos).

- **`Environment.ts`**: Administra scopes, variables y funciones.
- **`Symbol.ts`**: Representa una variable (tipo, nombre, valor, etc.).

---

### 📁 `Expressions/`

Expresiones del lenguaje: lo que **devuelve un valor**.

- **`Primitive.ts`**: Números, strings, booleanos, etc.
- **`AccessArray.ts`**: Acceso a una posición en un array, como `arr[2]`.

---

### 📁 `Instructions/`

Instrucciones del lenguaje: lo que **realiza una acción**.

- **`InitID.ts`**: Declaración de una variable.
- **`InitArray.ts`**: Creación de un array (`new` o con valores).
- **`AsignArray.ts`**: Asignación a una posición del array.
- **`PushList.ts`**: Método `.add()` para agregar al array.
- **`AccessID.ts`**: Acceder al valor de una variable.

---

### 📁 `Interfaces/`

Define las **interfaces base** del lenguaje (como contratos).

- **`Expression.ts`**: Toda expresión debe implementar esta interfaz.
- **`Instruction.ts`**: Igual que el anterior pero para instrucciones.

#### 🧠 Diferencia clave:

|  | **Expresión** | **Instrucción** |
| --- | --- | --- |
| **Qué es** | Algo que **produce un valor**. | Algo que **realiza una acción**. |
| **Ejemplos típicos** | `5 + 3`, `"Hola"`, `a[0]` | Declaraciones, asignaciones, ciclos. |
| **Tiene retorno** | ✅ Siempre retorna un valor (`ReturnType`). | ❌ Generalmente no retorna un valor útil. |
| **Dónde se usa** | Dentro de otras expresiones o asignaciones. | Como líneas independientes (sentencias). |
| **clase** | `Expression` | `Instruction` |

---

#### 🔍 código:

#### `Expression`:

```
public abstract execute(): ReturnType;
```

- **Devuelve un valor**, como un número, texto, booleano, etc.
- Ej: `5 + 2` → evalúa y devuelve `7`.

Se usa para cosas como:

- Literales (`TK_integer`, `TK_string`)
- Accesos a arrays (`a[0]`)
- Operaciones matemáticas o lógicas.

---

#### `Instruction`:

```
public abstract execute(): any;
```

- **Hace algo**, como guardar una variable o modificar algo en el entorno.
- No necesariamente devuelve un valor (aunque puede hacerlo si lo necesitas, como en un `return`).

Se usa para:

- Declaraciones (`int x = 5;`)
- Asignaciones (`x = 3;`)
- Añadir elementos a una lista.
- Instrucciones compuestas como `if`, `while`, `for`, `function`.

---

#### 🧠 Una forma fácil de diferenciarlas:

- Si se puede **poner dentro de una operación**, probablemente es una **expresión**.
    
    Ej: `x = 5 + funcion() + a[0];`
    
- Si  **tiene que estar sola en una línea**, probablemente es una **instrucción**.
    
    Ej: `int x = 10;` o `x = y;`
    

---

### 📁 `Utils/`

Herramientas auxiliares para el sistema.

- **`ConvertTypes.ts`**: Funciones para convertir entre tipos (`int` a `double`, etc.).
- **`Defaults.ts`**: Valores por defecto o constantes generales.
- **`Node.ts`**: Representación de nodos del AST, para visualizar.
- **`TypeInst.ts`, `Types.ts`, `TypesExp.ts`**: Enumeraciones o clases para manejar los tipos de datos e instrucciones.

---

### 📁 `Controllers/`

Controladores que **ejecutan lógica principal del backend**.

- **`Interpreter.ts`**: Ejecuta el AST generado. Aquí se interpreta el árbol y se evalúa el programa.

---

### 📁 `Language/`

**compilador o parser**, escrito en **Jison**.

- **`Parser.jison`**: Define la gramática léxica y sintáctica del lenguaje.
- **`Parser.js`**: El parser ya compilado desde el `.jison`.

---

### 📁 `Middlewares/`

Funciones que se ejecutan **antes de llegar a los controladores** (en el backend).

- **`CorsManagment.ts`**: Configura las políticas de CORS para que el backend acepte peticiones desde el frontend.

---

### 📁 `Routes/`

Define las **rutas HTTP** que puede manejar tu servidor (probablemente con Express).

- **`Interpreter.ts`**: Ruta para recibir código fuente, parsearlo, interpretarlo y devolver resultados.

---

### 🔍 Grámatica

#### 🧩 Estructura General

La gramática tiene dos partes principales:

1. **Analizador léxico (`%lex ... /lex`)**: Se encarga de reconocer los *tokens*, es decir, las palabras clave, símbolos, identificadores, números, etc.
2. **Analizador sintáctico (`%% ...`)**: Define las *reglas* del lenguaje, cómo se combinan los tokens para formar expresiones, declaraciones, etc.

---

#### 1. **Análisis Léxico (`%lex`)**

Especifica cómo se identifican los diferentes *tokens*.

#### 🔹 Opciones

```
%options case-insensitive
```

Hace que no importe si escribes en mayúsculas o minúsculas. `int` y `INT` serían lo mismo.

#### 🔹 Expresiones regulares clave

- `int|double|char|string|bool` → Token `'TK_types'`
- `"add"`, `"new"` → Tokens `'TK_add'`, `'TK_new'`
- Operadores y símbolos (`;`, `:`, `=`, `(`, `)`, `[`, `]`, etc.) → tokens con prefijo `'TK_'`.
- Números enteros y decimales → `'TK_integer'`, `'TK_double'`
- Identificadores (nombres de variables): `([a-zA-z])[a-zA-Z0-9_]*` → `'TK_id'`
- Strings y caracteres entre comillas → `'TK_string'`, `'TK_char'`
- Ignora espacios, saltos de línea y tabulaciones.
- Si llega al final del archivo: `<<EOF>>` → token `'EOF'`

---

#### 2. **Análisis Sintáctico (`%%`)**

Define las reglas que describen cómo se pueden combinar los tokens válidamente. Vamos de arriba hacia abajo:

---

### 🧷 Regla Principal: `INIT`

```
INIT:
    INSTRUCTIONS EOF {return $1} |
    EOF              {return []}
```

El punto de entrada. Se espera una secuencia de instrucciones y luego fin del archivo. Si no hay instrucciones, devuelve una lista vacía.

---

#### 📜 INSTRUCTIONS

```
INSTRUCTIONS:
    INSTRUCTIONS INSTRUCTION {$$.push($2)}|
    INSTRUCTION              {$$ = [$1];}
```

Permite una lista de instrucciones. La primera forma acumula instrucciones, la segunda inicia la lista.

---

#### 🧱 INSTRUCTION

```
INSTRUCTION:
    DECLARATION                    {$$ = $1}|
    ARRAY_NEW TK_semicolon         {$$ = $1}|
    ARRAY_ASSIGNMENT TK_semicolon {$$ = $1}
```

Una instrucción puede ser:

- Una **declaración** de variable.
- Una creación de array.
- Una asignación de array.

---

#### 🔡 DECLARATION

```
DECLARATION:
    TK_types IDS TK_asign EXPRESSION TK_semicolon { ... } |
    TK_types IDS                     TK_semicolon { ... }
```

Ejemplos válidos:

```c
int x = 5;
string a, b;
```

Usa la clase `InitID` para representar esto en el AST.

---

#### 🧾 IDS

```
IDS:
    IDS TK_comma TK_id  {$$.push($3)} |
    TK_id               {$$ = [$1]; }
```

Permite declarar varias variables separadas por comas.

---

#### 📦 ARRAY_NEW

```
ARRAY_NEW:
    TK_types TK_id [] = new TK_types [EXP]
```

Representa cosas como:

```c
int arr[] = new int[5];
```

Usa la clase `InitArray`.

También puede tener una asignación directa como:

```c
int arr[] = [1, 2, 3];
```

---

#### 📥 ARRAY_ASSIGNMENT

```
ARRAY_ASSIGNMENT:
    TK_id [EXPR] = EXPR
    TK_id.add(EXPR)
```

Manipula arrays:

```c
arr[2] = 10;
arr.add(5);
```

Usa `AsignArray` o `PushList`.

---

#### 🔢 EXPRESSION

```
EXPRESSION:
    ACCESARRAY |
    TK_id |
    TK_integer | TK_double | TK_char | TK_string |
    TK_true | TK_false
```

Expresiones pueden ser:

- Acceso a array (`arr[2]`)
- Identificadores (`x`)
- Literales (`5`, `'a'`, `"hola"`, `true`)

Cada literal se convierte en una instancia de `Primitive`.

---

#### 📚 ACCESARRAY

```
ACCESARRAY:
    TK_id [EXPR] → `arr[2]`
```

Devuelve un `AccessArray`.

---

#### 🧠 Clases Usadas

Estas clases son las que construyen el **Árbol de Sintaxis Abstracta (AST)**:

- **InitID**: Declaración de variable.
- **InitArray**: Declaración de array.
- **AsignArray**: Asignación de valor en un array.
- **PushList**: Agrega un valor al final del array.
- **AccessID**: Acceso a variable.
- **AccessArray**: Acceso a una posición de un array.
- **Primitive**: Representa valores literales (enteros, cadenas, etc.).

---

#### 🧪 Ejemplo completo aceptado por esta gramática:

```c
int x = 5;
double arr[] = new double[3];
arr[0] = 3.14;
arr.add(2.71);
```
