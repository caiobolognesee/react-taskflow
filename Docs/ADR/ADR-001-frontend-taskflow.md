# ADR-FE-001 --- Arquitetura e decisões técnicas do frontend TaskFlow

-   **Status:** Aceito para a base atual; itens futuros estão
    identificados como planejados.
-   **Data:** 2026-10-15
-   **Escopo:** Aplicação web do TaskFlow.
-   **Stack atual:** React, TypeScript, Vite e Tailwind CSS.

## 1. Contexto

O TaskFlow é uma aplicação de gerenciamento de tarefas criada para
praticar desenvolvimento frontend moderno e integração com uma API
própria. A aplicação precisa começar simples, mas permitir evolução sem
concentrar interface, estado e comunicação HTTP em um único componente.

As decisões devem favorecer legibilidade, tipagem segura,
responsabilidades claras, facilidade de testes e aprendizado
progressivo. Não serão adicionadas bibliotecas ou camadas sem uma
necessidade concreta.

## 2. Decisões

### 2.1. React para a interface

**Decisão:** utilizar React para construir a interface.

**Motivação:** - Permite compor a tela com componentes reutilizáveis. -
Explicita o fluxo de dados por meio de props e estado. - É uma
tecnologia relevante para aplicações web e para o objetivo de estudo do
projeto.

**Consequências:** - A interface será dividida em componentes com
responsabilidades específicas. - O estado será mantido no nível mais
próximo que permita compartilhar os dados necessários. - Componentes não
devem assumir responsabilidades de acesso ao banco ou conhecer detalhes
internos do backend.

### 2.2. TypeScript em modo estrito

**Decisão:** utilizar TypeScript, com verificações estritas habilitadas
no projeto.

**Motivação:** - Detectar inconsistências de tipos durante o
desenvolvimento. - Documentar contratos entre componentes e serviços. -
Reduzir erros comuns ao lidar com respostas da API.

**Consequências:** - Props e dados relevantes terão tipos explícitos. -
Evitar `any`; quando um tipo não for conhecido, representar essa
incerteza de forma explícita. - Os tipos do frontend descrevem o
contrato esperado, mas não substituem a validação de dados no backend.

### 2.3. Vite como ferramenta de desenvolvimento e build

**Decisão:** manter Vite para executar o servidor de desenvolvimento e
gerar a build de produção.

**Motivação:** - Configuração inicial enxuta. - Ciclo de desenvolvimento
rápido. - Integração direta com React e TypeScript.

**Consequências:** - Variáveis de ambiente expostas ao cliente devem
usar o prefixo `VITE_`. - Nunca colocar segredos, senhas ou credenciais
em variáveis `VITE_*`, pois elas podem ser incorporadas ao bundle
público.

### 2.4. Organização por funcionalidade

**Decisão:** evoluir para uma organização orientada a funcionalidades,
mantendo componentes compartilhados separados.

Estrutura de referência:

``` text
src/
├── components/           # Componentes compartilhados
├── features/
│   └── tasks/
│       ├── components/   # Componentes específicos de tarefas
│       ├── hooks/        # Lógica reutilizável da funcionalidade
│       └── types.ts      # Tipos da funcionalidade
├── services/
│   └── tasks.ts          # Comunicação HTTP com a API
├── App.tsx
└── main.tsx
```

**Motivação:** - Manter arquivos relacionados próximos. - Facilitar a
localização de código conforme a aplicação cresce. - Evitar que
`App.tsx` se transforme no local de toda a lógica.

**Consequências:** - A estrutura será adotada gradualmente, não por meio
de uma reescrita ampla. - Um componente deve ser extraído quando possuir
uma responsabilidade clara ou quando a reutilização justificar a
abstração. - Não criar pastas vazias ou camadas genéricas antes de haver
código que as justifique.

### 2.5. Componentes de apresentação separados da comunicação HTTP

**Decisão:** manter chamadas à API em `src/services/`, fora dos
componentes visuais.

**Motivação:** - Evitar duplicação de `fetch` e de tratamento de
respostas. - Centralizar a URL-base e os detalhes de transporte HTTP. -
Facilitar testes e eventual substituição da implementação de
comunicação.

**Consequências:** - Componentes como `TaskCard` recebem dados e
callbacks por props. - O serviço de tarefas oferece operações
explícitas, como listar, criar, atualizar e excluir. - O serviço deve
tratar corretamente respostas sem corpo, como HTTP `204`, e não definir
`Content-Type: application/json` quando não há corpo JSON. - Erros de
transporte devem ser convertidos em erros compreensíveis para a camada
que os apresenta ao usuário.

### 2.6. Estado local com hooks do React

**Decisão:** usar inicialmente `useState` e `useEffect` para estado
local e carregamento inicial de dados.

**Motivação:** - São recursos nativos suficientes para a complexidade
atual. - Permitem aprender o modelo de estado e o ciclo de sincronização
do React antes de adicionar abstrações.

**Consequências:** - O estado deve permanecer no menor nível de
componente que atenda aos consumidores. - Atualizações de listas devem
usar atualizadores funcionais quando dependerem do estado anterior. -
Efeitos devem ter dependências corretas e evitar atualizações após
desmontagem quando aplicável. - Não adicionar `useMemo` ou `useCallback`
preventivamente; utilizá-los quando houver motivo de desempenho ou
necessidade referencial concreta.

**Evolução planejada:** avaliar TanStack Query se cache, revalidação,
sincronização e estados de requisição se tornarem complexos. Não é
necessário introduzi-lo apenas para um CRUD pequeno.

### 2.7. Estados de interface explícitos

**Decisão:** representar estados de carregamento, erro, sucesso quando
relevante e lista vazia.

**Motivação:** - A interface precisa comunicar o resultado das
operações. - Uma falha da API não deve parecer uma lista vazia nem
deixar o usuário sem retorno.

**Consequências:** - Exibir mensagens acessíveis, por exemplo com
`role="alert"` para erros importantes. - Desabilitar ações durante
operações quando isso evitar envios duplicados ou estados
inconsistentes. - Manter mensagens exibidas ao usuário claras, sem expor
detalhes internos ou stack traces. - Definir como a interface se
recupera após falhas, evitando remover dados antes de a operação ser
confirmada pelo servidor.

### 2.8. Validação no frontend e no backend

**Decisão:** realizar validações de experiência do usuário no frontend,
mantendo o backend como autoridade para regras e integridade dos dados.

**Motivação:** - Validação no cliente melhora a experiência, mas pode
ser contornada. - A API pode ser chamada por clientes diferentes da
interface web.

**Consequências:** - O frontend pode impedir o envio de um título vazio
e exibir orientações. - O backend deve repetir as validações necessárias
e responder com códigos HTTP apropriados. - Não considerar tipos
TypeScript ou validações de formulário como substitutos da validação da
API.

### 2.9. Testes automatizados

**Decisão planejada:** adotar Vitest e React Testing Library para testes
unitários e de componentes; avaliar Playwright para fluxos end-to-end.

**Motivação:** - Validar comportamento observável sem acoplar testes
excessivamente à implementação. - Detectar regressões ao refatorar
componentes e serviços.

**Consequências:** - Priorizar cenários de usuário: preencher
formulário, criar tarefa, mostrar erro e alternar status. - Usar
Playwright para verificar fluxos completos no navegador quando a
aplicação estiver pronta para isso. - Evitar testes que dependam apenas
de detalhes internos de implementação.

### 2.10. Bibliotecas adicionais sob demanda

**Decisão:** não instalar roteador, biblioteca de formulários ou
biblioteca de cache sem necessidade concreta.

**Motivação:** - Reduzir complexidade e dependências no início. -
Aprender primeiro os recursos nativos relevantes.

**Evoluções possíveis:** - React Router quando houver múltiplas páginas
ou rotas. - React Hook Form e Zod quando os formulários e seus contratos
crescerem. - TanStack Query quando a gestão de dados remotos justificar
cache e revalidação.

## 3. Convenções de código

-   Usar nomes descritivos e consistentes.
-   Preferir componentes pequenos com uma responsabilidade clara.
-   Manter callbacks e contratos das props tipados.
-   Não duplicar regras de negócio em múltiplos componentes.
-   Manter textos da interface em português enquanto esse for o idioma
    do produto.
-   Manter nomes técnicos, identificadores e comentários de código em
    inglês, salvo justificativa específica.
-   Não adicionar abstrações apenas para reduzir linhas de código.
-   Acessibilidade faz parte da implementação: associar `label` a
    campos, definir tipos de botão e manter mensagens compreensíveis.

## 4. Consequências gerais

**Benefícios esperados:** - Código mais fácil de compreender e
modificar. - Limites mais claros entre interface, estado e API. - Melhor
testabilidade. - Crescimento gradual, com decisões justificadas.

**Custos e limitações:** - A organização por funcionalidade exige
disciplina na localização dos arquivos. - Alguns estados e contratos
precisam ser mantidos em mais de uma camada. - A estrutura poderá mudar
conforme novos requisitos surgirem; ela não é um fim em si mesma.

## 5. Critérios para revisar este ADR

Revisar estas decisões quando: - o frontend passar a ter várias
páginas; - a gestão de dados remotos ficar difícil de manter com hooks
nativos; - os formulários exigirem validações mais elaboradas; -
surgirem requisitos de autenticação, permissões ou acessibilidade
adicionais; - testes demonstrarem acoplamento ou dificuldades
recorrentes; - uma dependência nova trouxer benefício concreto superior
ao custo de manutenção.

## 6. Referências oficiais

Consultar a documentação vigente ao implementar ou revisar estas
decisões: - React: https://react.dev/ - TypeScript:
https://www.typescriptlang.org/docs/ - Vite: https://vite.dev/guide/ -
Vitest: https://vitest.dev/guide/ - React Testing Library:
https://testing-library.com/docs/react-testing-library/intro/ -
Playwright: https://playwright.dev/docs/intro/

## 7. Registro de implementação

Este documento registra a direção arquitetural. Ele não significa que
todos os itens planejados já estejam implementados. Atualizar o status
dos itens conforme forem concluídos e revisar o ADR quando uma decisão
mudar.
