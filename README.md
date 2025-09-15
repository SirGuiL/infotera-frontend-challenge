# Como rodar o projeto

## Pré-requisitos

- Node.js >= 21

## Instalação

```
npm install
```

## Variáveis de ambiente

- Crie um arquivo .env
- Caso esteja utilizando o JSON server rodando na porta 3333, utilize esse .env:

```
NEXT_PUBLIC_API_URL=http://localhost:3333
```

## Rodando o projeto

```
npm run dev
```

Acesse: http://localhost:3000

## Build e produção

```
npm run build
npm start
```

# Tecnologias utilizadas

- **React** - 19.1.0
- **Next.js** - 15.5.2
- **TypeScript** - ^5
- **TailwindCSS** - ^4
- **React Hook Form** - ^7.62.0
- **Zod** - ^4.1.5
- **Motion** - ^12.23.12
- **Zustand** - ^5.0.8
- **React Query** - ^5.87.1
- **date-fns** - ^4.1.0
- **Cypress** - ^15.2.0
- **Faker.js** - ^10.0.0
- **ESLint** - ^9

# Testes E2E

Desenvolvi os teste end-to-end utilizando Cypress

```
npm run test:e2e
```

## Testes criados

- Foram criados testes para as seguintes funcionalidades:

  - Checkout
  - Filtros
  - Busca

- Utilizei fixtures e intercepts para simular requisições HTTP.
- Configurei os testes para rodarem duas vezes, uma vez testando a resolução de 1920x1080 (desktop) e outra na resolução 414x896 (mobile)

# Estrutura do projeto

```
src/app/                  # Páginas do Next.js (App Router)
src/components/           # Componentes reutilizáveis
src/contexts/             # Contextos personalizados
src/dto/                  # Tipagens de retorno da API
src/hooks/                # Hooks personalizados
src/providers/            # Componentes de integração global
src/schemas/              # Schemas do Zod para validações
src/services/             # Lógica de consumo da API
src/stores/               # Estado global com Zustand
src/types/                # Tipagens globais
src/utils/                # Funções utilitárias
cypress/                  # Testes E2E
```
