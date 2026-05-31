# Heroes

Aplicação web para gerenciamento e visualização de heróis, desenvolvida com React, TypeScript e Material UI.

## 🚀 Tecnologias

* React
* TypeScript
* Material UI
* SWR
* Axios
* Docker
* Docker Compose
* Vite

## 📦 Funcionalidades

* Listagem de heróis
* Cadastro de heróis
* Edição de heróis
* Exclusão de heróis
* Interface responsiva
* Consumo de API utilizando SWR
* Atualização automática de dados através de cache inteligente

## 🛠️ Instalação

Clone o repositório:

```bash
git clone https://github.com/IsabelaSucharski/Heroes.git
```

Acesse a pasta:

```bash
cd Heroes
```

Instale as dependências:

```bash
cd backend
```

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```
A aplicação estará disponível em:

```bash
http://localhost:3030
```

e

```bash
cd frontend
```

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

A aplicação estará disponível em:

```bash
http://localhost:5173
```

---

## 🐳 Executando com Docker

Suba os containers:

```bash
docker-compose up --build
```

Ou:

```bash
docker compose up --build
```

---

## 📁 Estrutura do Projeto

```text
src
├── components
├── pages
├── hooks
├── services
├── types
├── theme
├── assets
└── routes
```

### Organização

* **components** → Componentes reutilizáveis
* **pages** → Páginas da aplicação
* **hooks** → Hooks customizados e integração com SWR
* **services** → Configuração da API e serviços
* **types** → Tipagens TypeScript
* **theme** → Tema global do Material UI
* **routes** → Configuração das rotas

---

## 🌐 API

A aplicação consome uma API REST para gerenciamento dos heróis.

Exemplo de endpoint:

```http
GET /heroes
```

---

## 🎨 Interface

O projeto utiliza Material UI com tema customizado e componentes reutilizáveis para manter consistência visual em toda a aplicação.

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido por Isabela Sucharski.
