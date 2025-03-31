<h1 align="center">Jison y la Esencia de los Intérpretes:Dando Vida al AST</h1>

<div align="center">
    <p>📕 OLC 1 | 🏛️ Universidad de San Carlos de Guatemala | 🙍‍♂️ Joab Ajsivinac</p>
</div>


> [!NOTE]  
> 🛠 **Tecnologías Utilizadas**
>
> <div align="center" style="display:flex;justify-content:center;gap:20px"><img src="https://go-skill-icons.vercel.app/api/icons?i=react,tailwind,express,nodejs,ts" /></div>
>
> * TypeScript
> * Express
> * Graphviz
> * React
> * Tailwind CSS

## 📟 Instalación

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
🔧 npm install --save-dev @types/cors @types/node tsc-watch typescript
```
Aquí se instalan dependencias necesarias para el desarrollo:
- `@types/cors`, `@types/node`: Tipos de TypeScript para `cors` y `node`.
- `tsc-watch`: Herramienta para observar cambios en archivos TypeScript y recompilarlos automáticamente.
- `typescript`: El compilador de TypeScript.

### 5. Crear un archivo de configuración para TypeScript
```bash
🛠 npx tsc --init
```
Genera un archivo `tsconfig.json` con la configuración estándar para proyectos TypeScript. Este archivo define cómo se debe compilar el código TypeScript.

### 6. Ejecutar la aplicación en modo desarrollo
```bash
🚀 npm run dev
```
Este comando ejecuta el archivo `App.ts` con `ts-node` para iniciar la aplicación. **Nota:** Si encuentras errores relacionados con la extensión `.ts`, asegúrate de que el archivo esté configurado correctamente en `tsconfig.json`.

---

## ⚡ Inicio Rápido

### 1. Agregar scripts personalizados al archivo `package.json`
```json
   "scripts": {
     "jison": "json language\\Parser.jison -o language\\Parser.js",
     "dev": "ts-node ./App.ts"
   }
   ```
   - `jison`: Genera el archivo `Parser.js` a partir de `Parser.jison`.
   - `dev`: Inicia la aplicación en modo desarrollo con `ts-node`.

#### Uso de los comandos en `package.json`

1. **Generar el archivo `Parser.js` con Jison**  
   Ejecuta el siguiente comando para generar el archivo `Parser.js` a partir de `Parser.jison`:
   ```bash
   🛠 npm run jison
   ```

2. **Ejecutar la aplicación en desarrollo con `ts-node`**  
   Usa el siguiente comando para iniciar la aplicación en modo desarrollo:
   ```bash
   🚀 npm run dev
   ```


## 🧮 Como funciona


### 🗄️ Backend


### 🖥️ Frontend

