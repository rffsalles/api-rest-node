import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { knex } from './database'	
import crypto from 'crypto'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'
import {app} from './app'

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err)
  }
  console.log(`Server listening at ${address}`)
})
