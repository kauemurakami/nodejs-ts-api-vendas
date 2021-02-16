# nodejs-ts-api-vendas
Projeto node js com TypeScript, express, TypeORM, docker, postgress
yarn init -y

yarn add typescript ts-node-dev @types/node -D

yarn tsc --init --rootDir src --outDir build \ --esModuleInterop --resolveJsonModule --lib es6 \ --module commonjs --allowJs true --noImplicitAny true

.gitignore

.idea/
.vscode/
node_modules/
build/
temp/
.env
coverage
ormconfig.json
dist

uploads/*
!uploads/.gitkeep

### MANUAL
compilar de ts para js ( gerar build)
$ yarn tsc server.ts

para executar 
$ node build/server.js
###

remover a pasta build

### AUTOMATIZANDO 
adicionar script no package.json para automatizar o build e hot reload 
"scripts": {
  "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts"
}
###

após isso para executar rodar apenas 
$ yarn dev

Configurando EditaroConfig
Adicionando .editor config ( clickar com botao direito na pasta reiz do projeto e selecionar genereted .editorconfig

Configurando ESLint
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
criar arquivo .eslintrc com o seguinte conteúdo.
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
"rules":{
    "no-console":"warn"
  }
}

criar arquivo .eslintignore
node_modules
dist
build
/*.js


Adicionar um script no arquivo package.json para executar o lint:

"scripts": {
  "test": "echo \"Error: no test specified\" &amp;&amp; exit 1",
  "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.ts",
  "lint": "eslint . --ext .ts"
  "lint-fix": "eslint . --ext .ts --fix"
}

para executar
$ yarn lint ou $ yarn lint-fix

Configurando Prettier
$ yarn add prettier -D

Criar arquivo .prettierrc
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth":120,
  "arrowParens": "avoid"
}

Configurando prettier com eslint
$ yarn add eslint-config-prettier eslint-plugin-prettier -D

Adicionar modificações ao arquivo .eslintrc
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    ++ "prettier"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    ++ "prettier/@typescript-eslint",
    ++ "plugin:prettier/recommended"

  ],
  "rules":{
    "no-console":"warn",
    ++ "prettier/prettier":"error"
  }
}

estrutura de pastas 
src
 - shared
   - http
     server.ts
 - config
 - modules

Melhorando importações, criando uma base para cada path
em seu tsconfig.json
     "paths": {
       "@config/*":["src/config/*"],
       "@modules/*":["src/modules/*"],
       "@shared/*":["src/shared/*"],
     }, 

Adicionando restante das bibliotecas principais
$ yarn add express cors express-async-errors
$ yarn add -D @types/express @types/cors
