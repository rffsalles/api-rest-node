import fastify from 'fastify'
import { knex } from './database'	
import crypto from 'crypto'
import { env } from './env'

const app = fastify()
app.get('/', async () => {

  // const tables = await knex('sqlite_schema').select('*')
  // return tables
  const transactions = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Transação de Teste',
    amount: 1000.00
  }).returning('*')
  return transactions
})
app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err)
  }
  console.log(`Server listening at ${address}`)
})
