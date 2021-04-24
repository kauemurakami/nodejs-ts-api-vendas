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
  "dev": "dev": "ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/shared/http/server.ts",
}
###

após isso para executar rodar apenas
$ yarn dev

### Configurando EditaroConfig
Adicionando .editor config ( clickar com botao direito na pasta reiz do projeto e selecionar genereted .editorconfig

### Configurando ESLint
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
### criar arquivo .eslintrc com o seguinte conteúdo.
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

### criar arquivo .eslintignore
node_modules
dist
build
/*.js


### Adicionar um script no arquivo package.json para executar o lint:

"scripts": {
  "test": "echo \"Error: no test specified\" &amp;&amp; exit 1",
  "dev": "ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/shared/http/server.ts",
  "lint": "eslint . --ext .ts"
  "lint-fix": "eslint . --ext .ts --fix"
}

### para executar
$ yarn lint ou $ yarn lint-fix

### Configurando Prettier
$ yarn add prettier -D

### Criar arquivo .prettierrc
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth":120,
  "arrowParens": "avoid"
}

### Configurando prettier com eslint
$ yarn add eslint-config-prettier eslint-plugin-prettier -D

### Adicionar modificações ao arquivo .eslintrc
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

### estrutura de pastas
src
 - shared
   - http
     server.ts
 - config
 - modules

### Melhorando importações, criando uma base para cada path
em seu tsconfig.json
     "paths": {
       "@config/*":["src/config/*"],
       "@modules/*":["src/modules/*"],
       "@shared/*":["src/shared/*"],
     },

### Adicionando restante das bibliotecas principais
$ yarn add express cors express-async-errors
$ yarn add -D @types/express @types/cors

### Instalação do TypeORM / reflect metadata /postgress
yarn add typeorm reflect-metadata pg

### Criando container docker

docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

### criando migration de products
$ yarn typeorm migration:create -n CreateProducts

add extensão uuid_ossl a base de dados nos respectivo banco de dados para gerenciamento do uuid_generete_v4().

###error typeorm not found entity, exige configuração no type ormconfig ( informar o local onde encontra as entidades, assim como as migrations)
    "entities": ["./src/modules/**/typeorm/entities/*.ts"],


###adicionando validação de dados com celebrate
e corrigindo erro AppErrors

$ yarn add celebrate
$ yarn add -D @types/joi

### instalando bcrypt para criptografar senhas ao enviar para o banco
$ yarn add bcryptjs
### instalar tipagem dela
$ yarn add -D @types/bcryptjs

await hash(password, N); sendo N = salt de hash

### Criando autenticação de sessão do usuario com
Json Web Token (JWT)
$ yarn add jsonwebtoken
$ yarn add -D @types/jsonwebtoken

### processo de upload de arquivos (imagem)
### usando lib Multer
$yarn add multer
$yarn add -D @types/multer
 ### criar pasta upload /configs/upload.ts

### adicionando biblioteca date-fns para comparação e manipulação de horas /datas
$ yarn add date-fns

https://ethereal.mail
### Adicionando Ethereal para fake smtp service email
(NODEMAILER o mais usado em node)
### envio de email atraves de NODEMAILER mas o email é enviado para o site do Ethereal, um email fake, que criaremos.
$yarn add nodemailer
$yarn add -D @types/nodemailer

### handlebars para template de email
https://handlebarsjs.com/
$yarn add handlebars

### adicionando paginação typeorm-pagination
$ yarn add typeorm-pagination
configuração inicial no server.ts

### adicionando variaveis de ambiente
### adicionando dot env
$ yarn add dotenv

### criar dois arquivos na raiz
.env //configuração de ambiente local //incluir no gitnore
.env.example // quaias sao as variaveis configuradas no .env mas sem valores

### implementando class transformer para ocultar propriedades que nao gostariamos de retornar
$ yarn add class-transformer

### implementando cache com redis
adicionando variáveis de ambiente do redis no nosso arquivo .env
REDIS_HOST = localhost
REDIS_PORT = 6379
REDIS_PASS =

SUBIR CONTAINER PARA O REDIS
$ docker run --name redis -p 6379:6379 -d -t redis:alpine
$ yarn add redis ioredis
$ yarn add @types/redis @types/ioredis -D

### criar arquivo cache.ts em config
import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: string;
  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheConfig;

### Anti DDoS
implementando rate limiter flexible para limitar o numero de requisições recebidas / protege contra DDoS.
Armazenaremos o ip da requisição e definiremos um limite de chamadas por tempo
$yarn add rate-limiter-flexible

funcionará como um middleware, todas as requisições passaráo por ela.
assim conseguindo gravar o ip no redis e quantas requisições por segundo fooram feitas
//para teste coloque points: 1 e faça requisições por umn cliente http


