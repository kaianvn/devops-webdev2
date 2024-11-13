# 2024-bsi22-fase6....web-dev2....devops-todo-list

## 1 Clonar o Respositório

```bash
git clone https://github.com/ifcvarela/2024-bsi22-fase6....web-dev2....devops-todo-list
```

## 2 Abrir o Projeto com DevContainer

- Certifique-se de que o Docker Desktop está instalado e em execução
- Certifique-se de copiar o arquivo `.env.example` para `.env` e configurar as variáveis de ambiente
- Abrir o Visual Studio Code
- Instalar a extensão Dev Container
- Abrir o projeto com Dev Container

## 3 Instalar as Dependências

```bash
cd app
npm install
```

## 4 Executar o Projeto

```bash
npm run dev
```

> certifique-se de entrar na pasta `app` antes de executar os comandos

## 5 Atividade

1. Crie mais duas instancias de banco de dados no arquivo `docker-compose.devcontainer.yml`
2. Execute o Dev Container com as novas instancias
3. Altere o app.ts para conectar nas novas instancias
4. Crie `console.log` para exibir as informações das novas instancias demonstrando que a conexão foi realizada com sucesso