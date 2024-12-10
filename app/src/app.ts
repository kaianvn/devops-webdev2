import express from "express";
import { Pool } from "pg";
import path from "path";
import router from "./routes";

require("dotenv").config({ path: path.join("..", ".env") });

const app = express();
const PORT = 3000;
app.use(router)
app.listen(PORT, () => console.log(`⚡server is running on port: ${PORT}`));

const configPG = [
  {
    user: process.env.POSTGRES_USER_1,
    host: 'postgres1',
    database: process.env.POSTGRES_DB_1,
    password: process.env.POSTGRES_PASSWORD_1,
    port: 5432,
  },
  {
    user: process.env.POSTGRES_USER_2,
    host: 'postgres2',
    database: process.env.POSTGRES_DB_2,
    password: process.env.POSTGRES_PASSWORD_2,
    port: 5432,
  },
  {
    user: process.env.POSTGRES_USER_3,
    host: 'postgres3',
    database: process.env.POSTGRES_DB_3,
    password: process.env.POSTGRES_PASSWORD_3,
    port: 5432,
  },
];

console.log(configPG)

const pools = configPG.map(options => new Pool(options));

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function queryDB() {
  for (let poolIndex = 0; poolIndex < pools.length; poolIndex++) {
    while (true) {
      try {
        await pools[poolIndex].connect();
        console.log(`A conexão com o banco de dados ${poolIndex + 1} foi bem sucedida.`);
        break;
      } catch (err) {
        console.error(`Erro na conexão com o banco de dados ${poolIndex + 1}! Tentando reconectar...`);
        await sleep(2000)
      }
    }
  }
 
  try {
    const res1 = await pools[0].query('SELECT $1::text as message', ['Mensagem do servidor']);
    console.log(`Servidor 1: ${res1.rows[0].message}`);
  
    const res2 = await pools[1].query('SELECT $1::text as message', ['Mensagem do servidor']);
    console.log(`Servidor 2: ${res2.rows[0].message}`);
  
    const res3 = await pools[2].query('SELECT $1::text as message', ['Mensagem do servidor']);
    console.log(`Servidor 3: ${res3.rows[0].message}`);
  } catch (error: any) {
    console.error('Erro na consulta:', error.message);
  } finally {

    pools.forEach(pool => pool.end());
  }
}

queryDB();