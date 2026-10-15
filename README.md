# TaskFlow — Frontend

Frontend da aplicação TaskFlow, um gerenciador de tarefas desenvolvido com React e TypeScript. O projeto tem como objetivo praticar desenvolvimento frontend moderno, integração com APIs REST e boas práticas de arquitetura e organização de código.

## Tecnologias

- **React** — construção da interface por componentes.
- **TypeScript** — tipagem estática e maior segurança durante o desenvolvimento.
- **Vite** — servidor de desenvolvimento e ferramenta de build.
- **Tailwind CSS** — estilização da interface.
- **Fetch API** — comunicação HTTP com o backend.
- **ESLint** — análise estática e padronização do código.

## Funcionalidades

- Listagem de tarefas cadastradas.
- Criação de tarefas com título e descrição.
- Conclusão e reabertura de tarefas.
- Exclusão de tarefas.
- Persistência dos dados por meio da API.
- Exibição de estados de carregamento e mensagens de erro.

## Arquitetura

O frontend utiliza componentes React para a interface e um serviço dedicado para a comunicação com a API.

Estrutura atual de referência:

```text
src/
├── components/
│   ├── TaskCard.tsx
│   └── TaskForm.tsx
├── services/
│   └── tasks.ts
├── App.tsx
├── main.tsx
└── ...
```

### Responsabilidades

- `components/`: componentes reutilizáveis da interface.
- `services/tasks.ts`: comunicação HTTP com a API de tarefas.
- `App.tsx`: composição da aplicação, carregamento inicial e coordenação das operações.
- `main.tsx`: inicialização da aplicação React.

A estrutura poderá evoluir conforme novas funcionalidades forem implementadas.

## Requisitos

Antes de iniciar, você precisa ter instalado:

- Node.js em uma versão compatível com as dependências do projeto.
- npm.
- O backend TaskFlow em execução.

## Instalação

Clone o repositório e acesse o diretório do frontend:

```bash
git clone <repository-url>
cd <frontend-directory>
```
> Substitua os valores entre `< >` pelas informações reais do repositório e do diretório.

Instale as dependências:

```bash
npm install
```

## Configuração de ambiente

Crie um arquivo `.env` na raiz do frontend:

```env
VITE_API_URL=http://localhost:3333
```

A variável `VITE_API_URL` define a URL-base utilizada pelo serviço HTTP.

**Importante:** variáveis com prefixo `VITE_` são disponibilizadas ao código do frontend. Não utilize esse mecanismo para armazenar senhas, tokens privados ou outras credenciais secretas.

Caso a URL da API seja alterada, atualize essa variável e reinicie o servidor de desenvolvimento.

## Executando a aplicação

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Por padrão, o Vite disponibiliza a aplicação em:

http://localhost:5173

Para que as funcionalidades funcionem corretamente, a API do TaskFlow deve estar disponível em `http://localhost:3333`, ou na URL configurada em `VITE_API_URL`.

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera a build de produção. |
| `npm run lint` | Executa a análise estática com ESLint. |
| `npm run preview` | Executa uma prévia local da build de produção. |

Os scripts disponíveis dependem da configuração atual do `package.json`.

## Integração com a API

O frontend consome os seguintes endpoints:

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/tasks` | Lista as tarefas. |
| `POST` | `/tasks` | Cria uma tarefa. |
| `PATCH` | `/tasks/:id` | Atualiza os campos permitidos de uma tarefa. |
| `DELETE` | `/tasks/:id` | Exclui uma tarefa. |

As operações são executadas por `src/services/tasks.ts`, mantendo os detalhes das requisições HTTP fora dos componentes visuais.

## Decisões arquiteturais

As principais decisões técnicas e suas justificativas estão documentadas no ADR do frontend:

- [ADR-FE-001 — Arquitetura e decisões técnicas](docs/ADR-FE-001-frontend-taskflow.md)

O ADR registra as tecnologias escolhidas, os motivos das decisões, suas consequências e os critérios para futuras mudanças.

## Próximas evoluções

As melhorias planejadas incluem:

- Aprimorar os estados de carregamento e tratamento de erros.
- Melhorar a experiência dos formulários e das operações assíncronas.
- Organizar o código por funcionalidade conforme a aplicação crescer.
- Adicionar filtros e pesquisa de tarefas.
- Implementar testes automatizados.
- Avaliar novas bibliotecas conforme surgirem necessidades concretas.

Esses itens representam o planejamento do projeto e não necessariamente funcionalidades já implementadas.

## Objetivo do projeto

O TaskFlow é um projeto de aprendizado e evolução técnica, com foco em React, TypeScript, integração com APIs REST, arquitetura frontend e boas práticas de desenvolvimento.

A prioridade é manter o código simples, compreensível, testável e preparado para evoluir sem introduzir complexidade desnecessária.
