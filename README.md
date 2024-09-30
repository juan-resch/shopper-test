# Shopper Test

Este é um projeto desenvolvido com NestJS e Docker, com suporte para testes utilizando Vitest.

## Configuração Inicial

Antes de rodar o projeto, é necessário configurar as variáveis de ambiente. Um arquivo de exemplo chamado `.env.example` está disponível na raiz do projeto.

### Passos para Configuração

1. **Crie o arquivo `.env`:**

   - Copie o arquivo `.env.example` e renomeie-o para `.env`.
   - Preencha os valores das variáveis de ambiente.

2. **Comandos**

- `docker compose up` para iniciar o projeto com docker.
- `npm run test` ou `yarn test` para executar os testes unitários.

3. **Detalhes**

- A api roda na porta 8000 sem prefixos
- Acesse: <http://localhost:8000/docs> para ver a documentação.

## Observações

Ao longo do desenvolvimento e testes desse projeto foi percebido que o modelo do Google Gemini `gemini-1.5-pro` apresenta falhas recorrentes retornando erro 500. Dito isso, optei por usar o modelo `gemini-1.5-flash` que não apresentou erros, mas, em contrapartida, o input de texto para extração dos dados não funcionava sempre e teve que ser ajustado.
