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

O projeto pode ser executado localmente através do código-fonte ou utilizando as imagens Docker publicadas. Dessa forma, não é necessário instalar Node.js ou configurar dependências manualmente, bastando possuir o Docker instalado para executar a aplicação.

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

## 🐳 Docker e Containerização

A aplicação foi containerizada utilizando Docker e Docker Compose para facilitar a configuração do ambiente e garantir consistência entre desenvolvimento e execução.

O projeto é composto por três serviços principais:

### Frontend

Responsável pela interface da aplicação, desenvolvida com React, TypeScript e Material UI.

* Porta: `5173`
* Executa a aplicação web
* Consome a API disponibilizada pelo backend

### Backend

Responsável pelas regras de negócio e exposição da API REST.

* Porta: `3000`
* Gerencia as operações de CRUD dos heróis
* Realiza a comunicação com o banco de dados MySQL

### Banco de Dados

Utiliza MySQL 8.4 para armazenamento dos dados da aplicação.

* Porta: `3307` (host) → `3306` (container)
* Persistência de dados através de volume Docker

### Arquitetura

```text
Frontend (React)
        │
        ▼
Backend (API REST)
        │
        ▼
MySQL
```

Todos os serviços são inicializados automaticamente através do Docker Compose e se comunicam por uma rede interna criada pelo próprio Docker.

### Persistência dos Dados

O banco de dados utiliza o volume:

```yaml
mysql_data
```

Isso garante que os dados permaneçam armazenados mesmo após a remoção dos containers.

### Executando a Aplicação

Construir e iniciar todos os serviços:

```bash
docker compose up --build
```

Executar em segundo plano:

```bash
docker compose up -d
```

Parar os serviços:

```bash
docker compose down
```

### Acessos

Após a inicialização:

| Serviço  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:3000 |
| MySQL    | localhost:3307        |

### Variáveis de Ambiente

O backend utiliza as seguintes configurações para conexão com o banco:

```env
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=heroes
```

O nome do host é `mysql` porque os containers compartilham a mesma rede Docker, permitindo que os serviços se encontrem pelo nome definido no Docker Compose.

### Benefícios da Containerização

* Ambiente padronizado para todos os desenvolvedores.
* Configuração simplificada.
* Isolamento entre frontend, backend e banco de dados.
* Persistência dos dados através de volumes.
* Facilidade para implantação em ambientes de homologação e produção.
* Compatibilidade com pipelines de CI/CD utilizando Docker.



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
