# CaminhoDev - Frontend

Bem-vindo ao repositório do frontend do **CaminhoDev**, uma plataforma educacional projetada para guiar estudantes de Ciência da Computação em sua jornada de aprendizado. O objetivo é fornecer um ambiente estruturado e rico em recursos para o domínio de diversas áreas da computação.

## 🚀 Sobre o Projeto

O CaminhoDev é uma aplicação web que oferece aos usuários:

-   **Trilhas de Aprendizado:** Disciplinas e tópicos organizados de forma lógica para facilitar o estudo.
-   **Acompanhamento de Progresso:** Ferramentas para que os usuários monitorem seu avanço em cada disciplina.
-   **Conteúdo Curado:** Acesso a uma variedade de materiais de estudo, como vídeos, artigos, livros e podcasts.
-   **Funcionalidade de Conteúdo Salvo:** Permite que os usuários guardem seus materiais preferidos para acesso rápido.
-   **Dashboard Personalizado:** Uma visão geral das estatísticas de aprendizado, progressos e recomendações.

## ✨ Tecnologias Utilizadas

Este projeto foi construído utilizando um conjunto de tecnologias modernas para garantir uma experiência de usuário rápida, responsiva e escalável.

-   **Framework:** [Next.js](https://nextjs.org/) (React)
-   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
-   **Estilização:** [Tailwind CSS](https://tailwindcss.com/) com [shadcn/ui](https://ui.shadcn.com/) para componentes.
-   **Gerenciamento de Formulários:** [React Hook Form](https://react-hook-form.com/) com [Zod](https://zod.dev/) para validação de schemas.
-   **Qualidade de Código:**
    -   [ESLint](https://eslint.org/) para análise estática de código.
    -   [Prettier](https://prettier.io/) para formatação de código.
    -   [Husky](https://typicode.github.io/husky/) e [lint-staged](https://github.com/okonet/lint-staged) para garantir a qualidade do código antes dos commits.
-   **Conteinerização:** [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) para um ambiente de desenvolvimento consistente.

## 🏁 Como Rodar o Projeto

Para executar o projeto em seu ambiente local, siga os passos abaixo.

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [npm](https://www.npmjs.com/) (ou um gerenciador de pacotes de sua preferência como Yarn, pnpm)
-   [Docker](https://www.docker.com/products/docker-desktop/) (opcional, para rodar via contêiner)

### 1. Usando NPM (Recomendado)

Primeiro, clone o repositório e instale as dependências:

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd frontend
npm install
```

Em seguida, crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis de ambiente necessárias. Um exemplo seria:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
NEXT_PUBLIC_COOKIE_NAME=caminhodev.token
```

Finalmente, para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver a aplicação.

### 2. Usando Docker

Se preferir usar o Docker, certifique-se de que o Docker esteja em execução em sua máquina. Em seguida, execute o comando abaixo na raiz do diretório `frontend`:

```bash
docker-compose up --build
```

O contêiner do frontend estará disponível em [http://localhost:3000](http://localhost:3000).

## 🔧 Comandos Disponíveis

-   `npm run dev`: Inicia o servidor de desenvolvimento.
-   `npm run build`: Compila o projeto para produção.
-   `npm run start`: Inicia o servidor de produção após a compilação.
-   `npm run lint`: Executa a verificação de lint em todo o projeto.

## 🤝 Contribuições

Contribuições são sempre bem-vindas! Se você tiver sugestões para melhorar o projeto, sinta-se à vontade para criar um *fork* do repositório e abrir um *pull request*.
