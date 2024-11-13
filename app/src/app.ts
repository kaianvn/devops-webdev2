import { Client } from 'pg';

const client = new Client({
  host: 'postgres',
  port: 5432,
  user: 'user_pg',
  password: 'password_pg',
  database: 'db_pg',
});

void async function() {
  await client.connect();
  const res = await client.query('SELECT $1::text as message', ['Hello world!']);
  console.log(res.rows[0].message); // Hello world!
  await client.end();
}();