# Stronger

Site de progressão de carga para powerlifting, com treino no método 5/3/1, calculadora de 1RM e termos de academia.

## Estrutura

- **API**: servidor Node.js (Express + MySQL) com o cadastro e o login do Stronger
- **Banco_de_dados**: script SQL com o banco `progressao_carga` e os usuários de teste
- **Site**: páginas HTML, CSS e JavaScript
- **web-data-viz**: projeto base original (AquaTech), sem alterações

## Como rodar

1. Execute o `Banco_de_dados/script-progressao-carga.sql` no MySQL Workbench.
2. Em `API/.env.dev`, coloque o seu usuário e a sua senha do MySQL (senha com caractere especial fica entre 'aspas').
3. No terminal, entre na pasta da API e inicie:

```
cd API
npm i
npm start
```

4. Acesse `http://localhost:3333`.

Usuários de teste: `teste@teste.com` / `123456` e `ana@teste.com` / `abc123`.
