import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { knex } from './database'	
import crypto from 'crypto'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

app.addHook('preHandler',async (request,reply) => {
    console.log(`[${request.method}] ${request.url}`)
})
app.register(cookie)
app.register(transactionsRoutes,{prefix:'/transactions'})
