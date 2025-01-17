import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { knex } from './database'	
import crypto from 'crypto'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.addHook('preHandler',async (request,reply) => {
    console.log(`[${request.method}] ${request.url}`)
})
app.register(cookie)
app.register(transactionsRoutes,{prefix:'/transactions'})

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    console.error(err)
  }
  console.log(`Server listening at ${address}`)
})
